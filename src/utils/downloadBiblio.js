import * as FileSaver from 'file-saver';

const endOfLine = '\r\n';

/** la fonction downloadBiblio permet le téléchargement du document de format Vancouver détaillant la bibliographie de l'auteur
*@param {string} filename - nom du fichier
*@param {Object} articles - liste des articles
*@param {Object} hIndex - h-index
*@param {Object} citationCount - nombre de citations totales
*/

export function downloadBiblio (filename,articles,hIndex,citationCount) {

    var listeArticles = articles;
    var data = "Articles"+endOfLine+"NB: Impact factors [IF] and citation number as reported on "+date()+" (source Google Scholar)"+endOfLine;
    data = data+"Total citations = "+citationCount+" | h-index = "+hIndex+endOfLine+endOfLine;
   for (var i = 0; i < listeArticles.length; i++){
        data = data +(i+1)+".  "+writeArticle(listeArticles[i])+endOfLine+endOfLine;
    }

    downloadFile(data, filename);
}

/** la fonction writeArticle transforme le contenu d'un objet article pour pouvoir l'écrire dans un document texte.
*@param {Object} article - object contenant les données sur un article
*@returns {string} aAficher - chaine de caractères décrivant l'article dans le format Vancouver
*/

function writeArticle (article)
{
var aAfficher = "";
var listAuthors = article.authors;
for (var i = 0; i < listAuthors.length; i++)

    {aAfficher = aAfficher+" "+listAuthors[i].lastName+" "+listAuthors[i].foreName[0];

    if (i!=(listAuthors.length-1)){aAfficher = aAfficher+","; }
    else {aAfficher = aAfficher+". ";}

    }

  aAfficher = aAfficher+article.title +". "+article.journal.title +", "+article.journal.year+"; ";
  aAfficher = aAfficher+article.journal.volume+"("+article.journal.issue+"):" +article.pagination ;
  aAfficher = aAfficher+"(IF="+article.journal.impactFactor+"; "+article.citationCount+" citations).";
return aAfficher;
}


function downloadFile (data, filename) {
    const blob = new Blob([data], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, filename);
}

/** la fonction date donne la date du jour

*@returns {string} date - la date du jour
*/


function date()

{
     // les noms de mois
     var mois = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

     // on recupere la date

     var date = new Date();

     // on construit le message

     var message = mois[date.getMonth()] + " ";   // nom du mois
     message += date.getDate() + "th, ";   // numero du jour
     message += date.getFullYear();
     return message;

}
