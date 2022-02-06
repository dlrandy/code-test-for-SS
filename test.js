const csvParser = require("./index");

csvParser({
  path: "./data1.csv",
  callback: (results) => {
    print(getLargestValue(results));
  },
});
csvParser({
  path: "./data2.csv",
  callback: (results) => {
    print(getLargestValue(results));
  },
});
csvParser({
    path: "./values.csv",
    callback: (results) => {
      print(getLargestValue(results));
    },
  });
function getLargestValue(
  results,
  keys = [
    "INCREASED", // "DECREASED"
  ]
) {
  if (results == null || results.length == 0) {
    return null;
  }
  results = results.filter((result) => keys.includes(result["Change"]));
  const obj = addUp(results);
  results = Object.entries(obj).map((item)=>{
    const increase = getAbsoluteIncrease(item[1]);
    return [item[0],increase]
  }).sort(
    (prev, next) => Number(next[1]) - Number(prev[1])
  );
  return results[0];
}
function getAbsoluteIncrease(array) {
    let increase = -Infinity;
    array.reduce((prev,current)=>{
        increase = Math.max(increase, current-prev);
        return current;
    })
    return increase;
}
function addUp(results) {
  const map = {};
  results.forEach(({ Name, Value }) => {
    map[Name] = map[Name] || [];
    map[Name].push(Number(Value));
     
  });
  return map;
}
function print(data) {
  if (data == null) {
    return console.log("nil");
  }
  console.log(`公司：${data[0]}，股价增值：${data[1].toFixed(6)}`);
}
