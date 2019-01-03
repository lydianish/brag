import * as FileSaver from 'file-saver';

/**
 * @fileOverview Définition de la méthode utilisée pour écrire et télécharger un fichier texte.
*/

/**
 * écrit et télécharge un fichier texte.
 * @param {string} data le contenu du fichier
 * @param {string} filename le nom du fichier
 */
export function downloadFile (data, filename) {
    const blob = new Blob([data], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, filename);
}