/**
 * Firebase integration helper for Dergag Unity
 * Compliant with Firestore Zero-Trust Security & Diagnostic error format
 */

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null,
  authCurrentUser?: any
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: authCurrentUser?.uid,
      email: authCurrentUser?.email,
      emailVerified: authCurrentUser?.emailVerified,
      isAnonymous: authCurrentUser?.isAnonymous,
      tenantId: authCurrentUser?.tenantId,
      providerInfo:
        authCurrentUser?.providerData?.map((provider: any) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export interface FirebaseConnectionStatus {
  isConfigured: boolean;
  projectId: string | null;
  databaseId: string;
  error?: string;
  mode: 'connected' | 'unconfigured' | 'mock_server';
}

export async function checkFirebaseReadiness(): Promise<FirebaseConnectionStatus> {
  try {
    const res = await fetch('/api/firebase-status');
    const data = await res.json();
    if (data.hasAppletConfig) {
      return {
        isConfigured: true,
        projectId: data.projectId,
        databaseId: data.firestoreDatabaseId,
        mode: 'connected'
      };
    }
    return {
      isConfigured: false,
      projectId: null,
      databaseId: '(default)',
      mode: 'unconfigured'
    };
  } catch (err) {
    return {
      isConfigured: false,
      projectId: null,
      databaseId: '(default)',
      mode: 'mock_server'
    };
  }
}
