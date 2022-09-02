import { NextApiRequest, NextApiResponse } from "next";
import { postIndex } from "../../lib/algolia";
import { Post, PostAlgolia } from "../../types/Post";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as Post;

  if (!body.title || !body.username) {
    res.status(400).send({
      status: 400,
      error: "Missing body",
    });
  }

  const post = await postIndex.saveObject({
    objectID: body.slug,
    ...body,
  });

  res.status(200).json({
    success: true,
    data: {
      post,
    },
  });
};
