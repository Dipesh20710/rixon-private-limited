'use client';

import { useMemo, useState } from 'react';
import type { BookingStatus } from '@/lib/types';

type AnalyticsBooking = {
  status: BookingStatus;
  createdAt: string;
};

type DateRange = '7d' | '30d' | '90d' | 'all' | 'custom';

const statuses: BookingStatus[] = ['New', 'In Review', 'Contacted', 'In Progress', 'Completed', 'Declined'];
const dayInMilliseconds = 24 * 60 * 60 * 1000;
const dateFormatter = new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

function monthKey(date: Date) {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`;
}

function formatDate(value: string) {
  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? 'Date unavailable' : dateFormatter.format(timestamp);
}

export function AdminAnalytics({
  bookings,
  now,
}: {
  bookings: AnalyticsBooking[];
  now: string;
}) {
  const [range, setRange] = useState<DateRange>('30d');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const nowTimestamp = Date.parse(now);
  const rangeIsInvalid = range === 'custom'
    && Boolean(customStart && customEnd)
    && Date.parse(`${customStart}T00:00:00.000Z`) > Date.parse(`${customEnd}T23:59:59.999Z`);

  const filteredBookings = useMemo(() => {
    if (rangeIsInvalid) return [];

    let start = Number.NEGATIVE_INFINITY;
    let end = nowTimestamp;

    if (range === 'custom') {
      if (customStart) start = Date.parse(`${customStart}T00:00:00.000Z`);
      if (customEnd) end = Date.parse(`${customEnd}T23:59:59.999Z`);
    } else if (range !== 'all') {
      const days = Number.parseInt(range, 10);
      const today = new Date(nowTimestamp);
      const endOfToday = Date.UTC(
        today.getUTCFullYear(),
        today.getUTCMonth(),
        today.getUTCDate(),
        23,
        59,
        59,
        999,
      );
      start = endOfToday - (days - 1) * dayInMilliseconds;
      end = endOfToday;
    } else {
      end = Number.POSITIVE_INFINITY;
    }

    return bookings.filter((booking) => {
      const timestamp = Date.parse(booking.createdAt);
      if (Number.isNaN(timestamp)) return range === 'all';
      return timestamp >= start && timestamp <= end;
    });
  }, [bookings, customEnd, customStart, nowTimestamp, range, rangeIsInvalid]);

  const counts = useMemo(() => {
    const result = Object.fromEntries(statuses.map((status) => [status, 0])) as Record<BookingStatus, number>;
    filteredBookings.forEach(({ status }) => {
      result[status] += 1;
    });
    return result;
  }, [filteredBookings]);

  const months = useMemo(() => {
    const endDate = range === 'custom' && customEnd
      ? new Date(`${customEnd}T00:00:00.000Z`)
      : new Date(nowTimestamp);
    let firstDate = new Date(Date.UTC(endDate.getUTCFullYear(), endDate.getUTCMonth() - 11, 1));

    if (range === 'custom' && customStart) {
      const requestedStart = new Date(`${customStart}T00:00:00.000Z`);
      firstDate = requestedStart > firstDate
        ? new Date(Date.UTC(requestedStart.getUTCFullYear(), requestedStart.getUTCMonth(), 1))
        : firstDate;
    }

    const result: { key: string; label: string; count: number }[] = [];
    const cursor = new Date(Date.UTC(firstDate.getUTCFullYear(), firstDate.getUTCMonth(), 1));
    const lastMonth = Date.UTC(endDate.getUTCFullYear(), endDate.getUTCMonth(), 1);

    while (cursor.getTime() <= lastMonth && result.length < 12) {
      result.push({
        key: monthKey(cursor),
        label: new Intl.DateTimeFormat('en-IN', { month: 'short', timeZone: 'UTC' }).format(cursor),
        count: 0,
      });
      cursor.setUTCMonth(cursor.getUTCMonth() + 1);
    }

    const countsByMonth = new Map(result.map((month) => [month.key, 0]));
    filteredBookings.forEach((booking) => {
      const timestamp = Date.parse(booking.createdAt);
      if (Number.isNaN(timestamp)) return;
      const key = monthKey(new Date(timestamp));
      if (countsByMonth.has(key)) countsByMonth.set(key, (countsByMonth.get(key) || 0) + 1);
    });

    return result.map((month) => ({ ...month, count: countsByMonth.get(month.key) || 0 }));
  }, [customEnd, customStart, filteredBookings, nowTimestamp, range]);

  const recentBookings = useMemo(
    () => filteredBookings
      .filter((booking) => !Number.isNaN(Date.parse(booking.createdAt)))
      .sort((left, right) => Date.parse(right.createdAt) - Date.parse(left.createdAt))
      .slice(0, 5),
    [filteredBookings],
  );
  const maximumMonthlyCount = Math.max(1, ...months.map((month) => month.count));
  const dateRangeDescription = range === 'all'
    ? 'All time'
    : range === 'custom'
      ? 'Custom date range'
      : `Last ${Number.parseInt(range, 10)} days`;

  const metrics = [
    { label: 'Total bookings', value: filteredBookings.length },
    { label: 'New enquiries', value: counts.New },
    { label: 'Bookings under review', value: counts['In Review'] },
    { label: 'Contacted customers', value: counts.Contacted },
    { label: 'In progress', value: counts['In Progress'] },
    { label: 'Completed', value: counts.Completed },
    { label: 'Declined', value: counts.Declined },
  ];

  return (
    <section className="analytics-panel" aria-labelledby="analytics-title">
      <div className="analytics-header">
        <div>
          <div className="eyebrow">RIXON / PERFORMANCE</div>
          <h2 id="analytics-title">Booking analytics</h2>
          <p className="muted">Aggregated from the existing booking records. No additional customer data is sent to the browser for charts.</p>
        </div>
        <div className="analytics-filter">
          <label htmlFor="analytics-range">Date range</label>
          <select
            id="analytics-range"
            value={range}
            onChange={(event) => setRange(event.target.value as DateRange)}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="all">All time</option>
            <option value="custom">Custom range</option>
          </select>
        </div>
      </div>

      {range === 'custom' && (
        <div className="analytics-custom-range">
          <div className="field">
            <label htmlFor="analytics-start">Start date</label>
            <input id="analytics-start" type="date" value={customStart} onChange={(event) => setCustomStart(event.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="analytics-end">End date</label>
            <input id="analytics-end" type="date" value={customEnd} onChange={(event) => setCustomEnd(event.target.value)} />
          </div>
          <p className="formnote">Select either date or both dates to filter the records.</p>
        </div>
      )}

      {rangeIsInvalid && <p className="notice" role="alert">The start date must be on or before the end date.</p>}

      <div className="analytics-metrics" aria-live="polite">
        {metrics.map((metric) => (
          <article className="analytics-metric" key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </article>
        ))}
      </div>

      <div className="analytics-charts">
        <section className="analytics-card" aria-labelledby="monthly-bookings-title">
          <div className="analytics-card-heading">
            <div>
              <h3 id="monthly-bookings-title">Monthly booking activity</h3>
              <p>{dateRangeDescription} · up to 12 months shown</p>
            </div>
          </div>
          {filteredBookings.length === 0 ? (
            <p className="analytics-empty">No bookings in this date range.</p>
          ) : (
            <div className="monthly-chart" role="img" aria-label={`Monthly booking counts for ${dateRangeDescription}`}>
              <div className="monthly-bars">
                {months.map((month) => (
                  <div className="monthly-bar-group" key={month.key} title={`${month.label}: ${month.count} bookings`}>
                    <span className="monthly-bar-value">{month.count || ''}</span>
                    <span
                      className="monthly-bar"
                      style={{ height: `${month.count ? Math.max(8, (month.count / maximumMonthlyCount) * 100) : 2}%` }}
                    />
                    <span className="monthly-bar-label">{month.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="analytics-card" aria-labelledby="status-distribution-title">
          <h3 id="status-distribution-title">Booking status distribution</h3>
          <p>Current workflow statuses in the selected range.</p>
          {filteredBookings.length === 0 ? (
            <p className="analytics-empty">Status distribution will appear when bookings are available.</p>
          ) : (
            <ul className="status-distribution">
              {statuses.map((status) => {
                const count = counts[status];
                const percentage = (count / filteredBookings.length) * 100;
                return (
                  <li key={status}>
                    <span>{status}</span>
                    <div className="status-distribution-track" aria-hidden="true">
                      <span style={{ width: `${percentage}%` }} />
                    </div>
                    <strong>{count}</strong>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className="analytics-card conversion-card" aria-labelledby="conversion-overview-title">
          <h3 id="conversion-overview-title">Lead conversion overview</h3>
          <p className="conversion-status">Not tracked in the current booking schema</p>
          <p>The existing records store enquiry workflow status, but do not distinguish qualified leads, converted leads, or confirmed revenue. No conversion rate is inferred from booking statuses.</p>
        </section>

        <section className="analytics-card" aria-labelledby="recent-bookings-title">
          <h3 id="recent-bookings-title">Recent booking activity</h3>
          <p>Latest activity · {dateRangeDescription.toLowerCase()}</p>
          {recentBookings.length === 0 ? (
            <p className="analytics-empty">No recent booking activity in this date range.</p>
          ) : (
            <ol className="recent-bookings">
              {recentBookings.map((booking, index) => (
                <li key={`${booking.createdAt}-${booking.status}-${index}`}>
                  <span className="recent-booking-index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="recent-booking-status">{booking.status}</span>
                  <time dateTime={booking.createdAt}>{formatDate(booking.createdAt)}</time>
                </li>
              ))}
            </ol>
          )}
        </section>
      </div>

      <p className="analytics-footnote">
        Qualified and converted lead counts are not shown because the current database has no separate fields for those outcomes.
      </p>
    </section>
  );
}
