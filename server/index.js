if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
  }
  
  //  dependencies
  const express = require("express") ;
  const cors = require("cors");
  const cookieParser = require('cookie-parser')
  // const connectToDb = require("./config/connectToDb");
  const { connectToDb } = require("./config/connectToDb");
  const itemController = require("./controlers/itemControler");
  const usersController = require("./controlers/usersController");

  const requireAuthentication = require("./middleware/requireAuthentication");

  const app = express();
  
  // Configure express app
  app.use(express.json());
  app.use(cookieParser())
  app.use(cors({
    origin: true,
    credentials: true,
  }));
  
  // db connection
  connectToDb();

  // routing 
app.post("/signup", usersController.signup);
app.post("/login", usersController.login);  
app.get("/logout", usersController.logout);
app.get("/check_auth", requireAuthentication ,usersController.checkAuth);

app.post("/items", itemController.createItem);
app.get("/items", itemController.fetchItems);
app.get("/items/:id", itemController.fetchItem);
app.put("/items/:id", itemController.updateItem);
app.delete("/items/:id", itemController.deleteItem);

  // server
  app.listen(process.env.PORT);