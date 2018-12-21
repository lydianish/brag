import * as FileSaver from 'file-saver';

const endOfLine = '\r\n';

<<<<<<< HEAD
/** la fonction downloadBiblioBib permet le téléchargement du document de format BibTex détaillant la bibliographie de l'auteur
*@param {string} filename - nom du fichier
*@param {Object} articles - liste des articles
*@param {Object} hIndex - h-index
*@param {Object} citationCount - nombre de citations totales
*@param {string} name - nom de l'auteur recherché
*/


export function downloadBiblioBib (filename,articles,hIndex,citationCount,name) {
=======
export function downloadBiblioBib (filename,articles,refcode) {
>>>>>>> 867640683809336956a494877354a2db0f53933b

    var listeArticles = articles;
    var data = "";

    for (var i = 0; i < listeArticles.length; i++){
<<<<<<< HEAD
        data = data +"@article{"+i+","+endOfLine+ writeArticleBib(listeArticles[i])+endOfLine+endOfLine;
=======
        data = data + writeArticleBib(refcode+(i+1),listeArticles[i])+endOfLine+endOfLine;
>>>>>>> 867640683809336956a494877354a2db0f53933b
    }

    downloadFileBib(data, filename);
}

<<<<<<< HEAD

/** la fonction writeArticleBib transforme le contenu d'un objet article pour pouvoir l'écrire dans un document texte.
*@param {Object} article - object contenant les données sur un article
*@returns {string} aAficher - chaine de caractères décrivant l'article dans le format BibTex
*/
function writeArticleBib(article){
   var message = "";
=======
export function writeArticleBib(refcode,article){
   var message = "@article{"+refcode+","+endOfLine;
>>>>>>> 867640683809336956a494877354a2db0f53933b

   message = message +" title={"+article.title+"},"+endOfLine;
   message =message+ " author={";

  var listAuthors = article.authors;
  for (var i = 0; i < listAuthors.length; i++){
      message =message+listAuthors[i].lastName+", "+listAuthors[i].foreName;
      if (i!=(listAuthors.length-1)){message =message+" and "; }
  }

   message =message+"},"+endOfLine;
   message =message+  " journal={"+article.journal.title+"},"+endOfLine;
   message =message+ " volume={"+article.journal.volume+"},"+endOfLine;
   message =message+ " number={"+article.journal.issue+"},"+endOfLine;
   message =message+ " pages={"+article.pagination+"},"+endOfLine;
   message =message+ " year={"+article.journal.year+"},"+endOfLine;
   message =message+"}"+endOfLine;
    return message;
}

<<<<<<< HEAD


=======
>>>>>>> 867640683809336956a494877354a2db0f53933b
function downloadFileBib (data, filename) {
    const blob = new Blob([data], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, filename);
}
