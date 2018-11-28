import * as FileSaver from 'file-saver';

const endOfLine = '\r\n';

export function downloadBiblio (filename,articles,hIndex,citationGraph) {

    var listeArticles = articles;
    //date
    var data = "Articles"+endOfLine+"NB: Impact factors [IF] and citation number as reported on June 5th, 2018 (source Google Scholar)"+endOfLine;
    data = data+"Total citations = "+citationGraph+" | h-index = "+hIndex+endOfLine+endOfLine;
   for (var i = 0; i < listeArticles.length; i++){
        data = data +i+".  "+writeArticle(listeArticles[i])+endOfLine+endOfLine;
    }

    downloadFile(data, filename);
}


function writeArticle (article)
{
var aAfficher = "";
var listAuthors = article.authors;
for (var i = 0; i < listAuthors.length; i++)

    {aAfficher = aAfficher+" "+listAuthors[i].lastName+" "+listAuthors[i].foreName[0];

    if (i!=(listAuthors.length-1)){aAfficher = aAfficher+","; }
    else {aAfficher = aAfficher+". ";}

    }

  aAfficher = aAfficher+article.title +". "+article.journal.title +", "+article.journal.year+";";
    //il manque quelques données que je ne connais pas
  aAfficher = aAfficher+"(IF="+article.journal.impactFactor+"; "+article.citationCount+" citations).";
return aAfficher;
}

function writeArticleBibTex(article){
   var afficherBibTex = "@article"+endOfLine;

   afficherBibTex=afficherBibTex+ "title={"+article.title+"},"+endOfLine;
   afficherBibTex=afficherBibTex+ "author={},"+endOfLine;
   afficherBibTex=afficherBibTex+ "journal={"+article.journal.title+"},"+endOfLine;
   afficherBibTex=afficherBibTex+ "pages={},"+endOfLine;
   afficherBibTex=afficherBibTex+ "year={"+article.journal.year+"},"+endOfLine;
   afficherBibTex=afficherBibTex+ "publisher={},"+endOfLine;
}

function downloadFile (data, filename) {
    const blob = new Blob([data], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, filename);
}
