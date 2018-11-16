function croisementNombreCitation(listeArticlePm,listeArticleGs)
{listeArticlePm.map(article => nombreCitationArticle(article,listeArticleGs));
}






function nombreCitationArticle(article,listeArticleGs){
    try {
         var length=listeArticleGs.length;
         var i = 0;
         var correspondance = false;
         while ((i<length)&&(!correspondance))
             {   urlArticleGs = listeArticleGs[i].url;


                 //on a alors le pmId de l'article google scholar, s'il corresond au pmid de l'artcle pubmed, on sort de la boucle
                if (urlArticlesGs === PUBMED_ARTICLE_URL+article.pmid){
                    correspondance=true;}
                     }
                 i=i+1;
             }
         if (i<length+1){article.citationCount = listeArticleGs[i-1].citationCount;}

         else {throw Error;}
   catch (error) {article.citationCount = undefined;}
}

