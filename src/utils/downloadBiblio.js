import * as FileSaver from 'file-saver';

const endOfLine = '\r\n';

export function downloadBiblioMLA (filename,articles,hIndex,citationCount) {
    downloadBiblio(filename,articles,hIndex,citationCount,writeArticleMLA)
}

export function downloadBiblioVCV (filename,articles,hIndex,citationCount) {
    downloadBiblio(filename,articles,hIndex,citationCount,writeArticleVCV)
}

function downloadBiblio (filename,articles,hIndex,citationCount, writeArticle) {

    var listeArticles = articles;
    var data = "Articles"+endOfLine+"NB: Impact factors [IF] and citation number as reported on "+date()+" (source Google Scholar)"+endOfLine;
    data = data+"Total citations = "+citationCount+" | h-index = "+hIndex+endOfLine+endOfLine;
   for (var i = 0; i < listeArticles.length; i++){
        data = data +(i+1)+".  "+writeArticle(listeArticles[i])+endOfLine+endOfLine;
    }
    downloadFile(data, filename);
}


export function writeArticleMLA (article)
{
var aAfficher = article.authors[0].lastName + ", " + article.authors[0].foreName + ", et al.";
  aAfficher = aAfficher+' "'+article.title +'." '+article.journal.title +' ';
  aAfficher = aAfficher+article.journal.volume+"."+article.journal.issue+" ("+article.journal.year+"): "+article.pagination;
  aAfficher = aAfficher+"(IF="+article.journal.impactFactor+"; "+article.citationCount+" citations).";
return aAfficher;
}

export function writeArticleVCV (article)
{
    var aAfficher = "";
    var listAuthors = article.authors;
    for (var i = 0; i < listAuthors.length; i++){
        aAfficher = aAfficher+" "+listAuthors[i].lastName+" "+listAuthors[i].foreName[0];
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
