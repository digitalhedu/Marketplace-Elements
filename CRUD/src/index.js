const express = require("express");
const app = express();

// App Settings

app.use(express.static(__dirname+"../public"))

app.use(express.urlencoded({extended:false}))

app.listen(3000,()=> console.log("Start Server in 3000"))

// Middlewares Aplication
const methodOverride = require("method-override");

app.use(methodOverride('_method'))

// Routes Aplication

app.use(require("./routes/brandsRouter"))

app.use(require("./routes/categoryRouter"))

app.use(require("./routes/productRouter"))

app.use(require("./routes/styleRouter"))

