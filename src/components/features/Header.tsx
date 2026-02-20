import { BellIcon, UserIcon } from '../ui/Icons';

// ============================================================
// HEADER — Barra superior con título y acciones
// ============================================================

type ViewId = 'dashboard' | 'schedule' | 'consultation' | 'history';

const VIEW_TITLES: Record<ViewId, string> = {
    dashboard: 'Inicio',
    schedule: 'Agendar Turno',
    consultation: 'Videoconsulta',
    history: 'Historial Médico',
};

interface HeaderProps {
    activeView: ViewId;
}

export const Header = ({ activeView }: HeaderProps) => (
    <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between flex-shrink-0">
        <div>
            <h1 className="text-slate-800 font-bold text-lg">{VIEW_TITLES[activeView]}</h1>
            <p className="text-slate-400 text-xs">
                {new Date().toLocaleDateString('es-AR', {
                    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
                })}
            </p>
        </div>
        <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-500 relative cursor-pointer">
                <BellIcon />
                <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border border-white" />
            </button>
            <button className="w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer">
                <UserIcon />
            </button>
        </div>
    </header>
);