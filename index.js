const csv = require("csv-parser");
const fs = require("fs");
function parseCSVData({path, csvOption, callback}) {
  const results = [];
  try {
    fs.createReadStream(path)
    .pipe(csv(csvOption))
    .on("data", (data) => results.push(data))
    .on("end", () => {
      callback&& callback(results);
    });    
  } catch (error) {
      throw error;
  }
  
}
module.exports = parseCSVData;
