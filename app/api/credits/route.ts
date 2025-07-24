import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { userId, credits } = await req.json();

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        credits: {
          increment: credits,
        },
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('Credit update error:', error);
    return NextResponse.json({ error: 'Failed to update credits' }, { status: 500 });
  }
}
