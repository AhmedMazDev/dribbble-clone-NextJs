import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../firebase/admin";
import { postIndex } from "../../lib/algolia";
import { Post, PostAlgolia } from "../../types/Post";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(req.body);
  try {
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
          title: body.title,
          userDisplayName: body.userDisplayName,
          tags: body.tags,
          createdAt: body.createdAt,
          imageUrl: body.imageUrl,
          slug: body.slug,
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
  } catch (e) {
    console.log("error", e);
  }
};
