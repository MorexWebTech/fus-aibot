import { NextRequest, NextResponse } from 'next/server';
import Paystack from 'paystack-api';

const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY);

export async function POST(req: NextRequest) {
  const { email, amount } = await req.json();

  try {
    const response = await paystack.transaction.initialize({
      email,
      amount: amount * 100, // Paystack expects amount in kobo
    });
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
