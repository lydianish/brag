import test from 'ava';
import { articleCitationCount, splitTitle, flattenTitle } from '../../src/utils/crossArticles';

const gsArticles = [
  {
      title: "APOL1 nephropathy risk variants do not associate with subclinical atherosclerosis or left ventricular mass in middle-aged black adults",
      year: 2018,
      citationCount: 4
  },
  {
      title: "DRAM triggers lysosomal membrane permeabilization and cell death in CD4+ T cells infected with HIV",
      year: 2013,
      citationCount: 33
  },
  {
      title: "Screening low frequency SNPS from genome wide association study reveals a new risk allele for progression to AIDS",
      year: 2011,
      citationCount: 28
  },
  {
      title: "Renal and cardiovascular morbidities associated with APOL1 status among African-American and non-African-American children with focal segmental glomerulosclerosis",
      year: 2016,
      citationCount: 8
  },
  {
      title: "APOL1-associated glomerular disease among African-American children: a collaboration of the Chronic Kidney Disease in Children (CKiD) and Nephrotic …",
      year: 2016,
      citationCount: 23
  }
];
const article1 = { title: 
  {
    "_text": "APOL1 nephropathy risk variants do not associate with subclinical atherosclerosis or left ventricular mass in middle-aged black adults."
  },
 journal: 
  { title: 'Kidney international',
    volume: '93',
    issue: '3',
    year: '2018',
    month: '03',
    impactFactor: '' },
 pagination: '727-732',
 authors: 
  [ { lastName: 'Gutiérrez', foreName: 'Orlando M', initials: 'OM' },
    { lastName: 'Limou', foreName: 'Sophie', initials: 'S' },
    { lastName: 'Lin', foreName: 'Feng', initials: 'F' },
    { lastName: 'Peralta', foreName: 'Carmen A', initials: 'CA' },
    { lastName: 'Kramer', foreName: 'Holly J', initials: 'HJ' },
    { lastName: 'Carr', foreName: 'J Jeffrey', initials: 'JJ' },
    { lastName: 'Bibbins-Domingo',
      foreName: 'Kirsten',
      initials: 'K' },
    { lastName: 'Winkler', foreName: 'Cheryl A', initials: 'CA' },
    { lastName: 'Lewis', foreName: 'Cora E', initials: 'CE' },
    { lastName: 'Kopp', foreName: 'Jeffrey B', initials: 'JB' } ],
 citationCount: '',
 pmid: '29042080' };
const article2 = { title: 
  {
    "_text": "DRAM triggers lysosomal membrane permeabilization and cell death in CD4(+) T cells infected with HIV."
  },
 journal: 
  { title: 'PLoS pathogens',
    volume: '9',
    issue: '5',
    year: '2013',
    month: '',
    impactFactor: '' },
 pagination: 'e1003328',
 authors: 
  [ { lastName: 'Laforge', foreName: 'Mireille', initials: 'M' },
    { lastName: 'Limou', foreName: 'Sophie', initials: 'S' },
    { lastName: 'Harper', foreName: 'Francis', initials: 'F' },
    { lastName: 'Casartelli', foreName: 'Nicoletta', initials: 'N' },
    { lastName: 'Rodrigues', foreName: 'Vasco', initials: 'V' },
    { lastName: 'Silvestre', foreName: 'Ricardo', initials: 'R' },
    { lastName: 'Haloui', foreName: 'Houda', initials: 'H' },
    { lastName: 'Zagury', foreName: 'Jean-Francois', initials: 'JF' },
    { lastName: 'Senik', foreName: 'Anna', initials: 'A' },
    { lastName: 'Estaquier', foreName: 'Jerome', initials: 'J' } ],
 citationCount: '',
 pmid: '23658518' };
const article3 = { title: 
  {
    "_text": "Screening low-frequency SNPS from genome-wide association study reveals a new risk allele for progression to AIDS."
  },
 journal: 
  { title: 'Journal of acquired immune deficiency syndromes (1999)',
    volume: '56',
    issue: '3',
    year: '2011',
    month: 'Mar',
    impactFactor: '' },
 pagination: '279-84',
 authors: 
  [ { lastName: 'Le Clerc', foreName: 'Sigrid', initials: 'S' },
    { lastName: 'Coulonges', foreName: 'Cédric', initials: 'C' },
    { lastName: 'Delaneau', foreName: 'Olivier', initials: 'O' },
    { lastName: 'Van Manen', foreName: 'Danielle', initials: 'D' },
    { lastName: 'Herbeck', foreName: 'Joshua T', initials: 'JT' },
    { lastName: 'Limou', foreName: 'Sophie', initials: 'S' },
    { lastName: 'An', foreName: 'Ping', initials: 'P' },
    { lastName: 'Martinson', foreName: 'Jeremy J', initials: 'JJ' },
    { lastName: 'Spadoni', foreName: 'Jean-Louis', initials: 'JL' },
    { lastName: 'Therwath', foreName: 'Amu', initials: 'A' },
    { lastName: 'Veldink', foreName: 'Jan H', initials: 'JH' },
    { lastName: 'van den Berg',
      foreName: 'Leonard H',
      initials: 'LH' },
    { lastName: 'Taing', foreName: 'Lieng', initials: 'L' },
    { lastName: 'Labib', foreName: 'Taoufik', initials: 'T' },
    { lastName: 'Mellak', foreName: 'Safa', initials: 'S' },
    { lastName: 'Montes', foreName: 'Matthieu', initials: 'M' },
    { lastName: 'Delfraissy',
      foreName: 'Jean-François',
      initials: 'JF' },
    { lastName: 'Schächter', foreName: 'François', initials: 'F' },
    { lastName: 'Winkler', foreName: 'Cheryl', initials: 'C' },
    { lastName: 'Froguel', foreName: 'Philippe', initials: 'P' },
    { lastName: 'Mullins', foreName: 'James I', initials: 'JI' },
    { lastName: 'Schuitemaker', foreName: 'Hanneke', initials: 'H' },
    { lastName: 'Zagury', foreName: 'Jean-François', initials: 'JF' } ],
 citationCount: '',
 pmid: '21107268' };
const article4 = { title: 
  {
    "_text": [
        "Renal and Cardiovascular Morbidities Associated with ",
        " Status among African-American and Non-African-American Children with Focal Segmental Glomerulosclerosis."
    ],
    "i": {
        "_text": "APOL1"
    }
  },
 journal: 
  { title: 'Frontiers in pediatrics',
    volume: '4',
    issue: '',
    year: '2016',
    month: '',
    impactFactor: '' },
 pagination: '122',
 authors: 
  [ { lastName: 'Woroniecki', foreName: 'Robert P', initials: 'RP' },
    { lastName: 'Ng', foreName: 'Derek K', initials: 'DK' },
    { lastName: 'Limou', foreName: 'Sophie', initials: 'S' },
    { lastName: 'Winkler', foreName: 'Cheryl A', initials: 'CA' },
    { lastName: 'Reidy', foreName: 'Kimberly J', initials: 'KJ' },
    { lastName: 'Mitsnefes', foreName: 'Mark', initials: 'M' },
    { lastName: 'Sampson', foreName: 'Matthew G', initials: 'MG' },
    { lastName: 'Wong', foreName: 'Craig S', initials: 'CS' },
    { lastName: 'Warady', foreName: 'Bradley A', initials: 'BA' },
    { lastName: 'Furth', foreName: 'Susan L', initials: 'SL' },
    { lastName: 'Kopp', foreName: 'Jeffrey B', initials: 'JB' },
    { lastName: 'Kaskel', foreName: 'Frederick J', initials: 'FJ' } ],
 citationCount: '',
 pmid: '27900314' };
const article5 = { title: 
  {
    "_text": "APOL1-associated glomerular disease among African-American children: a collaboration of the Chronic Kidney Disease in Children (CKiD) and Nephrotic Syndrome Study Network (NEPTUNE) cohorts."
  },
 journal: 
  { title: 'Nephrology, dialysis, transplantation : official publication of the European Dialysis and Transplant Association - European Renal Association',
    volume: '32',
    issue: '6',
    year: '2017',
    month: 'Jun',
    impactFactor: '' },
 pagination: '983-990',
 authors: 
  [ { lastName: 'Ng', foreName: 'Derek K', initials: 'DK' },
    { lastName: 'Robertson',
      foreName: 'Catherine C',
      initials: 'CC' },
    { lastName: 'Woroniecki', foreName: 'Robert P', initials: 'RP' },
    { lastName: 'Limou', foreName: 'Sophie', initials: 'S' },
    { lastName: 'Gillies',
      foreName: 'Christopher E',
      initials: 'CE' },
    { lastName: 'Reidy', foreName: 'Kimberly J', initials: 'KJ' },
    { lastName: 'Winkler', foreName: 'Cheryl A', initials: 'CA' },
    { lastName: 'Hingorani', foreName: 'Sangeeta', initials: 'S' },
    { lastName: 'Gibson', foreName: 'Keisha L', initials: 'KL' },
    { lastName: 'Hjorten', foreName: 'Rebecca', initials: 'R' },
    { lastName: 'Sethna', foreName: 'Christine B', initials: 'CB' },
    { lastName: 'Kopp', foreName: 'Jeffrey B', initials: 'JB' },
    { lastName: 'Moxey-Mims', foreName: 'Marva', initials: 'M' },
    { lastName: 'Furth', foreName: 'Susan L', initials: 'SL' },
    { lastName: 'Warady', foreName: 'Bradley A', initials: 'BA' },
    { lastName: 'Kretzler', foreName: 'Matthias', initials: 'M' },
    { lastName: 'Sedor', foreName: 'John R', initials: 'JR' },
    { lastName: 'Kaskel', foreName: 'Frederick J', initials: 'FJ' },
    { lastName: 'Sampson', foreName: 'Matthew G', initials: 'MG' } ],
 citationCount: '',
 pmid: '27190333' };

const article5title = "APOL1-associated glomerular disease among African-American children: a collaboration of the Chronic Kidney Disease in Children (CKiD) and Nephrotic Syndrome Study Network (NEPTUNE) cohorts"

test.before(t => {
    articleCitationCount(article1,gsArticles)
    articleCitationCount(article2,gsArticles)
    articleCitationCount(article3,gsArticles)
    articleCitationCount(article4,gsArticles)
    articleCitationCount(article5,gsArticles)
});

test('find the citation count of an article', t => {
    t.is(article1.citationCount, gsArticles[0].citationCount);
    t.is(article2.citationCount, gsArticles[1].citationCount);
    t.is(article3.citationCount, gsArticles[2].citationCount);
    t.is(article4.citationCount, gsArticles[3].citationCount);
    t.is(article5.citationCount, gsArticles[4].citationCount);
});

test('set the title of an article', t => {
    t.is(article1.title, gsArticles[0].title);
    t.is(article2.title, gsArticles[1].title);
    t.is(article3.title, gsArticles[2].title);
    t.is(article4.title, gsArticles[3].title);
    t.is(article5.title, article5title);
});

const title1 = { 
  i: { _text: 'NPHS2' },
  _text: ' V260E Is a Frequent Cause of Steroid-Resistant Nephrotic Syndrome in Black South African Children.' 
};
const title2 = { 
  _text: '23rd Nantes Actualités Transplantation: "Genomics and Immunogenetics of Kidney and Inflammatory Diseases - Lessons for Transplantation".' 
};
const title3 = { 
  _text: 'Genetic screening of male patients with primary hypogammaglobulinemia can guide diagnosis and clinical management.' 
};
const title4 = { 
  _text: 
      [ 'Renal and Cardiovascular Morbidities Associated with ',
      ' Status among African-American and Non-African-American Children with Focal Segmental Glomerulosclerosis.' ],
 i: { _text: 'APOL1' } 
};

test('split PubMed article title', t => {
  t.deepEqual(splitTitle(title1), 
      [ 'NPHS2',
      '',
      'V260E',
      'Is',
      'a',
      'Frequent',
      'Cause',
      'of',
      'Steroid',
      'Resistant',
      'Nephrotic',
      'Syndrome',
      'in',
      'Black',
      'South',
      'African',
      'Children' ]
  );
  t.deepEqual(splitTitle(title2), 
      [ '23rd',
      'Nantes',
      'Actualités',
      'Transplantation',
      '',
      '',
      'Genomics',
      'and',
      'Immunogenetics',
      'of',
      'Kidney',
      'and',
      'Inflammatory',
      'Diseases',
      '',
      '',
      'Lessons',
      'for',
      'Transplantation',
      '' ]
  );
  t.deepEqual(splitTitle(title3), 
      [ 'Genetic',
      'screening',
      'of',
      'male',
      'patients',
      'with',
      'primary',
      'hypogammaglobulinemia',
      'can',
      'guide',
      'diagnosis',
      'and',
      'clinical',
      'management' ]
  );
  t.deepEqual(splitTitle(title4), 
      [ 'Renal',
      'and',
      'Cardiovascular',
      'Morbidities',
      'Associated',
      'with',
      '',
      '',
      'Status',
      'among',
      'African',
      'American',
      'and',
      'Non',
      'African',
      'American',
      'Children',
      'with',
      'Focal',
      'Segmental',
      'Glomerulosclerosis',
      'APOL1' ]
  );
});

test('Flatten PubMed article title', t => {
  t.is(flattenTitle(title1), 'NPHS2 V260E Is a Frequent Cause of Steroid-Resistant Nephrotic Syndrome in Black South African Children');
  t.is(flattenTitle(title2), '23rd Nantes Actualités Transplantation: "Genomics and Immunogenetics of Kidney and Inflammatory Diseases - Lessons for Transplantation"');
  t.is(flattenTitle(title3), 'Genetic screening of male patients with primary hypogammaglobulinemia can guide diagnosis and clinical management');
  // doesn't work here:
  t.not(flattenTitle(title4), 'Renal and Cardiovascular Morbidities Associated with APOL1 Status among African-American and Non-African-American Children with Focal Segmental Glomerulosclerosis');
});