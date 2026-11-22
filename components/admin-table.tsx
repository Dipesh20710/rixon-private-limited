'use client';

import { useState } from 'react';

const statuses = ['New', 'In Review', 'Contacted', 'In Progress', 'Completed', 'Declined'];

export function AdminTable({ initial }: { initial: any[] }) {
  const [rows, setRows] = useState(initial);
  const [error, setError] = useState('');

  async function change(id: string, status: string) {
    setError('');
    const response = await fetch(`/api/admin/bookings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      setError('Could not update booking.');
      return;
    }
    setRows((current) => current.map((row) => row.id === id ? { ...row, status } : row));
  }

  return (
    <>
      <div className="tablewrap">
        <table>
          <thead>
            <tr>
              <th>Reference / Customer</th>
              <th>Project</th>
              <th>Budget</th>
              <th>Received</th>
              <th>Status</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row: any) => (
              <tr key={row.id}>
                <td>
                  <strong>{row.reference}</strong><br />
                  <span className="muted">{row.name}</span>
                  <div className="detail">{row.brief}</div>
                </td>
                <td>{row.websiteType}<br /><span className="muted">{row.business || '—'}</span></td>
                <td>{row.budget}</td>
                <td>{new Date(row.createdAt).toLocaleDateString()}</td>
                <td>
                  <select className="statusselect" value={row.status} onChange={(event) => change(row.id, event.target.value)}>
                    {statuses.map((status) => <option key={status}>{status}</option>)}
                  </select>
                </td>
                <td>
                  <a href={`mailto:${row.email}`}>Email</a><br />
                  <a href={`https://wa.me/${row.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!rows.length && <div className="empty">No enquiries yet. New website bookings will appear here.</div>}
      </div>
      {error && <p className="notice">{error}</p>}
    </>
  );
}
