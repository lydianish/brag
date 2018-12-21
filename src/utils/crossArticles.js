export function crossArticleLists (listeArticlePm, listeArticleGs) {
   listeArticlePm.map(article => articleCitationCount(article, listeArticleGs));
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