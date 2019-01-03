/**
 * @fileOverview Script pour extraire une liste JavaScript de journaux à partir d'un tableau de journaux au format CSV.
 * @example node parsecsv.js > journals.js // écrit le résultat dans le fichier journals.js
*/
const csv = require('fast-csv');
const IMPACT_FACTOR_CSV_FILE_PATH = '../assets/impact-factor/sampleTR.csv';

/**
 * affiche une liste JavaScript de journaux (Title and Impact Factor uniquement) à partir d'un tableau CSV.
 * @param {string} filepath le chemin vers le fichier CSV contentant le tableau de journaux
 */
function parsecsv (filepath) {
    console.log("export const journals = [");
    csv
    // en-têtes du fichier de départ : Rank, Title, Total Cites, Impact Factor, Eigenfactor Score
    .fromPath(filepath, {headers : [ ,"Title", ,"ImpactFactor", ,], delimiter: ';'})
    .on("data", function(data){
        console.log(" ",data);
        console.log("  ,");
    })
    .on("end", function(){
        console.log("]");
    });
}

parsecsv(IMPACT_FACTOR_CSV_FILE_PATH);
