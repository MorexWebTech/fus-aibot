import { NextResponse } from 'next/server';
import { pipeline } from '@xenova/transformers';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const pipe = await pipeline('text-to-video', 'zeroscope/zeroscope-v2-576w');
    const output = await pipe(prompt, {
      num_inference_steps: 25,
      num_frames: 24,
    });

    const videoUrl = output.videos[0];

    return NextResponse.json({ videoUrl });
  } catch (error) {
    console.error('Long video generation error:', error);
    return NextResponse.json({ error: 'Failed to generate long video' }, { status: 500 });
  }
}
