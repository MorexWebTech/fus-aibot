import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt, options, provider } = await req.json();

    if (provider === 'rapidapi') {
      const response = await fetch('https://text-generation-inference.p.rapidapi.com/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Host': 'text-generation-inference.p.rapidapi.com',
          'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '',
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: options,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate text from RapidAPI');
      }

      const data = await response.json();
      return NextResponse.json(data);
    }

    return NextResponse.json({ error: 'Invalid provider' }, { status: 400 });
  } catch (error) {
    console.error('Text generation error:', error);
    return NextResponse.json({ error: 'Failed to generate text' }, { status: 500 });
  }
}
