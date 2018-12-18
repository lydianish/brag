import { journals } from '../assets/journals';

export function impactFactor (journalTitle) {
    if (journalTitle) {
        const res = journals.find( function (j) {
            let correspondance = journalTitle.toLowerCase().includes(j.Title.toLowerCase());
            if (!correspondance) {
                const titleparts = journalTitle.split(/[.:=]/g);
                for (const part of titleparts) {
                    correspondance = correspondance || j.Title.toLowerCase().includes(part.toLowerCase().trim());
                } 
            }
            return correspondance;
        });
        return res ? Number(res.ImpactFactor) : '';
    }
    return '';
}
