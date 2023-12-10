import NextAuth, {User} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface Credentials extends Record<"username" | "password", string> {};

const handler = NextAuth({
  providers: [CredentialsProvider({
    name: "Credentials",
    credentials: {
      username: { label: "username", type: "text", placeholder: "username" },
      password: { label: "password", type: "password" }
    },
    authorize: async (credentials?: Credentials): Promise<User | null> => {
      // if we find a matching user/pw record, return a promise containing the object
      let returnObj = null;
      if ( credentials ) {
        const { username, password } = credentials
        if (!username || !password) { return false as any }

        // check if a matching user exists, if not, send a rejection
        const userRecord = await prisma.user.findUnique({ where: { username: username } });
        // check if the username and excrypted password match
        if (userRecord) {
          if (await bcrypt.compare(password, userRecord.hashed_password)) {

            // create a jwt
            const token = jwt.sign({
              userId: userRecord.id
            }, {
              algorithm: 'rsa256',
              expiresIn: 86400,
            });

            returnObj = {
              Authorization: token
            }
          }
        }
      }
      return returnObj as any;
    },

  })]
});

export { handler as GET, handler as POST };
