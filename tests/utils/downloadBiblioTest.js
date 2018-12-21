import test from 'ava';
import { writeArticleMLA, writeArticleVCV } from '../../src/utils/downloadBiblio';

const article = { 
    title: 'APOL1 genetic variants in focal segmental glomerulosclerosis and HIV-associated nephropathy',
    journal: 
        { title: 'Journal of the American Society of Nephrology : JASN',
        volume: '22',
        issue: '11',
        year: '2011',
        month: 'Nov',
        impactFactor: 8.655 },
    pagination: '2129-37',
    authors: 
        [ { lastName: 'Kopp', foreName: 'Jeffrey B', initials: 'JB' },
        { lastName: 'Nelson', foreName: 'George W', initials: 'GW' },
        { lastName: 'Sampath', foreName: 'Karmini', initials: 'K' },
        { lastName: 'Johnson', foreName: 'Randall C', initials: 'RC' },
        { lastName: 'Genovese', foreName: 'Giulio', initials: 'G' },
        { lastName: 'An', foreName: 'Ping', initials: 'P' },
        { lastName: 'Friedman', foreName: 'David', initials: 'D' },
        { lastName: 'Briggs', foreName: 'William', initials: 'W' },
        { lastName: 'Dart', foreName: 'Richard', initials: 'R' },
        { lastName: 'Korbet', foreName: 'Stephen', initials: 'S' },
        { lastName: 'Mokrzycki', foreName: 'Michele H', initials: 'MH' },
        { lastName: 'Kimmel', foreName: 'Paul L', initials: 'PL' },
        { lastName: 'Limou', foreName: 'Sophie', initials: 'S' },
        { lastName: 'Ahuja', foreName: 'Tejinder S', initials: 'TS' },
        { lastName: 'Berns', foreName: 'Jeffrey S', initials: 'JS' },
        { lastName: 'Fryc', foreName: 'Justyna', initials: 'J' },
        { lastName: 'Simon', foreName: 'Eric E', initials: 'EE' },
        { lastName: 'Smith', foreName: 'Michael C', initials: 'MC' },
        { lastName: 'Trachtman', foreName: 'Howard', initials: 'H' },
        { lastName: 'Michel', foreName: 'Donna M', initials: 'DM' },
        { lastName: 'Schelling', foreName: 'Jeffrey R', initials: 'JR' },
        { lastName: 'Vlahov', foreName: 'David', initials: 'D' },
        { lastName: 'Pollak', foreName: 'Martin', initials: 'M' },
        { lastName: 'Winkler', foreName: 'Cheryl A', initials: 'CA' } ],
    citationCount: 419,
    pmid: '21997394' 
};

test('cite an article in MLA format', t => {
    const citation = 'Kopp, Jeffrey B, et al. "APOL1 genetic variants in focal segmental glomerulosclerosis and HIV-associated nephropathy." Journal of the American Society of Nephrology : JASN 22.11 (2011): 2129-37(IF=8.655; 419 citations).';
    t.is(writeArticleMLA(article), citation);
});

test('cite an article in Vancouver', t => {
    const citation = ' Kopp J, Nelson G, Sampath K, Johnson R, Genovese G, An P, Friedman D, Briggs W, Dart R, Korbet S, Mokrzycki M, Kimmel P, Limou S, Ahuja T, Berns J, Fryc J, Simon E, Smith M, Trachtman H, Michel D, Schelling J, Vlahov D, Pollak M, Winkler C. APOL1 genetic variants in focal segmental glomerulosclerosis and HIV-associated nephropathy. Journal of the American Society of Nephrology : JASN, 2011; 22(11):2129-37(IF=8.655; 419 citations).';
    t.is(writeArticleVCV(article), citation);
});
