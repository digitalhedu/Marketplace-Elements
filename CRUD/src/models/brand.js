const fs = require("fs")
const path = require("path");
module.exports = {
    all: function () { return JSON.parse(fs.readFileSync(path.resolve(__dirname,"..","data","brands.json")))},
    one: function (id) { return this.all().find(b => b.id == id);   }
}