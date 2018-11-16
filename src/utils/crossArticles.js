function croisementNombreCitation(listeArticlePm,listeArticleGs)
{listeArticlePm.map(article => nombreCitationArticle(article,listeArticleGs));
}


var listeArticlePm = [];
var listeArticleGs =[];
croisementNombreCitation(listeArticlePm,listeArticleGs);

function nombreCitationArticle(article,listeArticleGs){

         var length=listeArticleGs.length;
         var i = 0;
         var correspondance = false;
         while ((i<length)&&(!correspondance))
             {   urlArticleGs = listeArticleGs[i].url;

                if (urlArticlesGs === PUBMED_ARTICLE_URL+article.pmid){
                    correspondance=true;}
         i=i+1;
             }
         if (i<length+1){article.citationCount = listeArticleGs[i-1].citationCount;}

         else {article.citationCount = undefined;}

}

