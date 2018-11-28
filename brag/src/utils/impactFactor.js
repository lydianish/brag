import { journals } from '../assets/journals';

export function impactFactor (journalTitle) {
    if (journalTitle) {
        const res = journals.find( (j) => j.Title.toLowerCase() === journalTitle.toLowerCase() );
        return res ? Number(res.ImpactFactor) : '';
    }
    return '';
}
