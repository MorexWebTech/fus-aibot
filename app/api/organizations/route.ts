import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, userId } = await req.json();

    const organization = await prisma.organization.create({
      data: {
        name,
        users: {
          connect: { id: userId },
        },
      },
    });

    return NextResponse.json(organization);
  } catch (error) {
    console.error('Organization creation error:', error);
    return NextResponse.json({ error: 'Failed to create organization' }, { status: 500 });
  }
}
