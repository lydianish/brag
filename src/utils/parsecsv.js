import * as csv from 'fast-csv';
import { IMPACT_FACTOR_CSV_FILE_PATH } from '../utils';

console.log("[");
csv
 .fromPath(IMPACT_FACTOR_CSV_FILE_PATH, {headers : [ , ,"Title", , ,"SJR", , , , , , , , , , , , ,], delimiter: ';'})
 .on("data", function(data){
    console.log(" ",data);
    console.log("  ,");
 })
 .on("end", function(){
     console.log("]");
 });
