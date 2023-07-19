import { getFormattedDateNow } from '@/lib/getFormattedDate';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const {name, username, userpassword, email} = (await req.json()) as FormDataRegister;
    const createdAt = getFormattedDateNow();
    const password = bcrypt.hashSync(userpassword, 10);
    const client = await clientPromise;
    const usersCollection = client.db(process.env.DB_NAME).collection(process.env.MONGO_USER_COLLECTION as string);
    const userDocument = await usersCollection.findOne({$or: [{ email },{ username }]});
    if (userDocument) {
      throw new Error('User or email already exists.');
    }
    const user = await usersCollection.insertOne({
      name,
      username,
      email,
      password,
      createdAt,
      verified: false,
      updatedAt: createdAt,
      role: 'user',
    });

    return new NextResponse(
      JSON.stringify({
        status: "success",
        data: { user: { ...user, password: undefined } },
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: 'Invalid Token' }), {
      status: 400,
      statusText: 'Invalid Request',
      headers: {
          'Content-Type': 'application/json'
      }
  })
  }
}
