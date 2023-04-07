import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from "@/lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { quizId, question, answers, correct } = req.body;

  try {
    const newQuestion = await prismadb.questions.create({
      data: {
        quizId,
        question,
        answers,
        correct,
      },
    });
    res.status(201).json({ question: newQuestion });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}
