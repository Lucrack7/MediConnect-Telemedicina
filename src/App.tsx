import type { Appointment } from '../src/types';
import { useAppointments } from './hooks';
import { Sidebar } from './components/features/Sidebar';
import { Header } from './components/features/Header';
import { DashboardView }    from './views/DashboardView';
import { ScheduleView }     from './views/ScheduleView';
import { ConsultationView } from './views/ConsultationView';
import { HistoryView }      from './views/HistoryView';
import { useState } from 'react';

// ============================================================
// APP — Componente raíz. Maneja la vista activa y el estado global.
// ============================================================

type ViewId = 'dashboard' | 'schedule' | 'consultation' | 'history';

export default function App() {
  const [activeView, setActiveView] = useState<ViewId>('dashboard');
  const { appointments, upcoming, addAppointment } = useAppointments();

  const handleAppointmentBooked = (apt: Omit<Appointment, 'id'>) => {
    addAppointment(apt);
    setActiveView('dashboard');
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <DashboardView
            appointments={appointments}
            onSchedule={() => setActiveView('schedule')}
          />
        );
      case 'schedule':
        return <ScheduleView onAppointmentBooked={handleAppointmentBooked} />;
      case 'consultation':
        return <ConsultationView appointments={appointments} />;
      case 'history':
        return <HistoryView />;
    }
  };

  return (
    <div
      className="flex h-screen bg-slate-50 overflow-hidden"
      style={{ fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif" }}
    >
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        upcomingCount={upcoming.length}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header activeView={activeView} />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
}