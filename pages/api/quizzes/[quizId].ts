import prismadb from "@/lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import shuffle from 'lodash/shuffle';
// import serverAuth from "@/lib/serverAuth";
interface Question {
  question: string;
  answers: string[];
  correct: string;
  id: string;
  quizId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    // await serverAuth(req);
    const { quizId } = req.query;

    if (typeof quizId !== "string") {
      throw new Error("Invalid ID");
    }
    if (!quizId) {
      throw new Error("Invalid ID");
    }

    const questions = await prismadb.questions.findMany({
      where: {
        quizId: quizId,
      
      },
    });

    if (!questions) {
      throw new Error("No Questions Found");
    }
    const shuffledQuestions = shuffle(questions);
    const selectedQuestions = shuffledQuestions.slice(0, 15);
    selectedQuestions.push(
      
      {
        question: '',
        answers: [],
        correct: '',
        id: "",
        quizId: ""
      },
    
)
    const quiz = await prismadb.quiz.findUnique({
      where: {
        id: quizId,
      },
    });
    if (!quiz) {
      throw new Error("No Quiz Found");
    }
    const result = {
      title: quiz.title,
      question: selectedQuestions

    }
    
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
