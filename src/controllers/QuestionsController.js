const Question = require("../model/Question");
const Answer = require("../model/Answer");
/* const Profile = require("../model/Profile"); */

module.exports = {
  async getQuestions(req, res) {
    const stringidUser = req.user.id;
    const admin = stringidUser === 1;
    const questions = await Question.findAll();

    if (!admin) {
      res.redirect("/");
    }

    res.render("register_questions", { questions: questions });
  },

  async insertQuestion(req, res) {
    const question = req.body.question;
    const numberQuestion = req.body.numberQuestion;
    const idQuiz = req.body.idQuiz;

    await Question.create({
      question: question,
      numberQuestion: numberQuestion,
      idQuiz: idQuiz,
    });

    res.redirect("/admin/register-questions");
  },

  async getQuestion(req, res) {
    const stringidUser = req.user.id;
    const questionId = req.params.id;
    const admin = stringidUser === 1;
    const question = await Question.findOne({ where: { id: questionId } });

    if (!admin) {
      res.redirect("/");
    }

    res.render("edit_question", { question: question });
  },

  async insertAnswer(req, res) {
    let answer = req.body.answer;
    let status = req.body.status;
    let points = req.body.points;
    let idQuestion = req.body.idQuestion;
    console.log(req.body)

    await Answer.create({
      answer: answer,
      status: status,
      points: points,
      id_Question: idQuestion,
    });

    res.redirect(`/admin/edit-questions/${idQuestion}`);
  },

  async deleteQuestion(req, res) {
    const idQuestion = req.body.idQuestion
    if(idQuestion !== undefined){
        if(!isNaN(idQuestion)){
         await Question.destroy({where: {id: idQuestion}})
          res.redirect("/admin/register-questions");
        }else{
          res.redirect("/admin/register-questions");
        }
      }else{
        res.redirect("/admin/register-questions");
      }
    }
};