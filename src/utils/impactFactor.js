import { journals } from '../assets/journals';


/**
 * @fileOverview Définition de la méthode utilisée pour déterminer l'impact factor d'un journal.
*/

/** 
 * donne l'impact factor d'un journal en cherchant son nom dans la liste prédéfinie.
 * @param {string} journalTitle nom du journal
 * @returns {number} l'impact factor du journal
*/
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
