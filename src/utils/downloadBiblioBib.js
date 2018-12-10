import * as FileSaver from 'file-saver';

const endOfLine = '\r\n';

export function downloadBiblioBib (filename,articles,hIndex,citationCount,name) {

    var listeArticles = articles;
    var data = "";


    /*
    "Articles"+endOfLine+"NB: Impact factors [IF] and citation number as reported on "+date()+" (source Google Scholar)"+endOfLine;
    data = data+"Total citations = "+citationCount+" | h-index = "+hIndex+endOfLine+endOfLine;*/

    for (var i = 0; i < listeArticles.length; i++){
        data = data +"@article{"+i+","+endOfLine+ writeArticleBib(listeArticles[i])+endOfLine+endOfLine;
    }

    downloadFileBib(data, filename);
}



function writeArticleBib(article){
   var message = "";

   message = message +" title={"+article.title+"},"+endOfLine;
   message =message+ " author={";

  var listAuthors = article.authors;
  for (var i = 0; i < listAuthors.length; i++){
      message =message+listAuthors[i].lastName+", "+listAuthors[i].foreName;
      if (i!=(listAuthors.length-1)){message =message+" and "; }
  }

   message =message+"},"+endOfLine;
   message =message+  " journal={"+article.journal.title+"},"+endOfLine;
   message =message+ " pages={"+article.pagination+"}"+endOfLine;
   message =message+ " year={"+article.journal.year+"},"+endOfLine;
   message =message+ " publisher={},"+endOfLine+"}";
    return message;
}

function writeAuthorBib(article){}

function downloadFileBib (data, filename) {
    const blob = new Blob([data], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, filename);
}
