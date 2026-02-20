// ============================================================
// UTILS — Funciones de utilidad generales
// ============================================================

/** Combina clases CSS condicionalmente (reemplaza clsx + tailwind-merge) */
export const cn = (...classes: (string | boolean | undefined | null)[]): string =>
    classes.filter(Boolean).join(' ');

/** Días de un mes dado */
export const getDaysInMonth = (year: number, month: number): number =>
    new Date(year, month + 1, 0).getDate();

/** Día de la semana del primer día del mes (0 = Lunes ajustado) */
export const getFirstDayOfMonth = (year: number, month: number): number =>
    (new Date(year, month, 1).getDay() + 6) % 7;

/** Formatea una fecha ISO a texto legible en español */
export const formatDate = (date: string): string =>
    new Date(date).toLocaleDateString('es-AR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

/** Devuelve HH:MM del momento actual */
export const getCurrentTime = (): string => {
    const now = new Date();
    return `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
};

/** Genera un ID único simple */
export const generateId = (): string => `id_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

export const MONTH_NAMES = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

export const WEEK_DAYS = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'];