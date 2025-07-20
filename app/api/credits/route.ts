import { NextRequest, NextResponse } from 'next/server';

// This is a mock database. In a real application, you would use a database.
const userCredits = {
  'user1@example.com': 100,
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  const credits = userCredits[email] || 0;
  return NextResponse.json({ credits });
}

export async function POST(req: NextRequest) {
  const { email, credits } = await req.json();

  if (!email || !credits) {
    return NextResponse.json({ error: 'Email and credits are required' }, { status: 400 });
  }

  userCredits[email] = (userCredits[email] || 0) + credits;
  return NextResponse.json({ credits: userCredits[email] });
}
