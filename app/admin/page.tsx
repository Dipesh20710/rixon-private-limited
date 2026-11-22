import { redirect } from 'next/navigation';
import Link from 'next/link';
import { isAdmin } from '@/lib/auth';
import { listBookings, databaseMode } from '@/lib/store';
import { AdminTable } from '@/components/admin-table';
import { AdminAnalytics } from '@/components/admin-analytics';
import type { Booking } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function Admin() {
  if (!(await isAdmin())) redirect('/admin/login');
  let rows: Booking[];
  try {
    rows = await listBookings();
  } catch (error) {
    console.error('RIXON admin dashboard could not load booking data.', error);
    return (
      <div className="adminwrap">
        <div className="adminhead">
          <div>
            <div className="eyebrow">RIXON / CONTROL ROOM</div>
            <h1>Project enquiries</h1>
          </div>
          <form action="/api/admin/logout" method="post"><button className="button secondary">Sign out</button></form>
        </div>
        <p className="notice" role="alert">Booking data is temporarily unavailable. Please try again later.</p>
      </div>
    );
  }
  const count = (status: string) => rows.filter((row) => row.status === status).length;

  return (
    <div className="adminwrap">
      <div className="adminhead">
        <div>
          <div className="eyebrow">RIXON / CONTROL ROOM</div>
          <h1>Project enquiries</h1>
          <p className="muted">Review incoming requests and keep each project moving.</p>
        </div>
        <form action="/api/admin/logout" method="post"><button className="button secondary">Sign out</button></form>
      </div>
      <AdminAnalytics
        bookings={rows.map(({ status, createdAt }) => ({ status, createdAt }))}
        now={new Date().toISOString()}
      />
      <div className="metrics">
        <div className="metric"><span>Total enquiries</span><strong>{rows.length}</strong></div>
        <div className="metric"><span>New</span><strong>{count('New')}</strong></div>
        <div className="metric"><span>In progress</span><strong>{count('In Progress')}</strong></div>
        <div className="metric"><span>Completed</span><strong>{count('Completed')}</strong></div>
      </div>
      <div className="sectionhead">
        <div><h2>All enquiries</h2><p className="muted">Database: {databaseMode() === 'supabase' ? 'Supabase' : 'Local JSON (development)'}</p></div>
        <Link href="/book" className="muted">View booking form ↗</Link>
      </div>
      <AdminTable initial={rows} />
    </div>
  );
}
