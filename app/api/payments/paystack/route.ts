import { NextResponse } from 'next/server';
import https from 'https';

export async function POST(req: Request) {
  try {
    const { amount, currency, email, reference } = await req.json();

    const params = JSON.stringify({
      email: email,
      amount: amount * 100,
      currency: currency,
      reference: reference,
      callback_url: 'https://your-callback-url.com'
    });

    const options = {
      hostname: 'api.paystack.co',
      port: 443,
      path: '/transaction/initialize',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    };

    const clientReq = https.request(options, (res: any) => {
      let data = '';
      res.on('data', (chunk: any) => {
        data += chunk;
      });
      res.on('end', () => {
        return NextResponse.json(JSON.parse(data));
      });
    }).on('error', (error: any) => {
      console.error(error);
      return NextResponse.json({ error: 'Failed to process payment' }, { status: 500 });
    });

    clientReq.write(params);
    clientReq.end();

  } catch (error) {
    console.error('Paystack payment error:', error);
    return NextResponse.json({ error: 'Failed to process payment' }, { status: 500 });
  }
}
