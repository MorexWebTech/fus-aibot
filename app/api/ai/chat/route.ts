import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const { userId, prompt } = await req.json();

  // Save the user's prompt to the database
  const { error: insertError } = await supabase.from('chat_history').insert([{ user_id: userId, prompt }]);
  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  // In a real application, you would call your AI model here, passing in the chat history.
  // For now, we'll just return a mock response.
  const response = `You said: "${prompt}"`;

  // Save the AI's response to the database
  const { error: insertError2 } = await supabase.from('chat_history').insert([{ user_id: userId, response }]);
  if (insertError2) {
    return NextResponse.json({ error: insertError2.message }, { status: 500 });
  }

  return NextResponse.json({ response });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  const { data, error } = await supabase.from('chat_history').select('*').eq('user_id', userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
