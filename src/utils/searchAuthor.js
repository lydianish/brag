/*export default function (searchTerm) {
    return sampleAuthor;
    //throw 'Search function not yet defined!';
}
*/

const axios = require('axios');
var convert = require('xml-js');

var author = 'sophie limou';
var pubMedUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/';
var pubMedSearchParams = 'esearch.fcgi?db=pubmed&term='+author.replace(/\s+/g,'+')+'[author]&usehistory=y&retmax=0';


var result = axios.get(pubMedUrl+ pubMedSearchParams)
  .then(response => {

    var resultat1 = convert.xml2js(response.data, {compact: true, spaces: 4});
    var queryKey = getQueryKey(resultat1);
    var webInv = getWebInv(resultat1);
    var qw = {
     queryKey : queryKey,
     webInv : webInv
 };
    return qw;
  })
.then(qw => {return axios.get('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&query_key='+qw.queryKey+'&WebEnv='+qw.webInv+'&rettype=medline&retmode=xml')
})

.then(response => {
    var resultat2 = convert.xml2js(response.data, {compact: true, spaces: 4});
    var resultat3 = transform(resultat2);

    console.log(resultat3.articles[0].authors[0]);
    //console.log(resultat3);
    return resultat2;
  })


  .catch(error => {
    console.log(error);
  });



function getQueryKey(res){
    return res.eSearchResult.QueryKey._text;
};

function getWebInv(res){
    return res.eSearchResult.WebEnv._text;
};



function transform(resultat2){

    var listeArticle = transform2(resultat2.PubmedArticleSet.PubmedArticle);
    console.log("nombre article : " + listeArticle.length);
    return auteur = {
    lastName: 'Limou',
    foreName: 'Sophie',
    initials: 'S',
    affiliation: [
        'Centre de Recherche en Transplantation et Immunologie UMR 1064, INSERM, Université de Nantes, Nantes, France',
        'Institut de Transplantation Urologie Néphrologie (ITUN), CHU Nantes, Nantes, France',
        'Ecole Centrale de Nantes, Nantes, France'
    ],
    articles : listeArticle
    }

};

function transform2(listeArticle){
    var listeArticle2 = listeArticle.map(transformeArticle);
    return listeArticle2;
};

function transformeArticle(articleInit)   {
    var article = articleInit.MedlineCitation.Article;
    var listeAuthor = article.AuthorList.Author;
    var listeAuthorTransformed = listeAuthor.map(transformeAuthor);
    return articleResultat = {
        title : article.ArticleTitle._text,
        journal : {
            title : article.Journal.Title,
            volume : article.Journal.JournalIssue.Volume,
            volume : article.Journal.JournalIssue.Issue,
            year : article.Journal.JournalIssue.PubDate.Year,
            month : article.Journal.JournalIssue.PubDate.Month,
            impactFactor : "a definir"

        },
       pagination : article.Pagination,
       authors : listeAuthor,
       citationCount: 0

    };
};


 function transformeAuthor(author)   {

    return authorResultat = {
        lastName: author.LastName,
        foreName: author.ForeName,
        initials: author.Initials,
        affiliation: []

    };
};











const sampleAuthor = {
    lastName: 'Limou',
    foreName: 'Sophie',
    initials: 'S',
    affiliation: [
        'Centre de Recherche en Transplantation et Immunologie UMR 1064, INSERM, Université de Nantes, Nantes, France',
        'Institut de Transplantation Urologie Néphrologie (ITUN), CHU Nantes, Nantes, France',
        'Ecole Centrale de Nantes, Nantes, France'
    ],
    articles: [
        {
            title: 'Genetic screening of male patients with primary hypogammaglobulinemia can guide diagnosis and clinical management.',
            journal: {
                title: 'Human immunology',
                volume: 79,
                issue: 7,
                year: 2018, 
                month: 'Jul',
                impactFactor: 1.994
            },
            pagination: '571-577',
            authors: [
                {
                    lastName: 'Vince',
                    foreName: 'Nicolas',
                    initials: 'N',
                    affiliation: [
                        'EA3963, Université Paris 7 Denis Diderot, Centre Hayem, Hôpital Saint-Louis, 1 Avenue Claude Vellefaux, 75010 Paris, France; Centre de Recherche en Transplantation et Immunologie UMR 1064, INSERM, Université de Nantes, Nantes, France; Institut de Transplantation Urologie Néphrologie (ITUN), CHU Nantes, Nantes, France. Electronic address: nicolas.vince@univ-nantes.fr.'
                                        ],
                },
                {
                    lastName: 'Limou',
                    foreName: 'Sophie',
                    initials: 'S',
                    affiliation: [
                        'Centre de Recherche en Transplantation et Immunologie UMR 1064, INSERM, Université de Nantes, Nantes, France; Institut de Transplantation Urologie Néphrologie (ITUN), CHU Nantes, Nantes, France; Ecole Centrale de Nantes, Nantes, France.'
                    ],
                }
            ],
            citationCount: 0
        },
        {
            title: 'APOL1 Nephropathy Risk Variants and Incident Cardiovascular Disease Events in Community-Dwelling Black Adults.',
            journal: {
                title: 'Circulation. Genomic and precision medicine',
                volume: 11,
                issue: 6,
                year: 2018, 
                month: 'Jun',
                impactFactor: 18.880
            },
            pagination: 'e002098',
            authors: [
                {
                    lastName: 'Gutiérrez',
                    foreName: 'Orlando M',
                    initials: 'OM',
                    affiliation: [
                        'Department of Medicine, University of Alabama at Birmingham, Birmingham, AL (O.M.G.).'
                    ],
                },
                {
                    lastName: 'Limou',
                    foreName: 'Sophie',
                    initials: 'S',
                    affiliation: [
                        'Centre de Recherche en Transplantation et Immunologie UMR 1064, INSERM, Université de Nantes, Nantes, France; Institut de Transplantation Urologie Néphrologie (ITUN), CHU Nantes, Nantes, France; Ecole Centrale de Nantes, Nantes, France.'
                    ],
                }
            ],
            citationCount: 1
        }

    ],
}
