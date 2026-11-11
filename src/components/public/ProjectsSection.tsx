import React, { useState } from 'react';
import { Project, ProjectCategory, ProjectStatus, Language } from '../../types';
import { translations } from '../../translations';
import {
  FolderKanban,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  X,
  FileCheck2,
  TrendingUp,
  Coins
} from 'lucide-react';

interface ProjectsSectionProps {
  currentLang: Language;
  projects: Project[];
  loading?: boolean;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  currentLang,
  projects,
  loading = false
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const t = translations[currentLang];

  const categories = [
    { id: 'all', label: t.projects.filterAll },
    { id: 'community_development', label: t.projects.categoryCommunity },
    { id: 'education', label: t.projects.categoryEducation },
    { id: 'healthcare', label: t.projects.categoryHealthcare },
    { id: 'social_support', label: t.projects.categorySocial },
    { id: 'youth_development', label: t.projects.categoryYouth },
    { id: 'environmental_protection', label: t.projects.categoryEnvironment },
    { id: 'spiritual_cultural', label: t.projects.categorySpiritual },
  ];

  const statuses = [
    { id: 'all', label: t.projects.filterAll },
    { id: 'ongoing', label: t.projects.statusOngoing },
    { id: 'completed', label: t.projects.statusCompleted },
    { id: 'planned', label: t.projects.statusPlanned },
  ];

  // Alternating card accents (Blue, Emerald, Purple, Orange, Teal) as specified in prompt section 9
  const cardAccents = [
    { border: 'border-blue-300 hover:border-blue-500', bar: 'from-[#1D4ED8] to-[#2563EB]', text: 'text-[#1D4ED8]', shadow: 'hover:shadow-blue-500/20' },
    { border: 'border-emerald-300 hover:border-emerald-500', bar: 'from-[#059669] to-[#0D9488]', text: 'text-[#059669]', shadow: 'hover:shadow-emerald-500/20' },
    { border: 'border-purple-300 hover:border-purple-500', bar: 'from-[#7C3AED] to-[#9333EA]', text: 'text-[#7C3AED]', shadow: 'hover:shadow-purple-500/20' },
    { border: 'border-orange-300 hover:border-orange-500', bar: 'from-[#F97316] to-[#E5A000]', text: 'text-[#F97316]', shadow: 'hover:shadow-orange-500/20' },
    { border: 'border-teal-300 hover:border-teal-500', bar: 'from-[#0D9488] to-[#0891B2]', text: 'text-[#0D9488]', shadow: 'hover:shadow-teal-500/20' },
  ];

  const getImageForProject = (project: Project) => {
    if (project.id === 'proj_1' || project.title.toLowerCase().includes('water')) {
      return '/src/assets/images/dergag_clean_water_1794153761220.jpg';
    }
    if (project.id === 'proj_2' || project.title.toLowerCase().includes('school') || project.title.toLowerCase().includes('library')) {
      return '/src/assets/images/dergag_school_children_1794153761478.jpg';
    }
    if (project.id === 'proj_3' || project.title.toLowerCase().includes('elders') || project.title.toLowerCase().includes('welfare')) {
      return '/src/assets/images/dergag_elder_charity_1794153783029.jpg';
    }
    return project.coverImage || '/src/assets/images/dergag_community_hero_1794153760705.jpg';
  };

  const filteredProjects = projects.filter((p) => {
    const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchStatus = selectedStatus === 'all' || p.status === selectedStatus;
    return matchCategory && matchStatus;
  });

  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#059669] text-white shadow-sm font-serif">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{t.projects.statusCompleted}</span>
          </span>
        );
      case 'ongoing':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#1D4ED8] text-white shadow-sm font-serif">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>{t.projects.statusOngoing}</span>
          </span>
        );
      case 'planned':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E5A000] text-[#14213D] shadow-sm font-serif">
            <Clock className="w-3.5 h-3.5" />
            <span>{t.projects.statusPlanned}</span>
          </span>
        );
    }
  };

  const getCategoryLabel = (category: ProjectCategory) => {
    switch (category) {
      case 'education': return t.projects.categoryEducation;
      case 'healthcare': return t.projects.categoryHealthcare;
      case 'social_support': return t.projects.categorySocial;
      case 'youth_development': return t.projects.categoryYouth;
      case 'community_development': return t.projects.categoryCommunity;
      case 'environmental_protection': return t.projects.categoryEnvironment;
      case 'spiritual_cultural': return t.projects.categorySpiritual;
      default: return category;
    }
  };

  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-[#F5F3FF] via-[#EFF6FF] to-[#F5F3FF] font-serif relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-10 right-0 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 border border-purple-300 text-[#7C3AED] text-xs font-bold uppercase tracking-wider mb-3">
            <FolderKanban className="w-4 h-4 text-[#7C3AED]" />
            <span>{t.projects.title}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#14213D] tracking-tight font-serif">
            {currentLang === 'am'
              ? 'በአካባቢያችን የተከናወኑና በሂደት ላይ ያሉ የልማት ፕሮጀክቶች'
              : 'Our Community Projects & Development Activities'}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#7C3AED] via-[#1D4ED8] to-[#059669] mx-auto mt-4 rounded-full" />
          <p className="text-slate-600 mt-4 font-medium text-base sm:text-lg font-serif">
            {t.projects.subtitle}
          </p>
        </div>

        {/* Filters: Category and Status */}
        <div className="space-y-4 mb-12">
          {/* Category Tabs */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer font-serif ${
                  selectedCategory === c.id
                    ? 'bg-gradient-to-r from-[#14213D] via-[#1D4ED8] to-[#7C3AED] text-white shadow-md'
                    : 'bg-white/80 border border-slate-200 text-slate-700 hover:bg-white hover:text-[#1D4ED8]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-2 font-serif">
              {currentLang === 'am' ? 'ሁኔታ፡' : 'Status:'}
            </span>
            {statuses.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedStatus(s.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer font-serif ${
                  selectedStatus === s.id
                    ? 'bg-[#059669] text-white shadow-xs'
                    : 'bg-white/80 border border-slate-200 text-slate-700 hover:bg-white'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white/60 rounded-3xl h-96 animate-pulse border border-slate-200" />
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-white/70 rounded-3xl border-2 border-dashed border-purple-300">
            <FolderKanban className="w-14 h-14 text-purple-400 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-[#14213D] font-serif">
              {currentLang === 'am' ? 'በዚህ ምድብ ምንም የተመዘገበ ፕሮጀክት የለም' : 'No projects found in this category'}
            </h4>
            <p className="text-sm text-slate-600 mt-1 font-serif">
              {currentLang === 'am' ? 'እባክዎ ሌላ ምድብ ወይም ሁኔታ ይምረጡ' : 'Try adjusting your search filters above'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => {
              const accent = cardAccents[idx % cardAccents.length];
              return (
                <div
                  key={project.id}
                  className={`bg-white rounded-3xl border-2 ${accent.border} shadow-xl ${accent.shadow} transition-all duration-300 overflow-hidden flex flex-col group hover:-translate-y-1.5`}
                >
                  {/* Project Image */}
                  <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                    <img
                      src={getImageForProject(project)}
                      alt={project.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14213D]/80 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3.5 py-1 rounded-xl bg-[#14213D]/90 text-white text-xs font-bold backdrop-blur-md border border-white/20 shadow-md font-serif">
                        {getCategoryLabel(project.category)}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      {getStatusBadge(project.status)}
                    </div>
                    <div className="absolute bottom-3.5 left-4 flex items-center gap-1.5 text-xs text-amber-200 font-semibold drop-shadow-sm font-serif">
                      <MapPin className="w-3.5 h-3.5 text-[#E5A000]" />
                      <span className="truncate">{project.location}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-7 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className={`text-xl font-bold text-[#14213D] line-clamp-2 leading-snug group-hover:${accent.text} transition-colors font-serif`}>
                        {currentLang === 'am' ? (project.titleAm || project.title) : project.title}
                      </h3>

                      <p className="text-sm text-slate-600 line-clamp-3 mt-3 leading-relaxed font-serif">
                        {currentLang === 'am' ? (project.descriptionAm || project.description) : project.description}
                      </p>
                    </div>

                    {/* Budget & Progress */}
                    <div className="pt-4 border-t border-slate-100 space-y-3 font-serif">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                        <div className="flex items-center gap-1.5">
                          <Coins className="w-4 h-4 text-[#059669]" />
                          <span>{t.projects.budget}:</span>
                          <span className="text-[#059669] font-mono text-sm">{project.budget || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[#1D4ED8]">
                          <TrendingUp className="w-4 h-4" />
                          <span className="font-mono text-sm">{project.fundingProgress || '70%'}</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
                        <div
                          className={`h-3 rounded-full bg-gradient-to-r ${accent.bar}`}
                          style={{
                            width: project.fundingProgress?.includes('%')
                              ? project.fundingProgress
                              : '75%'
                          }}
                        />
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={() => setActiveProjectModal(project)}
                        className={`w-full mt-2 py-3 px-4 rounded-xl bg-slate-50 hover:bg-gradient-to-r ${accent.bar} text-[#14213D] hover:text-white text-xs font-bold border border-slate-200 hover:border-transparent transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md font-serif`}
                      >
                        <span>{t.projects.viewDetails}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Project Detail Modal */}
        {activeProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto font-serif">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-purple-300 animate-in fade-in zoom-in-95 duration-200">
              <div className="relative h-72 sm:h-80 w-full bg-slate-900">
                <img
                  src={getImageForProject(activeProjectModal)}
                  alt={activeProjectModal.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14213D] via-black/40 to-transparent" />
                <button
                  onClick={() => setActiveProjectModal(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-md bg-[#14213D] text-white text-xs font-bold border border-white/30">
                      {getCategoryLabel(activeProjectModal.category)}
                    </span>
                    {getStatusBadge(activeProjectModal.status)}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-md">
                    {currentLang === 'am' ? (activeProjectModal.titleAm || activeProjectModal.title) : activeProjectModal.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-purple-50/70 p-4 rounded-2xl border border-purple-200 text-xs font-bold">
                  <div>
                    <span className="text-slate-500 block text-[11px] font-semibold">{t.projects.location}</span>
                    <span className="text-[#14213D] text-sm">{activeProjectModal.location}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px] font-semibold">{t.projects.budget}</span>
                    <span className="text-[#059669] text-sm font-mono">{activeProjectModal.budget || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px] font-semibold">{t.projects.progress}</span>
                    <span className="text-[#1D4ED8] text-sm font-mono">{activeProjectModal.fundingProgress || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px] font-semibold">{currentLang === 'am' ? 'የተጀመረበት' : 'Start Date'}</span>
                    <span className="text-[#14213D] text-sm font-mono">{activeProjectModal.startDate}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#14213D] uppercase tracking-wider mb-2">
                    {currentLang === 'am' ? 'የፕሮጀክቱ ዝርዝር መግለጫ' : 'Project Overview'}
                  </h4>
                  <p className="text-slate-700 text-base leading-relaxed">
                    {currentLang === 'am' ? (activeProjectModal.descriptionAm || activeProjectModal.description) : activeProjectModal.description}
                  </p>
                </div>

                {activeProjectModal.impactReport && (
                  <div className="bg-emerald-50/80 p-5 rounded-2xl border-2 border-emerald-200">
                    <h4 className="text-sm font-bold text-[#059669] flex items-center gap-2 mb-2">
                      <FileCheck2 className="w-5 h-5 text-[#059669]" />
                      <span>{t.projects.impactReport}</span>
                    </h4>
                    <p className="text-sm text-slate-700 leading-relaxed font-normal">
                      {activeProjectModal.impactReport}
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-200 flex justify-end">
                  <button
                    onClick={() => setActiveProjectModal(null)}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#14213D] to-[#1D4ED8] text-white text-xs font-bold hover:opacity-95 transition-all shadow-md cursor-pointer"
                  >
                    {currentLang === 'am' ? 'ዝጋ' : 'Close'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
