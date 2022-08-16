import { NextRequest, NextResponse } from 'next/server';

export default function Middleware(req: NextRequest) {
  if (req.nextUrl.pathname === '/') {
    return NextResponse.redirect('http://localhost:3000/subscriptions');
  }
}
