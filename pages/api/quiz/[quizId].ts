import prismadb from "@/lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
// import serverAuth from "@/lib/serverAuth";

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

    const quiz = await prismadb.quiz.findUnique({
      where: {
        id: quizId,
      },
    });

    if (!quiz) {
      throw new Error("Invalid ID");
    }
    return res.status(200).json(quiz);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
