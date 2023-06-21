const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
/* const userRouter = require("./router/userRouter"); */
/* const itemsRouter = require("./router/ItemsRouter"); */
var path = require('path');


var indexRouter = require('./router/indexRouter');

var clienteRouter = require('./router/clienteRouter');
var categoriaRouter = require('./router/categoriaRouter');
var produtoRouter = require('./router/produtoRouter');
var pedidoRouter = require('./router/pedidoRouter');




var itemsRouter = require("./router/ItemsRouter");
var userRouter = require("./router/userRouter");


dotenv.config({ path: "./config.env" });
const connect = require("./db/connection");




const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use("/api/user", userRouter);
app.use("/items", itemsRouter);



app.use('/', indexRouter);
app.use('/cliente', clienteRouter);
app.use('/categoria', categoriaRouter);
app.use('/produto', produtoRouter);
app.use('/pedido', pedidoRouter);




const port = process.env.PORT || 8080;

connect
  .then((res) => {
    app.listen(port, () => {
      console.log(`Server is runing on PORT: ${port}`);
    });
  })
  .catch((err) => {
    console.log(`DB erro: ${err}`);
  });
