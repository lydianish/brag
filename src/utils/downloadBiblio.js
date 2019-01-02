/**
 * @fileOverview Définition des méthodes utilisées pour télécharger la liste d'articles en citation MLA et Vancouver.
*/

import { downloadFile, endOfLine } from '../utils';

/**
 * télécharge le document texte citant les articles de l'auteu format MLA.
 * @param {string} filename nom du fichier
 * @param {Array} articles liste des articles
 * @param {number} hIndex h-index
 * @param {number} citationCount nombre de citations totales
*/
export function downloadBiblioMLA (filename,articles,hIndex,citationCount) {
    downloadBiblio(filename,articles,hIndex,citationCount,writeArticleMLA)
}

/** 
 * télécharge le document texte citant les articles de l'auteur au format Vancouver.
 * @param {string} filename nom du fichier
 * @param {Array} articles liste des articles
 * @param {number} hIndex h-index
 * @param {number} citationCount nombre de citations totales
*/
export function downloadBiblioVCV (filename,articles,hIndex,citationCount) {
    downloadBiblio(filename,articles,hIndex,citationCount,writeArticleVCV)
}

/**
 * télécharge le document texte citant les articles de l'auteur au format donné.
 * @param {string} filename nom du fichier
 * @param {Array} articles liste des articles
 * @param {number} hIndex h-index
 * @param {number} citationCount nombre de citations totales
 * @param {Function} writeArticle fonction qui écrit un article selon un convention de citation
 */
function downloadBiblio (filename,articles,hIndex,citationCount, writeArticle) {

    const listeArticles = articles;
    let data = "Articles"+endOfLine+"NB: Impact factors [IF] and citation number as reported on "+date()+" (source Google Scholar)"+endOfLine;
    data = data+"Total citations = "+citationCount+" | h-index = "+hIndex+endOfLine+endOfLine;
   for (let i = 0; i < listeArticles.length; i++){
        data = data +(i+1)+".  "+writeArticle(listeArticles[i])+endOfLine+endOfLine;
    }
    downloadFile(data, filename);
}

/** 
 * transforme le contenu d'un objet article en citation MLA pour pouvoir l'écrire dans un document texte.
 * @param {Object} article object contenant les données sur un article
 * @returns {string} chaine de caractères décrivant l'article dans le format MLA
*/
export function writeArticleMLA (article)
{
let aAfficher = article.authors[0].lastName + ", " + article.authors[0].foreName + ", et al.";
  aAfficher = aAfficher+' "'+article.title +'." '+article.journal.title +' ';
  aAfficher = aAfficher+article.journal.volume+"."+article.journal.issue+" ("+article.journal.year+"): "+article.pagination;
  aAfficher = aAfficher+"(IF="+article.journal.impactFactor+"; "+article.citationCount+" citations).";
return aAfficher;
}

/**
 * transforme le contenu d'un objet article en citation Vancouver pour pouvoir l'écrire dans un document texte.
 * @param {Object} article object contenant les données sur un article
 * @returns {string} chaine de caractères décrivant l'article dans le format Vancouver
*/
export function writeArticleVCV (article)
{
    let aAfficher = "";
    const listAuthors = article.authors;
    for (let i = 0; i < listAuthors.length; i++){
        aAfficher = aAfficher+" "+listAuthors[i].lastName+" "+listAuthors[i].foreName[0];
        if (i!=(listAuthors.length-1)){aAfficher = aAfficher+","; }
        else {aAfficher = aAfficher+". ";}
        }
    aAfficher = aAfficher+article.title +". "+article.journal.title +", "+article.journal.year+"; ";
    aAfficher = aAfficher+article.journal.volume+"("+article.journal.issue+"):" +article.pagination ;
    aAfficher = aAfficher+"(IF="+article.journal.impactFactor+"; "+article.citationCount+" citations).";
    return aAfficher;
}

/**
 * donne la date du jour
 * @returns {string} la date du jour
 * @example December 21st, 2018
*/
function date()
{
     // les noms de mois
     const mois = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

     // on recupere la date du jour

    const date = new Date();
    const jour = date.getDate();
    const annee = date.getFullYear();
     // on construit le message

     let message = mois[date.getMonth()] + ' ';   // nom du mois
     let suffixe = 'th';
     if (jour % 10 == 1) {
         suffixe = 'st';
     } else if (jour % 10 == 2) {
         suffixe = 'nd';
     } else if (jour % 10 == 3) {
        suffixe = 'rd';
    }
     message += jour + suffixe + ', ';
     message += annee;
     return message;

}
