import { NextApiRequest, NextApiResponse } from "next";
import { usersIndex } from "../../lib/algolia";
import { UserAlgolia } from "../../types/User";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as UserAlgolia;

  if (!body.displayName || !body.createdAt) {
    res.status(400).send({
      status: 400,
      error: "Missing body",
    });
  }

  const user = await usersIndex.saveObject({
    objectID: body.displayName,
    ...body,
  });

  res.status(200).json({
    success: true,
    data: {
      user,
    },
  });
};
