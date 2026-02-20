import { cn } from '../../utils';
import { HeartIcon, HomeIcon, CalendarIcon, VideoIcon, HistoryIcon } from '../ui/Icons';

// ============================================================
// SIDEBAR — Navegación lateral
// ============================================================

type ViewId = 'dashboard' | 'schedule' | 'consultation' | 'history';

interface NavItem {
    id: ViewId;
    label: string;
    Icon: React.FC<{ className?: string }>;
}

interface SidebarProps {
    activeView: ViewId;
    setActiveView: (view: ViewId) => void;
    upcomingCount: number;
}

const NAV_ITEMS: NavItem[] = [
    { id: 'dashboard', label: 'Inicio', Icon: HomeIcon },
    { id: 'schedule', label: 'Agendar Turno', Icon: CalendarIcon },
    { id: 'consultation', label: 'Videoconsulta', Icon: VideoIcon },
    { id: 'history', label: 'Historial', Icon: HistoryIcon },
];

export const Sidebar = ({ activeView, setActiveView, upcomingCount }: SidebarProps) => (
    <aside className="w-64 bg-slate-900 flex flex-col h-full flex-shrink-0">

        {/* Logo */}
        <div className="px-6 py-6 border-b border-slate-700/50">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30 text-white">
                    <HeartIcon className="w-5 h-5" />
                </div>
                <div>
                    <h1 className="text-white font-bold text-base leading-tight">MediConnect</h1>
                    <p className="text-slate-400 text-xs">Plataforma de Telemedicina</p>
                </div>
            </div>
        </div>

        {/* Perfil del paciente */}
        <div className="px-4 py-4 border-b border-slate-700/50">
            <div className="flex items-center gap-3 bg-slate-800 rounded-xl p-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow">
                    LM
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-semibold truncate">Lucas Medran</p>
                    <p className="text-slate-400 text-xs">Paciente</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-400 shadow shadow-emerald-400/50" />
            </div>
        </div>

        {/* Navegación */}
        <nav className="flex-1 px-3 py-4 space-y-1">
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider px-3 mb-3">Menú</p>
            {NAV_ITEMS.map(({ id, label, Icon }) => {
                const isActive = activeView === id;
                return (
                    <button
                        key={id}
                        onClick={() => setActiveView(id)}
                        className={cn(
                            'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer',
                            isActive
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        )}
                    >
                        <Icon className="w-5 h-5" />
                        {label}
                        {id === 'schedule' && upcomingCount > 0 && (
                            <span className="ml-auto bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {upcomingCount}
                            </span>
                        )}
                    </button>
                );
            })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-slate-700/50">
            <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/20 rounded-xl p-3">
                <p className="text-blue-300 text-xs font-semibold mb-1">💡 ¿Necesitás ayuda?</p>
                <p className="text-slate-400 text-xs">Soporte disponible 24/7</p>
            </div>
        </div>
    </aside>
);