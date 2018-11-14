import { journals} from '../assets/samplecsv'

export function impactFactor (journalTitle) {
    if (journalTitle) {
        const res = journals.find( (j) => j.Title.toLowerCase() === journalTitle.toLowerCase() );
        return res ? res.SJR.replace(',' , '.') : '';
    }
    return '';
}
