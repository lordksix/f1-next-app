import { getFormattedDateNow } from '@/lib/getFormattedDate';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  const username = request.nextUrl.searchParams.get('user');
  const pass = request.nextUrl.searchParams.get('pass');
  const createdAt = getFormattedDateNow();
  if (secret !== process.env.MY_SECRET_TOKEN) {
    return new NextResponse(JSON.stringify({ message: 'Invalid Token' }), {
        status: 401,
        statusText: 'Unauthorized',
        headers: {
            'Content-Type': 'application/json'
        }
    })
  }
  if (!username || !pass) {
    return new NextResponse(JSON.stringify({ message: 'Invalid Token' }), {
        status: 400,
        statusText: 'Invalid Request',
        headers: {
            'Content-Type': 'application/json'
        }
    })
  }
  const client = await clientPromise;
  const usersCollection = client.db(process.env.DB_NAME).collection(process.env.MONGO_USER_COLLECTION as string);

  const password = bcrypt.hashSync(pass, 10);
  await usersCollection.insertOne({
    username,
    password,
    createdAt,
    verified: false,
    updatedAt: createdAt,
    role: 'admin',
  });

  return NextResponse.json({ success: true });
}