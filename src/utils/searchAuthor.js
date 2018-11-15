const axios = require('axios');
const convert = require('xml-js');
import { impactFactor } from '../utils';

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
            throw 'no result';
        }
        const resultat3 = transform(resultat2);
        return resultat3;
    }
    catch(error) {
        throw String(error);
    }
}

export async function searchAuthorGS (searchTerm) {
    const googleScholarUrl = 'http://localhost:5002/author';
    const searchParams = '?name='+searchTerm.replace(/\s+/g,'+');
    try {
        const response = await axios.get(googleScholarUrl + searchParams);
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

function transform(listeArticle) {
    if (Array.isArray(listeArticle.PubmedArticleSet.PubmedArticle))
        return listeArticle.PubmedArticleSet.PubmedArticle.map(article => transformArticle(article));
    else
        return [transformArticle(listeArticle.PubmedArticleSet.PubmedArticle)];
};

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
       pagination : safe(article.Pagination),
       authors : listeAuthorTransformed,
       citationCount: ''
    };
};

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