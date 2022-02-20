const express = require("express");
const routes = express.Router();
const RegisterController = require("./controllers/RegisterController");
const UsersController = require("./controllers/UsersController");
const DashbordController = require("./controllers/DashbordController");
const ProfilesController = require("./controllers/ProfilesController");
const AdminController = require("./controllers/AdminController");
const ProductsController = require("./controllers/ProductsController");
const QuestionsController = require("./controllers/QuestionsController");
const TransactionsController = require("./controllers/TransactionsController");
const PublicsController = require("./controllers/PublicsController");
const QuizzesController = require("./controllers/QuizController");
const PaymentsController = require("./controllers/PaymentsController");


function authenticationMiddleware(req, res, next) {  
  if (req.isAuthenticated()) {return next() }
  res.redirect('/login')
}

routes.get("/register", RegisterController.get);
routes.post("/register", RegisterController.getNewUser);
routes.get("/login", UsersController.get);
routes.post("/login", UsersController.login);
routes.get("/logout", authenticationMiddleware, UsersController.logout);
routes.get("/", authenticationMiddleware, DashbordController.get);
routes.get("/profile", authenticationMiddleware, ProfilesController.get);
routes.post("/profile", authenticationMiddleware, ProfilesController.updateRegister);
routes.get("/created-publics", authenticationMiddleware, PublicsController.get);
routes.post("/created-publics", authenticationMiddleware, PublicsController.publicCreate);
routes.get("/quiz", authenticationMiddleware, QuizzesController.get);
routes.post("/start-quiz", authenticationMiddleware, QuizzesController.updateQuiz);
routes.get("/question-quiz", authenticationMiddleware, QuizzesController.getQuestions);
routes.post("/respost-question", authenticationMiddleware, QuizzesController.registerQuestion);
routes.get("/question-quiz/sequence/:id", authenticationMiddleware, QuizzesController.getQuestions2);
routes.get("/congratulations", authenticationMiddleware, QuizzesController.getCongratulations);
routes.post("/respost-question/sequence", authenticationMiddleware, QuizzesController.registerQuestion2);
routes.get("/payments", authenticationMiddleware, PaymentsController.getKeyPix);
routes.post("/registerPix", authenticationMiddleware, PaymentsController.registerPix);
routes.post("/pay", authenticationMiddleware, PaymentsController.pay);
routes.get("/admin", authenticationMiddleware, AdminController.index);
routes.post("/admin", authenticationMiddleware, AdminController.updateAmount);
routes.get("/admin/searchresult", authenticationMiddleware, AdminController.searchApp);
routes.get("/admin/searchresultRequest", authenticationMiddleware, TransactionsController.searchAppRequest);
routes.post("/admin/users/delete", authenticationMiddleware, AdminController.deleteUsers);
routes.get("/admin/register-products", authenticationMiddleware, ProductsController.getProducts);
routes.post("/admin/register-products", authenticationMiddleware, ProductsController.insertProducts);
routes.post("/admin/delete-products", authenticationMiddleware, ProductsController.deleteProducts);
routes.get("/admin/register-questions", authenticationMiddleware, QuestionsController.getQuestions);
routes.get("/admin/edit-questions/:id", authenticationMiddleware, QuestionsController.getQuestion);
routes.post("/admin/register-questions", authenticationMiddleware, QuestionsController.insertQuestion);
routes.post("/admin/register-answer", authenticationMiddleware, QuestionsController.insertAnswer);
routes.post("/admin/delete-question", authenticationMiddleware, QuestionsController.deleteQuestion);
routes.get("/admin/ranking", authenticationMiddleware, QuizzesController.getRanking);
routes.post("/admin/rankingAndQuiz-delete", authenticationMiddleware, QuizzesController.deleteRankingAndQuiz);
routes.get("/admin/requests", authenticationMiddleware, TransactionsController.getTransactions);
routes.post("/admin/requests", authenticationMiddleware, TransactionsController.updateTransaction);
routes.post("/admin/requests/delete", authenticationMiddleware, TransactionsController.deleteTransaction);
routes.get("/admin/transactions", authenticationMiddleware, TransactionsController.getAllTransactions);
routes.post("/like", authenticationMiddleware, PublicsController.like);
routes.get("/publics", authenticationMiddleware, PublicsController.getPublics);
routes.get("/publics/page/:num", authenticationMiddleware, PublicsController.getPagePublics);
routes.get("/publics/:slug", authenticationMiddleware, PublicsController.getPublic);
routes.get("/:id", authenticationMiddleware, DashbordController.getByProduct);
routes.post("/:id", authenticationMiddleware, DashbordController.byProduct);

module.exports = routes;
