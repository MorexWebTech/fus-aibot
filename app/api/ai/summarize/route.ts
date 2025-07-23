import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { text } = await req.json();

  // In a real application, you would call your AI model here to summarize the text.
  // For now, we'll just return a mock response.
  const summary = `This is a summary of the text: "${text.substring(0, 50)}..."`;

  return NextResponse.json({ summary });
}
