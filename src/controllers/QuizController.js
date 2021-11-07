const Quiz = require("../model/Quiz");
const Profile = require("../model/Profile");
const Question = require("../model/Question");
const Answer = require("../model/Answer");
const Ranking = require("../model/Ranking");
const QuestionsAnswer = require("../model/QuestionsAnswer");

module.exports = {
  async get(req, res) {
    const stringidUser = req.user.id;
    const profile = await Profile.findOne({ where: { id: stringidUser } });
    const quiz = await Quiz.findOne({ where: { id_AlunoQuiz: stringidUser } });
    const ranking = await Ranking.findOne({
      where: { idAlunoRanking: stringidUser },
    });
    const profiles = await Profile.findAll();
    const rankings = await Ranking.findAll({
      order: [["totalPoints", "DESC"]],
    });
    const questionsTotalQuizOne = await Question.findAll({
      where: { idQuiz: 1 },
    });

    let attemptNo = req.flash("attemptNo");
    attemptNo =
      attemptNo == undefined || attemptNo.length == 0 ? undefined : attemptNo;

    return res.render("quiz", {
      profile: profile,
      quiz: quiz,
      attemptNo: attemptNo,
      ranking: ranking,
      profiles: profiles,
      rankings: rankings,
      questionsTotalQuizOne: questionsTotalQuizOne,
    });
  },

  async updateQuiz(req, res) {
    const idUser = req.user.id;
    const quizStatus = Number(req.body.quizStatus);
    const serieQuiz = Number(req.body.quiz);
    const quiz = await Quiz.findOne({ where: { id_AlunoQuiz: idUser } });
    const quizStatusUser = quiz.statusQuiz;

    let attemptNo = "Você já fez sua tentativa.";

    if (quizStatusUser >= 1) {
      req.flash("attemptNo", attemptNo);
      return res.redirect("/quiz");
    } else {
      quiz.quiz = serieQuiz;
      quiz.statusQuiz = quizStatus;
      await quiz.save();

      return res.redirect("/question-quiz");
    }
  },

  async getQuestions(req, res) {
    const stringidUser = req.user.id;
    const answers = await Answer.findAll();
    const profile = await Profile.findOne({ where: { id: stringidUser } });
    const questions = await Question.findAll();
    const quiz = await Quiz.findOne({ where: { id_AlunoQuiz: stringidUser } });
    const quizStatusUser = quiz.statusQuiz;

    if (quizStatusUser >= 2 || quizStatusUser == 0) {
      return res.redirect("/quiz");
    }

    return res.render("questionquiz", {
      questions: questions,
      answers: answers,
      profile: profile,
    });
  },

  async getQuestions2(req, res) {
    const numberQuestion = req.params.id;
    const stringidUser = req.user.id;
    const answers = await Answer.findAll();
    const profile = await Profile.findOne({ where: { id: stringidUser } });
    const question = await Question.findOne({
      where: { numberQuestion: numberQuestion },
    });
    const quiz = await Quiz.findOne({ where: { id_AlunoQuiz: stringidUser } });
    const quizStatusUser = quiz.statusQuiz;

    if (quizStatusUser >= 2 || quizStatusUser == 0) {
      return res.redirect("/quiz");
    }

    return res.render("questionquiz2", {
      question: question,
      answers: answers,
      profile: profile,
    });
  },

  async registerQuestion(req, res) {
    const stringidUser = req.user.id;
    const idAnswer = req.body.option;
    const questionId = Number(req.body.numberQuestion);
    const nextQuestion = questionId + 1;
    const answer = await Answer.findOne({ where: { id: idAnswer } });
    const ranking = await Ranking.findOne({
      where: { idAlunoRanking: stringidUser },
    });

    QuestionsAnswer.create({
      questionId: questionId,
      alunoId: stringidUser,
    });

    const findQuestionAnswer = await QuestionsAnswer.findOne({
      where: {
        questionId: questionId,
        alunoId: stringidUser,
      },
    });

    if (findQuestionAnswer) {
      return res.redirect(`/question-quiz/sequence/${nextQuestion}`);
    } else {
      ranking.totalPoints = ranking.totalPoints + answer.points;
      await ranking.save();

      return res.redirect(`/question-quiz/sequence/${nextQuestion}`);
    }
  },

  async registerQuestion2(req, res) {
    const stringidUser = req.user.id;
    const idAnswer = req.body.option;
    const questionId = Number(req.body.numberQuestion);
    const nextQuestion = questionId + 1;
    const findNextQuestion = await Question.findOne({
      where: { numberQuestion: nextQuestion },
    });
    const answer = await Answer.findOne({ where: { id: idAnswer } });
    const ranking = await Ranking.findOne({
      where: { idAlunoRanking: stringidUser },
    });

    QuestionsAnswer.create({
      questionId: questionId,
      alunoId: stringidUser,
    });

    const findQuestionAnswer = await QuestionsAnswer.findOne({
      where: {
        questionId: questionId,
        alunoId: stringidUser,
      },
    });

    if (findQuestionAnswer) {
      if (findNextQuestion) {
        return res.redirect(`/question-quiz/sequence/${nextQuestion}`);
      } else {
        return res.redirect("/congratulations");
      }
    } else {
      ranking.totalPoints = ranking.totalPoints + answer.points;
      await ranking.save();
      if (findNextQuestion) {
        return res.redirect(`/question-quiz/sequence/${nextQuestion}`);
      } else {
        return res.redirect("/congratulations");
      }
    }
  },

  async getCongratulations(req, res) {
    const stringidUser = req.user.id;
    const profile = await Profile.findOne({ where: { id: stringidUser } });
    const ranking = await Ranking.findOne({
      where: { idAlunoRanking: stringidUser },
    });
    const quiz = await Quiz.findOne({ where: { id_AlunoQuiz: stringidUser } });
    const quizStatusUser = quiz.statusQuiz;

    if (quizStatusUser === 1) {
      quiz.statusQuiz = 2;
      await quiz.save();

      await QuestionsAnswer.destroy({ where: { alunoId: stringidUser } });

      return res.render("congratulations", {
        ranking: ranking,
        profile: profile,
      });
    } else if (quizStatusUser === 0 || quizStatusUser === 2) {
      return res.redirect("/quiz");
    }
  },

  async getRanking(req, res) {
    const stringidUser = req.user.id;
    const profile = await Profile.findOne({ where: { id: stringidUser } });
    const quiz = await Quiz.findOne({ where: { id_AlunoQuiz: stringidUser } });
    const ranking = await Ranking.findOne({
      where: { idAlunoRanking: stringidUser },
    });
    const profiles = await Profile.findAll();
    const rankings = await Ranking.findAll({
      order: [["totalPoints", "DESC"]],
    });
    const admin = stringidUser === 1;

    if (!admin) {
      res.redirect("/");
    }

    return res.render("adminRankingUsers", {
      profile: profile,
      quiz: quiz,
      ranking: ranking,
      profiles: profiles,
      rankings: rankings,
    });
  },

  async deleteRankingAndQuiz(req, res) {
    const idUser = req.body.id_AlunoRankingAndQuiz    

    await Quiz.destroy({ where: { id_AlunoQuiz: idUser } });
    await Ranking.destroy({ where: { idAlunoRanking: idUser } });

    return res.redirect("/admin/ranking");
  },
};
