import { NextApiRequest, NextApiResponse } from "next";
import { postIndex } from "../../lib/algolia";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body.search)
    res.status(400).send({
      message: "missing body",
    });

  const posts = await postIndex.search(req.body.search);

  res.status(200).send({
    data: posts.hits,
  });
};
