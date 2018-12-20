import { journals } from '../assets/journals';

export function impactFactor (journalTitle) {
    if (journalTitle) {
        let res = journals.find( function (j) {
            let correspondance = false;
            const titleparts = journalTitle.split(/[.:=]/g);
            if (titleparts.length == 1 ) {
                correspondance = (j.Title.toLowerCase() === titleparts[0].toLowerCase().trim());
            } else {
                for (const part of titleparts) {
                    correspondance = correspondance || j.Title.toLowerCase().includes(part.toLowerCase().trim());
                } 
            }
            return correspondance;
            });
        if (res === undefined) {
            res = journals.find( function (j) { 
                return journalTitle.toLowerCase().includes(j.Title.toLowerCase());
            });
        }
        return res ? Number(res.ImpactFactor) : '';
    }
    return '';
}
