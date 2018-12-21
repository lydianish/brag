import test from 'ava';
import { impactFactor } from '../../src/utils/impactFactor';

test('get impact factor of a journal', t => {
    const journal1 = { Title: 'TRANSPLANTATION', ImpactFactor: '3.960' };
    const journal2 = { Title: 'KIDNEY INTERNATIONAL', ImpactFactor: '8.429' };
    const journal3 = { Title: 'AMERICAN JOURNAL OF KIDNEY DISEASES', ImpactFactor: '7.129' };
    const journal4 = { Title: 'JOURNAL OF THE AMERICAN SOCIETY OF NEPHROLOGY', ImpactFactor: '8.655' };
    const journal5 = { Title: 'BIOINFORMATICS', ImpactFactor: '5.481' };
    const journal6 = { Title: 'BIOMEDICINE & PHARMACOTHERAPY', ImpactFactor: '3.457' }
    const journal7 = { Title: 'CIRCULATION', ImpactFactor: '18.880' };
    const journal8 = { Title: 'JOURNAL OF INFECTIOUS DISEASES', ImpactFactor: '5.186' };
    const journal9 = { Title: 'HUMAN IMMUNOLOGY', ImpactFactor: '1.994' };

    t.is(impactFactor('Transplantation'), Number(journal1.ImpactFactor));
    t.is(impactFactor('Kidney international reports'), Number(journal2.ImpactFactor));
    t.is(impactFactor('American journal of kidney diseases : the official journal of the National Kidney Foundation'), Number(journal3.ImpactFactor));
    t.is(impactFactor('Journal of the American Society of Nephrology : JASN'), Number(journal4.ImpactFactor));
    t.is(impactFactor('Bioinformatics (Oxford, England)'), Number(journal5.ImpactFactor));
    t.is(impactFactor('Biomedicine & pharmacotherapy = Biomedecine & pharmacotherapie'), Number(journal6.ImpactFactor));
    t.is(impactFactor('Circulation. Genomic and precision medicine'), Number(journal7.ImpactFactor));
    t.is(impactFactor('The Journal of infectious diseases'), Number(journal8.ImpactFactor));
    t.is(impactFactor('Human immunology'), Number(journal9.ImpactFactor));
});