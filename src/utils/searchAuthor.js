import * as axios from 'axios';
import * as convert from 'xml-js';
import { impactFactor, GOOGLE_SCHOLAR_URL, ERROR_NO_PUBMED_RESULT, ERROR_NO_GOOGLE_SCHOLAR_RESULT } from '../utils';



/** la fonction searchAuthorPM permet de récupérer les informations interessantes relatives à la recherche de searchTerm dans PubMed. 
* @param {string} searchTerm - la chaine de caractères tapé par l'utilisateur.
*  @returns {Object} resultat3 - un objet contenant le résultat de la recherche sur pubMed*/

export async function searchAuthorPM (searchTerm) {
    const pubMedUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/';
    const pubMedSearchParams = 'esearch.fcgi?db=pubmed&term='+searchTerm.replace(/\s+/g,'+')+'[author]&usehistory=y&retmax=0';
    try {
        const response = await axios.get(pubMedUrl + pubMedSearchParams);
        const resultat1 = convert.xml2js(response.data, {compact: true, spaces: 4});
        const queryKey = getQueryKey(resultat1);
        const webEnv = getwebEnv(resultat1);
        const qw = {
            queryKey : queryKey,
            webEnv : webEnv }
        const response2 = await axios.get('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&query_key='+qw.queryKey+'&WebEnv='+qw.webEnv+'&rettype=medline&retmode=xml')
        const resultat2 = convert.xml2js(response2.data, {compact: true, spaces: 4});
        if (resultat2.eFetchResult && resultat2.eFetchResult.ERROR) {
            throw ERROR_NO_PUBMED_RESULT;
        }
        const resultat3 = transform(resultat2);
        return resultat3;
    }
    catch(error) {
        throw String(error);
    }
}

/** la fonction searchAuthorGS permet de récupérer les informations interessantes relatives à la recherche de searchTerm dans Google Scholar. 
* @param {string} searchTerm - la chaine de caractères tapé par l'utilisateur.
*  @returns {Object} reponse - un objet contenant le résultat de la recherche sur Google Scholar*/

export async function searchAuthorGS (searchTerm) {
    const googleScholarUrl = GOOGLE_SCHOLAR_URL;
    const searchParams = '?name='+searchTerm.replace(/\s+/g,'+');
    try {
        const response = await axios.get(googleScholarUrl + searchParams);
        if (response.data.error)
            throw ERROR_NO_GOOGLE_SCHOLAR_RESULT;
        return response.data;
    }
    catch(error) {
        throw String(error);
    }
}

function getQueryKey(res){
    return res.eSearchResult.QueryKey._text;
};

function getwebEnv(res) {
    return res.eSearchResult.WebEnv._text;
};


/** la fonction transform permet de transformer la liste d'articles tirée de la recherche PubMeb en une nouvelle liste d'articles que que l'on exploitera. La nouvelle liste ne comprend plus les informations inutiles 
*@param {Object} listeArticle - liste d'article tirée de PubMed
*@returns {Object} listeArticleTransformée
*/


function transform(listeArticle) {
    if (Array.isArray(listeArticle.PubmedArticleSet.PubmedArticle))
        return listeArticle.PubmedArticleSet.PubmedArticle.map(article => transformArticle(article));
    else
        return [transformArticle(listeArticle.PubmedArticleSet.PubmedArticle)];
};

/** la fonction transformArticle permet de transformer les données sur un article tirées de la recherche PubMeb en de nouvelles données sur l'article que que l'on exploitera. 
*@param {Object} articleInit - données sur un article
*@returns {Object} 
*/


function transformArticle(articleInit) {
    const article = articleInit.MedlineCitation.Article;
    const listeAuthor = article.AuthorList.Author;
    let listeAuthorTransformed;
    if (Array.isArray(listeAuthor))
        listeAuthorTransformed = listeAuthor.map(author => transformAuthor(author));
    else
        listeAuthorTransformed = [transformAuthor(listeAuthor)];
    return {
        title : Array.isArray(article.ArticleTitle._text) ? article.ArticleTitle._text.reduce((accumulator, partialTitle) => {
            return accumulator + partialTitle; }, '').slice(0, -1) : article.ArticleTitle._text.slice(0, -1),
        journal : {
            title : safe(article.Journal.Title),
            volume : safe(article.Journal.JournalIssue.Volume),
            issue : safe(article.Journal.JournalIssue.Issue),
            year : safe(article.Journal.JournalIssue.PubDate.Year),
            month : safe(article.Journal.JournalIssue.PubDate.Month),
            impactFactor : impactFactor(safe(article.Journal.Title))
        },
       pagination : article.Pagination ? safe(article.Pagination.MedlinePgn) : '',
       authors : listeAuthorTransformed,
       citationCount: '',
        pmId : articleInit.MedlineCitation.PMID._text
    };
};

/** la fonction transformAuthor permet de transformer les données sur un auteur tirées de la recherche PubMeb en de nouvelles données sur l'auteur que que l'on exploitera. 
*@param {Object} author - données sur un auteur
*@returns {Object} 
*/


function transformAuthor(author) {
    return {
        lastName: safe(author.LastName),
        foreName: safe(author.ForeName),
        initials: safe(author.Initials),
        affiliation: []
    };
};

function safe (property) {
    return property ? property._text : '';
};
