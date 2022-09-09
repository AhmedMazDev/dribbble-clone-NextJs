import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../firebase/admin";
import { postIndex } from "../../lib/algolia";
import { Post, PostAlgolia } from "../../types/Post";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body.idToken) {
    return res.status(400).send({
      error: "no token",
    });
  }

  admin
    .auth()
    .verifyIdToken(req.body.idToken)
    .then(async (decodedToken) => {
      const body = req.body as Post;

      if (!body.title || !body.username) {
        return res.status(400).send({
          status: 400,
          error: "Missing body",
        });
      }

      const post = await postIndex.saveObject({
        objectID: body.slug,
        ...body,
      });

      return res.status(200).json({
        success: true,
        data: {
          post,
        },
      });
    })
    .catch((error) => {
      return res.status(400).send({
        error: "invalid token",
      });
    });
};
