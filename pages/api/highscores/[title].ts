import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { quizTitle } = req.query;
  let scores;

  if (quizTitle != 'all') {
    scores = await prismadb.scores.findMany({
      where: { quiz: { title: quizTitle as string } },
      select: { highScore: true, medal: true, user: { select: { name: true } }, quiz: { select: { title: true } } },
      orderBy: { highScore: 'desc' },
    });
  } else {
    scores = await prismadb.scores.findMany({
      select: { highScore: true, medal: true, user: { select: { name: true } }, quiz: { select: { title: true } } },
      orderBy: { highScore: 'desc' },
    });
  }

  res.status(200).json(scores);
}
