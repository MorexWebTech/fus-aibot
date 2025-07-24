import { NextResponse } from 'next/server';

const posts = [
  {
    id: 1,
    title: 'Fus AI Model v1.0 Released!',
    content: 'We are excited to announce the release of Fus AI Model v1.0. This release includes a number of new features and improvements, including...',
  },
  {
    id: 2,
    title: 'New AI Models Added',
    content: 'We have added a number of new AI models to the platform, including...',
  },
];

export async function GET() {
  return NextResponse.json(posts);
}
