/** la fonction crossArticleLists permet d'ajouter les nombres de citation et les titres aux articles de la liste d'article PubMed
*@param {Object} listeArticlePm - liste des publications tirées de PubMed
*@param {Object} listeArticleGs - liste des publications tirées de Google Scholar
*/             
export function crossArticleLists (listeArticlePm, listeArticleGs) {
   listeArticlePm.map(article => articleCitationCount(article, listeArticleGs));
}

/** la fonction  articleCitationCount permet d'ajouer le nombre de publication et le titre d'un article PubMed.
 * Ces informations sont issues de Google Scholar
*@param {Object} article - liste des publications tirées de PubMed
*@param {Object} listeArticleGs - liste des publications tirées de Google Scholar
*/
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

export function getTitle (articleTitle) {
   let titleParts = [];
   for (let field of Object.values(articleTitle)) {
       if (Array.isArray(field)) { //the _text field is split into parts
           for (let fieldpart of field) {
               if (fieldpart.slice(-1) == '.') {
                   fieldpart = fieldpart.slice(0, -1);
               }
               Array.prototype.push.apply(titleParts, fieldpart.split(/[\s-_:"().\u2026]/g));
           }
       }
       else if (typeof field === 'string') { // (this is the full title)
           Array.prototype.push.apply(titleParts, field.slice(0, -1).split(/[\s-_:"().\u2026]/g));
       }
       else { //it is an Object, like i or sub elements
           if (Array.isArray(field._text)) {
                   for (let fieldpart of field._text) {
                       if (fieldpart.slice(-1) == '.') {
                           fieldpart = fieldpart.slice(0, -1);
                       }
                       Array.prototype.push.apply(titleParts, fieldpart.split(/[\s-_:"().\u2026]/g));
                   }
               }
               else {
                   let fieldpart = field._text;
                   if (fieldpart.slice(-1) == '.') {
                       fieldpart = field._text.slice(0, -1);
                   }
                   Array.prototype.push.apply(titleParts, fieldpart.split(/[\s-_:"().\u2026]/g));
               }
           }
   }
   if (titleParts.length == 1)  {
       return titleParts[0];
   }
   return titleParts;
}
