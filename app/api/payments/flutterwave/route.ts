import { NextResponse } from 'next/server';
import Flutterwave from 'flutterwave-node-v3';

const flw = new Flutterwave(process.env.FLUTTERWAVE_PUBLIC_KEY || '', process.env.FLUTTERWAVE_SECRET_KEY || '');

export async function POST(req: Request) {
  try {
    const { amount, currency, email, tx_ref } = await req.json();

    const payload = {
      card_number: 'YOUR_CARD_NUMBER',
      cvv: 'YOUR_CARD_CVV',
      expiry_month: 'YOUR_CARD_EXPIRY_MONTH',
      expiry_year: 'YOUR_CARD_EXPIRY_YEAR',
      currency: currency,
      amount: amount,
      email: email,
      tx_ref: tx_ref,
      fullname: 'John Doe',
      redirect_url: 'https://your-redirect-url.com',
      authorization: {
        mode: 'pin',
        pin: '1234'
      }
    };

    const response = await flw.Charge.card(payload);
    console.log(response);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Flutterwave payment error:', error);
    return NextResponse.json({ error: 'Failed to process payment' }, { status: 500 });
  }
}
