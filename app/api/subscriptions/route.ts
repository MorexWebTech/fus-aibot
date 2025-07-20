import { NextRequest, NextResponse } from 'next/server';

// This is a mock database. In a real application, you would use a database.
const userSubscriptions = {
  'user1@example.com': 'premium',
  'user2@example.com': 'basic',
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  const subscription = userSubscriptions[email] || 'free';
  return NextResponse.json({ subscription });
}

export async function POST(req: NextRequest) {
  const { email, subscription } = await req.json();

  if (!email || !subscription) {
    return NextResponse.json({ error: 'Email and subscription are required' }, { status: 400 });
  }

  userSubscriptions[email] = subscription;
  return NextResponse.json({ subscription: userSubscriptions[email] });
}
