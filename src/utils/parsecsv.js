const csv = require("fast-csv");
console.log("[");
csv
 .fromPath("../assets/sample.csv", {headers : [ , ,"Title", , ,"SJR", , , , , , , , , , , , ,], delimiter: ';'})
 .on("data", function(data){
    console.log(" ",data);
    console.log("  ,");
 })
 .on("end", function(){
     console.log("]");
 });
