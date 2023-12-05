import { NextApiRequest, NextApiResponse } from 'next';
import { z } from "zod";
import { prisma } from "@/lib/prisma"

const userSchema = z.object({
  username: z.string(),
  password: z.string().refine(p => p.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)),
});

export default function POST(req: NextApiRequest, res: NextApiResponse) {
  // validate request body
   
  // prisma insert
  prisma.user.create({
    data: {
      username: req.body.username,
      hashed_password: req.body.password,
    }
  })
  // catch error and set status based on error message
  res.status(200).json({ message: 'Hello, world!' });
  res.end();
}
