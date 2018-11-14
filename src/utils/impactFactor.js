import { journals} from '../assets/samplecsv'

export function impactFactor (journalTitle) {
    const res = journals.find( (j) => j.Title.toLowerCase() === journalTitle.toLowerCase() );
    return res ? res.SJR.replace(/,/, '.') : '';
}
