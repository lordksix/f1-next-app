import { NextAuthOptions, User } from 'next-auth';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import GitHub from '@auth/core/providers/github';
import Facebook from '@auth/core/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import clientPromise from '@/lib/mongodb';
import { Provider } from 'next-auth/providers';
import { DefaultAdapter } from 'next-auth/adapters';
import Credentials from '@auth/core/providers/credentials';
import bcrypt from 'bcrypt';

export const options: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise) as DefaultAdapter,
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }) as Provider,
    Facebook({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }) as Provider,
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
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
          .collection(process.env.MONGO_USER_COLLECTION as string);
        const temp = credentials.username as string;
        const username = temp.toLowerCase();
        const user = await usersCollection.findOne({ username });
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
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.name = user.name;
        token.createdAt = user.createdAt;
        token.email = user.email;
        token.emailVerified = user.emailVerified as boolean;
        token.id = user.id;
        token.picture = user.image;
        token.updatedAt = user.updatedAt;
        token.role = user.role;
      }
      return token;
    },
    async session({session, token}) {
      if (token && session.user) {
        session.user.createdAt = token.createdAt;
        session.user.email = token.email;
        session.user.emailVerified = token.emailVerified;
        session.user.id = token.id;
        session.user.image = token.picture;
        session.user.updatedAt = token.updatedAt;
        session.user.role = token.role;
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt',
  },
};

