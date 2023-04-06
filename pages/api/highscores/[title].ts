import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';

type Score = {
  highScore: number;
  medal: string;
  user: {
    name: string;
  };
};

type Quiz = {
  title: string;
  scores: Score[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Quiz>
) {
  try {
    const { title } = req.query;

    const quiz = await prisma.quiz.findUnique({
      where: {
        title: title as string,
      },
      select: {
        title: true,
        scores: {
          select: {
            highScore: true,
            medal: true,
            user: {
              select: {
                name: true,
              },
            },
          },
          orderBy: {
            highScore: 'desc',
          },
        },
      },
    });

    if (!quiz) {
      return res.status(404).end();
    }

    res.status(200).json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}
