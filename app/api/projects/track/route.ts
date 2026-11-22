import { NextResponse } from 'next/server';
import { listBookings } from '@/lib/store';

const referencePattern = /^RXN-\d{6}-\d{2}$/i;

export async function POST(request: Request) {
  try {
    const length = Number(request.headers.get('content-length') || 0);
    if (length > 4000) return NextResponse.json({ error: 'Request is too large.' }, { status: 413 });

    const data = await request.json();
    if (
      typeof data.reference !== 'string' ||
      typeof data.email !== 'string' ||
      !referencePattern.test(data.reference.trim()) ||
      data.email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())
    ) {
      return NextResponse.json({ error: 'Enter a valid project reference and booking email.' }, { status: 400 });
    }

    const bookings = await listBookings();
    const booking = bookings.find(
      (item) =>
        item.reference.toLowerCase() === data.reference.trim().toLowerCase() &&
        item.email.toLowerCase() === data.email.trim().toLowerCase(),
    );
    if (!booking) return NextResponse.json({ error: 'We could not find a project with those details.' }, { status: 404 });

    return NextResponse.json({
      reference: booking.reference,
      status: booking.status,
      service: booking.websiteType,
      submittedAt: booking.createdAt,
    });
  } catch (error) {
    console.error('RIXON project tracking error', error);
    return NextResponse.json({ error: 'Project status is temporarily unavailable. Please try again later.' }, { status: 500 });
  }
}
