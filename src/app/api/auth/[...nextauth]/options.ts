import { NextAuthOptions } from 'next-auth';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import GitHub from '@auth/core/providers/github';
import Facebook from '@auth/core/providers/facebook';
import Google from '@auth/core/providers/google';
import clientPromise from '@/lib/mongodb';
import { Provider } from 'next-auth/providers';
import { DefaultAdapter } from 'next-auth/adapters';
import Credentials from '@auth/core/providers/credentials';
import bcrypt from 'bcrypt';

export const options: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise) as DefaultAdapter,
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }) as Provider,
    Facebook({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }) as Provider,
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }) as Provider,
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'your-cool-username'
        },
        password: {
          label: 'Password:',
          type: 'password',
          placeholder: 'your-awesome-password'
        }
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const usersCollection = client
          .db(process.env.DB_NAME)
          .collection('users');
        const temp = credentials?.username as string;
        const email = temp.toLowerCase();
        const user = await usersCollection.findOne({ email });
        if (!user) {
          throw new Error('User does not exist.');
        }

        //validate password
        const passwordIsValid = await bcrypt.compare(
          credentials?.password as string,
          user.password
        );

        if (!passwordIsValid) {
          throw new Error('Invalid credentials');
        }

        return {
          id: user._id.toString(),
          ...user,
        };
      },
  }) as Provider,
  ],
  session: {
    strategy: 'jwt',
  },
};

