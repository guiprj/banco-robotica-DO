const express = require("express");
const routes = express.Router();
const RegisterController = require("./controllers/RegisterController");
const UsersController = require("./controllers/UsersController");
const DashbordController = require("./controllers/DashbordController");
const ProfilesController = require("./controllers/ProfilesController");
const AdminController = require("./controllers/AdminController");
const ProductsController = require("./controllers/ProductsController");
const TransactionsController = require("./controllers/TransactionsController");


function authenticationMiddleware(req, res, next) {  
  if (req.isAuthenticated()) {return next() }
  res.redirect('/login')
}

routes.get("/register", RegisterController.get);
routes.post("/register", RegisterController.getNewUser);
routes.get("/login", UsersController.get);
routes.post("/login", UsersController.login);
routes.get("/logout", authenticationMiddleware, UsersController.logout);
routes.get("/profile", authenticationMiddleware, ProfilesController.get);
routes.get("/", authenticationMiddleware, DashbordController.get);
routes.post("/profile", authenticationMiddleware, ProfilesController.updateRegister);
routes.get("/admin", authenticationMiddleware, AdminController.index);
routes.get("/admin/searchresult", authenticationMiddleware, AdminController.searchApp);
routes.post("/admin", authenticationMiddleware, AdminController.updateAmount);
routes.post("/admin/users/delete", authenticationMiddleware, AdminController.deleteUsers);
routes.get("/admin/register-products", authenticationMiddleware, ProductsController.getProducts);
routes.post("/admin/register-products", authenticationMiddleware, ProductsController.insertProducts);
routes.get("/admin/requests", authenticationMiddleware, TransactionsController.getTransactions);
routes.post("/admin/requests", authenticationMiddleware, TransactionsController.updateTransaction);
routes.post("/admin/requests/delete", authenticationMiddleware, TransactionsController.deleteTransaction);
routes.get("/:id", authenticationMiddleware, DashbordController.getByProduct);
routes.post("/:id", authenticationMiddleware, DashbordController.byProduct);

module.exports = routes;
