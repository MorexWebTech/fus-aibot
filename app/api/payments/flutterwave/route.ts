import { NextRequest, NextResponse } from 'next/server';
import Flutterwave from 'flutterwave-node-v3';

const flw = new Flutterwave(process.env.FLUTTERWAVE_PUBLIC_KEY, process.env.FLUTTERWAVE_SECRET_KEY);

export async function POST(req: NextRequest) {
  const { email, amount, currency, tx_ref } = await req.json();

  try {
    const payload = {
      tx_ref,
      amount,
      currency,
      redirect_url: "https://fus-ai-model.vercel.app/payment-callback",
      customer: {
        email,
      },
      customizations: {
        title: "Fus AI Model",
        description: "Payment for credits",
      },
    };
    const response = await flw.Payment.initiate(payload);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
