import type { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

type Score = {
  highScore: number;
};

type User = {
  name: string;
  scores: Score[];
};

type UserWithTotalScore = {
  name: string;
  totalScore: number;
};

type ApiResponse = {
  users: UserWithTotalScore[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const users = await prismadb.user.findMany({
    select: {
      name: true,
      scores: { select: { highScore: true } },
    },
  });

  const usersWithTotalScores: UserWithTotalScore[] = users.map((user) => {
    const totalScore = user.scores.reduce((acc, score) => {
      return acc + score.highScore;
    }, 0);

    return { name: user.name, totalScore };
  });

  usersWithTotalScores.sort((a, b) => b.totalScore - a.totalScore);

  const apiResponse: ApiResponse = { users: usersWithTotalScores };
  res.status(200).json(apiResponse);
}
