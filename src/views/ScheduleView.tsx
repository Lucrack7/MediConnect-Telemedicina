import { useState } from 'react';
import type { Appointment, Doctor } from '../types';
import { DOCTORS, SPECIALTIES } from '../services/mockData';
import { Card } from '../components/ui';
import { DoctorCard } from '../components/features/DoctorCard';
import { AppointmentCalendar } from '../components/features/AppointmentCalendar';
import { SearchIcon, ChevronLeftIcon } from '../components/ui/Icons';

// ============================================================
// SCHEDULE VIEW — Búsqueda de médicos y agendamiento
// ============================================================

interface ScheduleViewProps {
    onAppointmentBooked: (apt: Omit<Appointment, 'id'>) => void;
}

export const ScheduleView = ({ onAppointmentBooked }: ScheduleViewProps) => {
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [search, setSearch] = useState('');
    const [filterSpecialty, setFilterSpecialty] = useState('all');

    const filtered = DOCTORS.filter((d) => {
        const matchName = d.name.toLowerCase().includes(search.toLowerCase());
        const matchSpec = filterSpecialty === 'all' || d.specialty === filterSpecialty;
        return matchName && matchSpec;
    });

    /* ── Pantalla de calendario para un médico seleccionado ── */
    if (selectedDoctor) {
        return (
            <div>
                <button
                    onClick={() => setSelectedDoctor(null)}
                    className="flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-4 text-sm font-medium transition-colors cursor-pointer"
                >
                    <ChevronLeftIcon /> Volver a médicos
                </button>

                <Card className="p-6">
                    {/* Cabecera del médico */}
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                        <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl"
                            style={{ backgroundColor: selectedDoctor.avatarColor }}
                        >
                            {selectedDoctor.avatar}
                        </div>
                        <div>
                            <h2 className="text-slate-800 font-bold text-lg">{selectedDoctor.name}</h2>
                            <p className="text-blue-600 font-medium">{selectedDoctor.specialty}</p>
                            <p className="text-slate-400 text-sm">{selectedDoctor.experience} años de experiencia</p>
                        </div>
                    </div>

                    <AppointmentCalendar
                        doctor={selectedDoctor}
                        onConfirm={(apt) => {
                            onAppointmentBooked(apt);
                            setSelectedDoctor(null);
                        }}
                    />
                </Card>
            </div>
        );
    }

    /* ── Lista de médicos ── */
    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-xl font-bold text-slate-800">Agendar Turno</h2>
                <p className="text-slate-500 text-sm">Elegí un médico y seleccioná tu horario</p>
            </div>

            {/* Filtros */}
            <div className="flex gap-3">
                <div className="flex-1 relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <SearchIcon />
                    </div>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar médico..."
                        className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                    />
                </div>
                <select
                    value={filterSpecialty}
                    onChange={(e) => setFilterSpecialty(e.target.value)}
                    className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400 bg-white text-slate-600 cursor-pointer"
                >
                    <option value="all">Todas las especialidades</option>
                    {SPECIALTIES.map((s) => (
                        <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                </select>
            </div>

            {/* Grid de médicos */}
            <div className="space-y-3">
                {filtered.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} onSchedule={setSelectedDoctor} />
                ))}
                {filtered.length === 0 && (
                    <p className="text-center text-slate-400 py-10">No se encontraron médicos con esos filtros.</p>
                )}
            </div>
        </div>
    );
};