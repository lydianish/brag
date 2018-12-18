const csv = require('fast-csv');
const IMPACT_FACTOR_CSV_FILE_PATH = '../assets/impact-factor/sampleTR.csv';

console.log("[");
csv
 .fromPath(IMPACT_FACTOR_CSV_FILE_PATH, {headers : [ ,"Title", ,"ImpactFactor", ,], delimiter: ';'})
 .on("data", function(data){
    console.log(" ",data);
    console.log("  ,");
 })
 .on("end", function(){
     console.log("]");
 });
