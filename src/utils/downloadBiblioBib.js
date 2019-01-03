import { downloadFile, endOfLine } from '../utils';

/**
 * @fileOverview Définition des méthodes utilisées pour télécharger la liste d'articles en citation BibTex.
*/

/** 
 * télécharge le document texte citant les articles de l'auteur au format BibTex.
 * @param {string} filename nom du fichier
 * @param {Object} articles liste des articles
 * @param {string} refcode code de référence des citation BibTex, il sera suffixé de la position de l'article dans la liste
*/
export function downloadBiblioBib (filename,articles,refcode) {

    var listeArticles = articles;
    var data = "";

    for (var i = 0; i < listeArticles.length; i++){
        data = data + writeArticleBib(refcode+(i+1),listeArticles[i])+endOfLine+endOfLine;
    }

    downloadFile(data, filename);
}

/**
 * transforme le contenu d'un objet article pour pouvoir l'écrire dans un document texte.
 * @param {string} refcode code de référence de la citation BibTex, il sera suffixé de la position de l'article dans la liste
 * @param {Object} article object contenant les données sur un article
 * @returns {string} chaine de caractères décrivant l'article dans le format BibTex
*/
export function writeArticleBib(refcode,article){
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

