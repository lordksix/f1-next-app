import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  const user = request.nextUrl.searchParams.get('user');
  const pass = request.nextUrl.searchParams.get('pass');
  if (secret !== process.env.MY_SECRET_TOKEN) {
    return new NextResponse(JSON.stringify({ message: 'Invalid Token' }), {
        status: 401,
        statusText: 'Unauthorized',
        headers: {
            'Content-Type': 'application/json'
        }
    })
  }
  if (!user || !pass) {
    return new NextResponse(JSON.stringify({ message: 'Invalid Token' }), {
        status: 400,
        statusText: 'Invalid Request',
        headers: {
            'Content-Type': 'application/json'
        }
    })
  }
  const client = await clientPromise;
  const users = client.db(process.env.DB_NAME).collection('users');

  const password = bcrypt.hashSync(pass, 10);
  await users.insertOne({
    user,
    password,
    role: 'admin',
  });

  return NextResponse.json({ success: true });
}