import { NextApiResponse } from 'next';
import { z } from "zod";
import { prisma } from "@/lib/prisma"
import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';

/*
 *type PrismaErrors = Prisma.PrismaClientKnownRequestError |
 *  Prisma.PrismaClientUnknownRequestError |
 *  Prisma.PrismaClientValidationError |
 *  Prisma.PrismaClientRustPanicError |
 *  Prisma.PrismaClientInitializationError;
 */

type ResponseConfig = {
  options: ResponseInit;
  body: any;
}

const userSchema = z.object({
  username: z.string(),
  password: z.string().refine(p => p.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&\-]{8,20}$/)),
});

export async function POST(req: Request, res: Response) {
  // validate request body
  const reqBody = await req.json();
  const responseConfig: ResponseConfig = { options: {}, body: {} };
  const validation = userSchema.safeParse(reqBody);
   
  if (!validation.success) {
    responseConfig.options.status = 400
    responseConfig.body.message = 'Invalid request body';
    console.log('validation failed')
  } else {

    try {
      // hash password
      const hash = await bcrypt.hash(reqBody.password, 12)
      try {
        // prisma insert
        const user = await prisma.user.create({
          data: {
            username: reqBody.username,
            hashed_password: hash,
          }
        });

        // if the pg operation was successful, set the request status to 200
        responseConfig.options.status = 200;
        responseConfig.body.message = 'success!';
      } catch (e: unknown) {
        prismaErrorHandler(e, responseConfig);
      }
    } catch (e) {
      console.error('bcrypt error:', e);
    }
  }
  return new Response(responseConfig.body, responseConfig.options);
}

const prismaErrorHandler = (e: any, res: ResponseConfig) => {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    res.options.status = 500;
    res.body.message = 'Server error';
  }
}
