import { PUBMED_ARTICLE_URL} from '../utils';

export function crossArticleLists (listeArticlePm, listeArticleGs) {
   listeArticlePm.map(article => articleCitationCount(article, listeArticleGs));
}

function articleCitationCount (article, listeArticleGs){
   var length=listeArticleGs.length;
   var i = 0;
   var correspondance = false;
   while ((i<length)&&(!correspondance)) {
      /*urlArticleGs = listeArticleGs[i].url;
      if (urlArticleGs) {
         correspondance = (urlArticlesGs.toLowerCase() === PUBMED_ARTICLE_URL+article.pmid).toLowerCase();
      }*/
      correspondance = listeArticleGs[i].title.toLocaleLowerCase().includes(article.title.toLocaleLowerCase());
      i=i+1;
   }
   if (correspondance) {
      article.citationCount = Number(listeArticleGs[i-1].citationCount);
      article.title=listeArticleGs[i-1].title;
   }
   else {
      article.citationCount = '';
   }
}

