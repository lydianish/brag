/**
 * @fileOverview Script pour extraire une liste JavaScript de journaux (Title and Impact Factor uniquement) à partir d'un tableau de journaux au format CSV.
 * @example node parsecsv.js > journals.js // écrit le résultat dans le fichier journals.js
*/
const csv = require('fast-csv');
const IMPACT_FACTOR_CSV_FILE_PATH = '../assets/impact-factor/sampleTR.csv';

console.log("export const journals = [");
csv
 .fromPath(IMPACT_FACTOR_CSV_FILE_PATH, {headers : [ ,"Title", ,"ImpactFactor", ,], delimiter: ';'})
 .on("data", function(data){
    console.log(" ",data);
    console.log("  ,");
 })
 .on("end", function(){
     console.log("]");
 });
