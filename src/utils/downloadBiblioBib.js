import * as FileSaver from 'file-saver';

const endOfLine = '\r\n';

export function downloadBiblioBib (filename,articles,refcode) {

    var listeArticles = articles;
    var data = "";

    for (var i = 0; i < listeArticles.length; i++){
        data = data + writeArticleBib(refcode+(i+1),listeArticles[i])+endOfLine+endOfLine;
    }

    downloadFileBib(data, filename);
}

function writeArticleBib(refcode,article){
   var message = "@article{"+refcode+","+endOfLine;

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

function downloadFileBib (data, filename) {
    const blob = new Blob([data], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, filename);
}
