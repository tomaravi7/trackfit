import { NextRequest, NextResponse } from 'next/server';
import { getDbPool } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const connectionString = req.headers.get('x-db-connection-string') || '';
    if (!connectionString) {
      return NextResponse.json({ success: false, error: 'Database connection missing' }, { status: 400 });
    }

    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date');
    const summary = searchParams.get('summary') === 'true';

    const pool = await getDbPool(connectionString);
    
    if (summary) {
      // Fetch daily aggregates for the last 30 days to build trend charts
      const result = await pool.query(
        `SELECT date::text, SUM(amount_ml)::int as "amount"
         FROM water_logs
         GROUP BY date
         ORDER BY date ASC
         LIMIT 30`
      );
      return NextResponse.json({ success: true, data: result.rows });
    }

    if (!date) {
      return NextResponse.json({ success: false, error: 'Missing date or summary parameter' }, { status: 400 });
    }

    // Fetch individual water logs for a specific date
    const result = await pool.query(
      'SELECT id, date::text, amount_ml as "amount" FROM water_logs WHERE date = $1 ORDER BY created_at ASC',
      [date]
    );

    return NextResponse.json({ success: true, data: result.rows });
  } catch (error: any) {
    console.error('Failed to fetch water logs:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const connectionString = req.headers.get('x-db-connection-string') || '';
    if (!connectionString) {
      return NextResponse.json({ success: false, error: 'Database connection missing' }, { status: 400 });
    }

    const body = await req.json();
    const { date, amount } = body; // amount is in ml (e.g. 250, 500)

    if (!date || amount === undefined) {
      return NextResponse.json({ success: false, error: 'Missing date or amount' }, { status: 400 });
    }

    const pool = await getDbPool(connectionString);
    const result = await pool.query(
      'INSERT INTO water_logs (date, amount_ml) VALUES ($1, $2) RETURNING id, date::text, amount_ml as "amount"',
      [date, amount]
    );

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    console.error('Failed to log water intake:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const connectionString = req.headers.get('x-db-connection-string') || '';
    if (!connectionString) {
      return NextResponse.json({ success: false, error: 'Database connection missing' }, { status: 400 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID query parameter is required' }, { status: 400 });
    }

    const pool = await getDbPool(connectionString);
    await pool.query('DELETE FROM water_logs WHERE id = $1', [id]);

    return NextResponse.json({ success: true, message: 'Water entry deleted successfully' });
  } catch (error: any) {
    console.error('Failed to delete water log:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
