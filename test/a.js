li = [1, 2, 3, 4];
var teas = li.map(function (item) { return { id: item.toString(), name: item.toString() + "hello", age: (item + 10).toString(), fromWhere: "from" + item.toString() }; });
console.log(teas);
