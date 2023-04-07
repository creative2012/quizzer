import prismadb from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';
// import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }
  

  try {
    // await serverAuth(req);
    
    const quizzes = await prismadb.quiz.findMany({
      orderBy: [
        {
          title: 'asc',
        },
        {
          level: 'desc',
        },
      ],
      include: {
        questions: true,
      },
    });

    const quizsWithQuestionCount = quizzes.map((quiz) => ({
      ...quiz,
      questionCount: quiz.questions.length,
    }));

    return res.status(200).json(quizsWithQuestionCount);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
