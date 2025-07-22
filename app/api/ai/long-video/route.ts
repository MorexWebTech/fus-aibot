import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  // In a real application, you would call your local long video generation model here.
  // For now, we'll just return a mock response.
  const videoUrl = 'https://www.w3schools.com/html/mov_bbb.mp4';

  return NextResponse.json({ videoUrl });
}
