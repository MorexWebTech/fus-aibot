import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, userIds } = await req.json();

    const team = await prisma.team.create({
      data: {
        name,
        users: {
          connect: userIds.map((id: string) => ({ id })),
        },
      },
    });

    return NextResponse.json(team);
  } catch (error) {
    console.error('Team creation error:', error);
    return NextResponse.json({ error: 'Failed to create team' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, name, userIds } = await req.json();

    const team = await prisma.team.update({
      where: { id },
      data: {
        name,
        users: {
          set: userIds.map((id: string) => ({ id })),
        },
      },
    });

    return NextResponse.json(team);
  } catch (error) {
    console.error('Team update error:', error);
    return NextResponse.json({ error: 'Failed to update team' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    await prisma.team.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Team deleted successfully' });
  } catch (error) {
    console.error('Team deletion error:', error);
    return NextResponse.json({ error: 'Failed to delete team' }, { status: 500 });
  }
}
