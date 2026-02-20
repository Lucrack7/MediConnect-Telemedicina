import { useState } from 'react';
import { PAST_APPOINTMENTS, DOCTORS } from '../services/mockData';
import { formatDate } from '../utils';
import { Badge, Card } from '../components/ui';
import { FileTextIcon, DownloadIcon, CalendarIcon, ClockIcon, CheckIcon } from '../components/ui/Icons';

// ============================================================
// HISTORY VIEW — Historial de consultas y recetas
// ============================================================

export const HistoryView = () => {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const downloadPrescription = (apt: typeof PAST_APPOINTMENTS[0]) => {
        const content = [
            'RECETA MÉDICA DIGITAL — MediConnect',
            '─'.repeat(40),
            `Médico:     ${apt.doctorName}`,
            `Especialidad: ${apt.specialty}`,
            `Fecha:      ${formatDate(apt.date)} a las ${apt.time}`,
            '',
            'PRESCRIPCIÓN:',
            apt.prescription ?? '',
            '',
            '─'.repeat(40),
            'Documento generado por MediConnect MVP',
        ].join('\n');

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `receta-${apt.id}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-xl font-bold text-slate-800">Historial Médico</h2>
                <p className="text-slate-500 text-sm">Tus consultas y recetas anteriores</p>
            </div>

            <div className="space-y-3">
                {PAST_APPOINTMENTS.map((apt) => {
                    const doctor = DOCTORS.find((d) => d.id === apt.doctorId);
                    const isExpanded = expandedId === apt.id;

                    return (
                        <Card key={apt.id} className="p-5">
                            <div className="flex items-start gap-4">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0"
                                    style={{ backgroundColor: doctor?.avatarColor ?? '#4f8ef7' }}
                                >
                                    {doctor?.avatar}
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <h3 className="text-slate-800 font-bold text-sm">{apt.doctorName}</h3>
                                            <p className="text-blue-600 text-xs font-medium">{apt.specialty}</p>
                                        </div>
                                        <Badge variant="success">
                                            <CheckIcon className="w-3 h-3" /> Completada
                                        </Badge>
                                    </div>

                                    <div className="flex items-center gap-2 mt-2 text-slate-400 text-xs">
                                        <CalendarIcon className="w-3 h-3" />
                                        <span>{formatDate(apt.date)}</span>
                                        <ClockIcon className="w-3 h-3" />
                                        <span>{apt.time}</span>
                                    </div>

                                    {apt.prescription && (
                                        <div className="mt-3 space-y-2">
                                            <button
                                                onClick={() => setExpandedId(isExpanded ? null : apt.id)}
                                                className="flex items-center gap-2 text-blue-600 text-xs font-semibold hover:text-blue-700 transition-colors cursor-pointer"
                                            >
                                                <FileTextIcon className="w-4 h-4" />
                                                {isExpanded ? 'Ocultar Receta' : 'Ver Receta Médica'}
                                            </button>

                                            {isExpanded && (
                                                <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                                                            <FileTextIcon className="w-3 h-3" />
                                                        </div>
                                                        <p className="text-blue-800 font-bold text-xs">Receta Médica Digital</p>
                                                    </div>
                                                    <p className="text-slate-700 text-xs leading-relaxed font-mono bg-white rounded-lg p-2 border border-blue-100">
                                                        {apt.prescription}
                                                    </p>
                                                    <button
                                                        onClick={() => downloadPrescription(apt)}
                                                        className="mt-2 flex items-center gap-1.5 text-blue-600 text-xs font-semibold hover:text-blue-800 transition-colors cursor-pointer"
                                                    >
                                                        <DownloadIcon />
                                                        Descargar receta (.txt)
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};