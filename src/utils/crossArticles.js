
function croisementNombreCitationTitre(listeArticlePm,listeArticleGs)
{listeArticlePm.map(article => nombreCitationArticle(article,listeArticleGs));
}





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

