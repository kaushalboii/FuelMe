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
  const label = `Fuel ${name}`;
  const status = `UPI 0% Fee`;

  const labelWidth = Math.max(70, label.length * 7.5 + 20);
  const statusWidth = 85;
  const totalWidth = labelWidth + statusWidth;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="28" role="img" aria-label="${label}: ${status}">
    <linearGradient id="b" x2="0" y2="100%">
      <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
      <stop offset="1" stop-opacity=".1"/>
    </linearGradient>
    <clipPath id="a">
      <rect width="${totalWidth}" height="28" rx="6" fill="#fff"/>
    </clipPath>
    <g clip-path="url(#a)">
      <rect width="${labelWidth}" height="28" fill="#1e293b"/>
      <rect x="${labelWidth}" width="${statusWidth}" height="28" fill="#ea580c"/>
      <rect width="${totalWidth}" height="28" fill="url(#b)"/>
    </g>
    <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="11" font-weight="bold">
      <text aria-hidden="true" x="${labelWidth / 2}" y="19" fill="#010101" fill-opacity=".3">⚡ ${label}</text>
      <text x="${labelWidth / 2}" y="18">⚡ ${label}</text>
      <text aria-hidden="true" x="${labelWidth + statusWidth / 2}" y="19" fill="#010101" fill-opacity=".3">${status}</text>
      <text x="${labelWidth + statusWidth / 2}" y="18">${status}</text>
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
