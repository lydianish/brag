import { journals } from '../assets/journals';

/** la fonction impactFactor donne l'impact factor du journal en argument
*@param {string} journalTitle - nom du journal
*@returns {string} impact factor
*/



export function impactFactor (journalTitle) {
    if (journalTitle) {
        const res = journals.find( (j) => j.Title.toLowerCase() === journalTitle.toLowerCase() );
        return res ? Number(res.ImpactFactor) : '';
    }
    return '';
}
