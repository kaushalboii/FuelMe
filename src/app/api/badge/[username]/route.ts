import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_CREATORS } from '@/lib/data';

export function generateStaticParams() {
  return INITIAL_CREATORS.map((c) => ({
    username: c.username,
  }));
}

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  const username = params.username.replace('@', '');
  const creator = INITIAL_CREATORS.find((c) => c.username.toLowerCase() === username.toLowerCase());

  const name = creator ? creator.displayName : username;
  const label = `Buy ${name} a chai`;
  const status = `0% Fee UPI`;

  const labelWidth = Math.max(90, label.length * 8 + 30);
  const statusWidth = 80;
  const totalWidth = labelWidth + statusWidth;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="28" role="img" aria-label="${label}: ${status}">
    <clipPath id="a">
      <rect width="${totalWidth}" height="28" rx="8" fill="#fff"/>
    </clipPath>
    <g clip-path="url(#a)">
      <rect width="${labelWidth}" height="28" fill="#FFDD00"/>
      <rect x="${labelWidth}" width="${statusWidth}" height="28" fill="#18181b"/>
    </g>
    <g text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, sans-serif" font-size="11" font-weight="bold">
      <text x="${labelWidth / 2}" y="18" fill="#18181b">☕ ${label}</text>
      <text x="${labelWidth + statusWidth / 2}" y="18" fill="#FFDD00">${status}</text>
    </g>
  </svg>`;

  return new NextResponse(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml;charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
