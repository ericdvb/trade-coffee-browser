import { NextApiRequest, NextApiResponse } from 'next';
import { z } from "zod";
import { prisma } from "@/lib/prisma"
import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';

type PrismaErrors = Prisma.PrismaClientKnownRequestError |
  Prisma.PrismaClientUnknownRequestError |
  Prisma.PrismaClientValidationError |
  Prisma.PrismaClientRustPanicError |
  Prisma.PrismaClientInitializationError;

const userSchema = z.object({
  username: z.string(),
  password: z.string().refine(p => p.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)),
});

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  // validate request body
  debugger;
  const validation = userSchema.safeParse(req.body);
   
  if (!validation.success) {
    res.status(400).json({ message: 'Invalid request body' })
  } else {

    try {
      // hash password
      const hash = await bcrypt.hash(req.body.password, 12)
      try {
        // prisma insert
        prisma.user.create({
          data: {
            username: req.body.username,
            hashed_password: hash,
          }
        });
      } catch (e: unknown) {
        prismaErrorHandler(e, res);
      }
    } catch (e) {
      console.error('bcrypt error:', e);
    }

  }
  // catch error and set status based on error message
  res.status(200).json({ message: 'Hello, world!' });
  res.end();
}

const prismaErrorHandler = (e: any, res: NextApiResponse) => {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    res.status(500).json({ message: 'Server error'})
  }
}
