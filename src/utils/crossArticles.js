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

}

