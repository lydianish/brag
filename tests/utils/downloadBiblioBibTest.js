import test from 'ava';
import { writeArticleBib } from '../../src/utils/downloadBiblioBib';

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

test('cite an article in BibTex', t => {
    const citation = '@article{sophielimou1,\r\n' +
        ' title={APOL1 genetic variants in focal segmental glomerulosclerosis and HIV-associated nephropathy},\r\n' +
        ' author={Kopp, Jeffrey B and Nelson, George W and Sampath, Karmini and Johnson, Randall C and Genovese, Giulio and An, Ping and Friedman, David and Briggs, William and Dart, Richard and Korbet, Stephen and Mokrzycki, Michele H and Kimmel, Paul L and Limou, Sophie and Ahuja, Tejinder S and Berns, Jeffrey S and Fryc, Justyna and Simon, Eric E and Smith, Michael C and Trachtman, Howard and Michel, Donna M and Schelling, Jeffrey R and Vlahov, David and Pollak, Martin and Winkler, Cheryl A},\r\n' +
        ' journal={Journal of the American Society of Nephrology : JASN},\r\n' +
        ' volume={22},\r\n' +
        ' number={11},\r\n' +
        ' pages={2129-37},\r\n' +
        ' year={2011},\r\n' +
       '}\r\n';
       t.is(writeArticleBib('sophielimou1', article), citation);
});