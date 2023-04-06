import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { quizId, userId, score, medal } = req.body;

    // Find if there's an existing score for the user in the quiz
    const existingScore = await prismadb.scores.findFirst({
      where: { quizId, userId },
    });

    if (existingScore) {
      // Update the existing score if the new score is higher
      if (score > existingScore.highScore) {
        await prismadb.scores.update({
          where: { id: existingScore.id },
          data: { 
            highScore: score,
            medal: medal 
          },
        });
        res.status(200).json({ message: "You beat your highscore! Well done!!" });
        return;
      } else {
        res.status(200).json({ message: "You didnt beat your highscore this time" });
        return;
      }
    } else {
      // Create a new score for the user in the quiz
      await prismadb.scores.create({
        data: { quizId, userId, highScore: score, 
          medal: medal },
      });
      res.status(200).json({ message: "Score Saved!" });
      return;
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }
}
