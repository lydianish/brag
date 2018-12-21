<<<<<<< HEAD
/** la fonction croisementNombreCitationTitre permet d'ajouer les nombres de publication et les titres aux articles de la liste d'article PubMed
*@param {Object} listeArticlePm - liste des publications tirées de PubMed
*@param {Object} listeArticleGs - liste des publications tirées de Google Scholar

*/

function croisementNombreCitationTitre(listeArticlePm,listeArticleGs)
{listeArticlePm.map(article => nombreCitationArticle(article,listeArticleGs));
}

/** la fonction  nombreCitationArticleTitre permet d'ajouer le nombre de publication et le titre d'un article PubMed. Ces informations sont issues de Google Scholar
*@param {Object} listeArticlePm - liste des publications tirées de PubMed
*@param {Object} listeArticleGs - liste des publications tirées de Google Scholar

*/



function nombreCitationArticleTitre(article,listeArticleGs){

         var length=listeArticleGs.length;
         var i = 0;
         var correspondance = false;

         while ((i<length)&&(!correspondance))

             {  urlArticleGs = listeArticleGs[i].url;
                correspondance = (urlArticlesGs === PUBMED_ARTICLE_URL+article.pmid);
                i=i+1;  }

         if (correspondance){article.citationCount = listeArticleGs[i-1].citationCount;
                            article.title=listeArticleGs[i-1].title;
                            }

         else {article.citationCount = '';
              }

=======
export function crossArticleLists (listeArticlePm, listeArticleGs) {
   listeArticlePm.map(article => articleCitationCount(article, listeArticleGs));
>>>>>>> 867640683809336956a494877354a2db0f53933b
}

export function articleCitationCount (article, listeArticleGs){
   const length = listeArticleGs.length;
   let i = 0;
   let correspondance = false;
   while ((i<length)&&(!correspondance)) {
      if (Array.isArray(article.title)) {
         correspondance = true;
         for (const word of article.title) {
            correspondance = correspondance && listeArticleGs[i].title.toLocaleLowerCase().includes(word.toLocaleLowerCase());
         }
      }
      else {
         correspondance = listeArticleGs[i].title.toLocaleLowerCase().includes(article.title.toLocaleLowerCase());
      }
      i=i+1;
   }
   if (correspondance) {
      article.citationCount = Number(listeArticleGs[i-1].citationCount);
      article.title=listeArticleGs[i-1].title;
   }
   else {
      article.title = article.title.reduce((accumulator, part) => {
         return accumulator + part + ' ';
     }, '');
     const gsArticle = listeArticleGs.find(function (a) {
         const words = a.title.split(/[\s-_:"().\u2026\u2013]/g);
         return words.reduce((accumulator, word) => {
            return accumulator && article.title.toLocaleLowerCase().includes(word.toLocaleLowerCase());
        }, true);
     });
     article.citationCount = gsArticle ? gsArticle.citationCount : '';
   }
}