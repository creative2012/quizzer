import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const quizzes = await prismadb.quiz.findMany({
      include: {
        questions: true,
      },
    });
    res.status(200).json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to fetch quizzes" });
  } finally {
    await prismadb.$disconnect();
  }
}
