import { generateQuiz } from "../llm/chains/quizChain.js";
import { Quiz } from "../models/quiz.model.js";
import { getCourse, getChapter } from "./course.js"; //2
import { getUser } from "./user.js";

export const generateNewQuiz = async (magicId, topic, courseId, chapterId) => {
  try {
    // const con = getChapter(courseId, chapterId);
    let chapterContent = await getChapter(courseId, chapterId);
    // const matter = con.content;
    // console.log("❤💛💛💛💛💛💛💛💛💙💙");
    // console.log(chapterContent);
    // console.log("❤💛💛💛💛💛💛💛💛💙💙");
    let quizDetails = await generateQuiz(topic, chapterContent); //1
    // let quizDetails = await generateQuiz(); //1

    const newQuiz = new Quiz({
      title: quizDetails.title,
      questions: quizDetails.questions,
    });
    await newQuiz.save();

    const course = await getCourse(courseId);
    if (!course) {
      return res.status(200).send("Course does not exist");
    }
    for (let chapter of course.chapters) {
      if (chapter._id == chapterId) {
        chapter.quizId = newQuiz._id;
        break;
      }
    }

    await course.save();

    //Push the quiz id in the user model
    const userData = await getUser(magicId);
    let quizMetadata = {
      courseId: courseId,
      quizId: newQuiz._id,
      title: quizDetails.title,
      takenAt: new Date().toISOString(),
    };
    userData.quizzes.push(quizMetadata);

    await userData.save();

    console.log("Quiz saved!");

    return { newQuiz, quizMetadata };
  } catch (error) {
    console.error("❌ Error inside generateNewQuiz:", error);
    throw error;
  }
};

export const getQuiz = async (quizId) => {
  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      throw new Error("Quiz not found!");
    }
    return quiz;
  } catch (error) {
    console.error("❌ Error inside getQuiz:", error);
    throw error;
  }
};

export const updateQuizScore = async (magicId, quizId, totalScore) => {
  try {
    const userData = await getUser(magicId);
    for (let quiz of userData.quizzes) {
      if (quiz.quizId == quizId) {
        quiz.score = totalScore;
        quiz.takenAt = new Date().toISOString();
        break;
      }
    }
    await userData.save();
    return userData;
  } catch (error) {
    console.error("❌ Error inside updateQuizScore:", error);
    throw error;
  }
};
