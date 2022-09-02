import { NextApiRequest, NextApiResponse } from "next";
import { usersIndex } from "../../lib/algolia";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body.search)
    res.status(400).send({
      message: "missing body",
    });

  const users = await usersIndex.search(req.body.search);

  res.status(200).send({
    data: users.hits,
  });
};
