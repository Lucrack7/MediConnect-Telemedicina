import type { Appointment } from '../types';
import { DOCTORS, SPECIALTIES } from '../services/mockData';
import { formatDate } from '../utils';
import { Badge, Button, Card } from '../components/ui';
import { CalendarIcon, ClockIcon } from '../components/ui/Icons';

// ============================================================
// DASHBOARD VIEW — Vista principal del paciente
// ============================================================

interface DashboardViewProps {
    appointments: Appointment[];
    onSchedule: () => void;
}

const STATS = [
    { label: 'Turnos este mes', value: '3', icon: '📅' },
    { label: 'Médicos consultados', value: '5', icon: '👨‍⚕️' },
    { label: 'Recetas emitidas', value: '8', icon: '📋' },
    { label: 'Horas de consulta', value: '12', icon: '⏱️' },
];

export const DashboardView = ({ appointments, onSchedule }: DashboardViewProps) => {
    const upcoming = appointments.filter(
        (a) => a.status === 'confirmed' || a.status === 'pending'
    );

    return (
        <div className="space-y-6">

            {/* Banner de bienvenida */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/5" />
                <div className="absolute -right-4 -bottom-12 w-52 h-52 rounded-full bg-white/5" />
                <div className="relative">
                    <p className="text-blue-200 text-sm font-medium">Buenos días 👋</p>
                    <h2 className="text-white text-2xl font-bold mt-1">Lucas Medran</h2>
                    <p className="text-blue-200 text-sm mt-1">¿Cómo te sentís hoy?</p>
                    <Button variant="secondary" size="sm" className="mt-4 !text-blue-600" onClick={onSchedule}>
                        + Nuevo Turno
                    </Button>
                </div>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-4 gap-4">
                {STATS.map((s, i) => (
                    <Card key={i} className="p-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl mb-3">
                            {s.icon}
                        </div>
                        <p className="text-slate-800 font-bold text-2xl">{s.value}</p>
                        <p className="text-slate-500 text-xs mt-0.5">{s.label}</p>
                    </Card>
                ))}
            </div>

            {/* Próximos turnos */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-slate-800">Próximos Turnos</h3>
                    <Badge variant="default">{upcoming.length} pendientes</Badge>
                </div>

                {upcoming.length > 0 ? (
                    <div className="space-y-3">
                        {upcoming.map((apt) => {
                            const doctor = DOCTORS.find((d) => d.id === apt.doctorId);
                            return (
                                <Card key={apt.id} className="p-4 flex items-center gap-4">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0"
                                        style={{ backgroundColor: doctor?.avatarColor ?? '#4f8ef7' }}
                                    >
                                        {doctor?.avatar}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-slate-800 font-semibold text-sm">{apt.doctorName}</p>
                                        <p className="text-blue-600 text-xs">{apt.specialty}</p>
                                        <div className="flex items-center gap-2 mt-1 text-slate-400 text-xs">
                                            <CalendarIcon className="w-3 h-3" />
                                            <span>{formatDate(apt.date)}</span>
                                            <ClockIcon className="w-3 h-3" />
                                            <span>{apt.time}</span>
                                        </div>
                                    </div>
                                    <Badge variant="success">Confirmado</Badge>
                                </Card>
                            );
                        })}
                    </div>
                ) : (
                    <Card className="p-8 text-center">
                        <p className="text-slate-400 text-sm">No tenés turnos próximos.</p>
                        <Button size="sm" className="mt-3" onClick={onSchedule}>Agendar ahora</Button>
                    </Card>
                )}
            </div>

            {/* Especialidades */}
            <div>
                <h3 className="font-bold text-slate-800 mb-3">Especialidades</h3>
                <div className="grid grid-cols-3 gap-3">
                    {SPECIALTIES.map((s) => (
                        <Card
                            key={s.id}
                            className="p-4 flex items-center gap-3 hover:border-blue-200 hover:shadow-md cursor-pointer transition-all"
                            onClick={onSchedule}
                        >
                            <span className="text-2xl">{s.icon}</span>
                            <span className="text-slate-700 text-sm font-medium">{s.name}</span>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};