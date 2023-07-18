export enum Role {
  user = 'user',
  admin = 'admin',
}

declare module "next-auth" {
  interface User {
    role?: Role;
    username: string;
    emailVerified: boolean;
    createdAt: string;
    updatedAt: string;
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: Role;
    username: string;
    emailVerified: boolean;
    createdAt: string;
    updatedAt: string;
  }
}