const axios = require('axios');
const convert = require('xml-js');

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
    const googleScholarUrl = 'https://af32b09f.ngrok.io/author';
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
    return listeArticle.PubmedArticleSet.PubmedArticle.map(article => transformArticle(article));
};

function transformArticle(articleInit) {
    const article = articleInit.MedlineCitation.Article;
    const listeAuthor = article.AuthorList.Author;
    const listeAuthorTransformed = listeAuthor.map(author => transformAuthor(author));
    return {
        title : article.ArticleTitle._text,
        journal : {
            title : article.Journal.Title!==undefined ? article.Journal.Title._text : undefined,
            volume : article.Journal.JournalIssue.Volume!==undefined ? article.Journal.JournalIssue.Volume._text : undefined,
            issue : article.Journal.JournalIssue.Issue!==undefined ? article.Journal.JournalIssue.Issue._text : undefined,
            year : article.Journal.JournalIssue.PubDate.Year!==undefined ? article.Journal.JournalIssue.PubDate.Year._text : undefined,
            month : article.Journal.JournalIssue.PubDate.Month!==undefined ? article.Journal.JournalIssue.PubDate.Month._text : undefined,
            impactFactor : undefined
        },
       pagination : article.Pagination!==undefined ? article.Pagination.MedlinePgn._text : undefined,
       authors : listeAuthorTransformed,
       citationCount: 0
    };
};

function transformAuthor(author) {
    return {
        lastName: author.LastName!==undefined ? author.LastName._text : undefined,
        foreName: author.ForeName!==undefined ? author.ForeName._text : undefined,
        initials: author.Initials!==undefined ? author.Initials._text : undefined,
        affiliation: []
    };
};
