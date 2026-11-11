import React, { useState } from 'react';
import { Event, Language } from '../../types';
import { translations } from '../../translations';
import { api } from '../../services/api';
import {
  Calendar,
  MapPin,
  Clock,
  User,
  Users,
  CheckCircle2,
  CalendarCheck,
  CalendarDays,
  Sparkles,
  Ticket
} from 'lucide-react';

interface EventsSectionProps {
  currentLang: Language;
  events: Event[];
  onRefreshEvents?: () => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({
  currentLang,
  events,
  onRefreshEvents
}) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [rsvpLoading, setRsvpLoading] = useState<string | null>(null);
  const [rsvpdEvents, setRsvpdEvents] = useState<string[]>([]);

  const t = translations[currentLang];

  const filteredEvents = events.filter((e) => {
    if (activeTab === 'upcoming') {
      return e.status === 'upcoming';
    }
    return e.status === 'completed' || e.status === 'cancelled';
  });

  const handleRsvp = async (id: string) => {
    if (rsvpdEvents.includes(id)) return;
    try {
      setRsvpLoading(id);
      await api.rsvpEvent(id);
      setRsvpdEvents([...rsvpdEvents, id]);
      if (onRefreshEvents) onRefreshEvents();
    } catch (err) {
      console.error('Error reserving spot:', err);
    } finally {
      setRsvpLoading(null);
    }
  };

  // Color schemes for event date cards
  const dateColorStyles = [
    {
      gradient: 'from-[#7C3AED] via-[#6D28D9] to-[#4C1D95]',
      badgeBg: 'bg-gradient-to-br from-[#7C3AED] to-[#5B21B6]',
      textAccent: 'text-purple-300',
      btnGradient: 'from-[#7C3AED] to-[#5B21B6] hover:from-[#6D28D9] hover:to-[#4C1D95]'
    },
    {
      gradient: 'from-[#1D4ED8] via-[#2563EB] to-[#1E3A8A]',
      badgeBg: 'bg-gradient-to-br from-[#2563EB] to-[#1D4ED8]',
      textAccent: 'text-blue-300',
      btnGradient: 'from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E3A8A]'
    },
    {
      gradient: 'from-[#D97706] via-[#E5A000] to-[#B45309]',
      badgeBg: 'bg-gradient-to-br from-[#E5A000] to-[#D97706]',
      textAccent: 'text-amber-200',
      btnGradient: 'from-[#E5A000] to-[#D97706] hover:from-[#D97706] hover:to-[#B45309]'
    }
  ];

  return (
    <section id="events" className="py-24 bg-gradient-to-b from-[#F5F3FF] via-[#EDE9FE]/50 to-[#F5F3FF] font-times border-t border-purple-200/60 relative overflow-hidden">
      {/* Decorative colored ambient blobs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 border border-purple-300 text-[#7C3AED] text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Calendar className="w-4 h-4 text-[#7C3AED]" />
            <span>{t.events.title}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#14213D] tracking-tight">
            {currentLang === 'am'
              ? 'የማህበረሰብ መርሐ-ግብሮች፣ ጉባዔዎችና የበጎ አድራጎት ቀናት'
              : 'Community Events, General Assemblies & Workdays'}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#7C3AED] via-[#2563EB] to-[#E5A000] mx-auto mt-4 rounded-full" />
          <p className="text-slate-600 mt-4 text-base sm:text-lg font-medium leading-relaxed">
            {t.events.subtitle}
          </p>

          {/* Tab Switcher */}
          <div className="inline-flex p-1.5 bg-white border border-purple-200 rounded-2xl mt-8 shadow-sm">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'upcoming'
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <CalendarCheck className="w-4 h-4 text-amber-300" />
              <span>{t.events.upcomingTab}</span>
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'past'
                  ? 'bg-gradient-to-r from-[#14213D] to-[#1E3A8A] text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <CalendarDays className="w-4 h-4 text-purple-300" />
              <span>{t.events.pastTab}</span>
            </button>
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-20 bg-white/80 rounded-3xl border-2 border-dashed border-purple-300 shadow-sm">
            <Calendar className="w-14 h-14 text-purple-400 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-[#14213D]">
              {currentLang === 'am' ? 'በዚህ ክፍል ምንም የተመዘገበ ዝግጅት የለም' : 'No events scheduled in this category'}
            </h4>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((evt, index) => {
              const isRsvpd = rsvpdEvents.includes(evt.id);
              const isUpcoming = evt.status === 'upcoming';
              const style = dateColorStyles[index % dateColorStyles.length];

              return (
                <div
                  key={evt.id}
                  className="bg-white rounded-3xl border-2 border-purple-200/80 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:-translate-y-1.5"
                >
                  <div>
                    {/* Header Banner with Rich Colorful Date Box */}
                    <div className={`bg-gradient-to-r ${style.gradient} p-6 text-white flex items-center justify-between border-b border-white/15`}>
                      <div className="flex items-center gap-3.5">
                        <div className={`w-14 h-14 rounded-2xl ${style.badgeBg} text-white flex flex-col items-center justify-center text-center shadow-md border border-white/25`}>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-amber-200">
                            {new Date(evt.eventDate).toLocaleString('en', { month: 'short' })}
                          </span>
                          <span className="text-xl font-bold leading-none font-mono">
                            {new Date(evt.eventDate).getDate()}
                          </span>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-amber-300" />
                            <span>{evt.eventTime || '9:00 AM (EAT)'}</span>
                          </div>
                          <div className={`text-xs ${style.textAccent} font-bold mt-1`}>
                            {isUpcoming ? (currentLang === 'am' ? 'ቀጣይ ዝግጅት' : 'Upcoming Event') : (currentLang === 'am' ? 'የተጠናቀቀ' : 'Past Archive')}
                          </div>
                        </div>
                      </div>

                      <div className="text-right bg-white/15 px-3 py-1.5 rounded-xl border border-white/20">
                        <div className="text-sm font-bold text-amber-300 flex items-center gap-1 justify-end font-mono">
                          <Users className="w-3.5 h-3.5 text-white" />
                          <span>{evt.attendeeCount}</span>
                        </div>
                        <div className="text-[10px] text-white/90 font-bold">{currentLang === 'am' ? 'ተሳታፊዎች' : 'RSVPs'}</div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-7 space-y-3.5">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                        <MapPin className="w-4 h-4 text-[#059669] flex-shrink-0" />
                        <span className="truncate">{evt.location}</span>
                      </div>

                      <h3 className="text-xl font-bold text-[#14213D] leading-snug group-hover:text-[#7C3AED] transition-colors">
                        {currentLang === 'am' ? (evt.titleAm || evt.title) : evt.title}
                      </h3>

                      <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed font-normal">
                        {currentLang === 'am' ? (evt.descriptionAm || evt.description) : evt.description}
                      </p>

                      <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5 font-semibold">
                        <User className="w-3.5 h-3.5 text-[#2563EB]" />
                        <span>{t.events.organizer}:</span>
                        <span className="text-[#14213D]">{evt.organizer}</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer RSVP Action */}
                  <div className="p-6 sm:p-7 pt-0">
                    {isUpcoming ? (
                      <button
                        onClick={() => handleRsvp(evt.id)}
                        disabled={isRsvpd || rsvpLoading === evt.id}
                        className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                          isRsvpd
                            ? 'bg-emerald-50 text-[#059669] border-2 border-emerald-300 cursor-default'
                            : `bg-gradient-to-r ${style.btnGradient} text-white hover:shadow-md transform hover:-translate-y-0.5`
                        }`}
                      >
                        {isRsvpd ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                            <span>{t.events.rsvpSuccess}</span>
                          </>
                        ) : (
                          <>
                            <Ticket className="w-4 h-4 text-amber-200" />
                            <span>{rsvpLoading === evt.id ? '...' : t.events.rsvpBtn}</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="text-center py-2.5 text-xs text-slate-500 bg-slate-50 rounded-xl border border-slate-200 font-semibold">
                        {currentLang === 'am' ? 'ይህ መርሐ-ግብር ተጠናቋል' : 'This event has concluded'}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
