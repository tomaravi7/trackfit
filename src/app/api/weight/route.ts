import { NextRequest, NextResponse } from 'next/server';
import { getDbPool } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const connectionString = req.headers.get('x-db-connection-string') || '';
    if (!connectionString) {
      return NextResponse.json({ success: false, error: 'Database connection missing' }, { status: 400 });
    }

    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date'); // optional: fetch single date if passed, otherwise fetch all for trend chart

    const pool = await getDbPool(connectionString);
    let result;

    if (date) {
      result = await pool.query(
        'SELECT id, date::text, weight::float FROM weight_logs WHERE date = $1',
        [date]
      );
    } else {
      result = await pool.query(
        'SELECT id, date::text, weight::float FROM weight_logs ORDER BY date ASC LIMIT 30'
      );
    }

    return NextResponse.json({ success: true, data: result.rows });
  } catch (error: any) {
    console.error('Failed to fetch weight logs:', error);
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
    const { date, weight } = body;

    if (!date || weight === undefined) {
      return NextResponse.json({ success: false, error: 'Missing date or weight' }, { status: 400 });
    }

    const pool = await getDbPool(connectionString);
    const result = await pool.query(
      `INSERT INTO weight_logs (date, weight) VALUES ($1, $2)
       ON CONFLICT (date) DO UPDATE SET weight = EXCLUDED.weight
       RETURNING id, date::text, weight::float`,
      [date, weight]
    );

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    console.error('Failed to log weight:', error);
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
    await pool.query('DELETE FROM weight_logs WHERE id = $1', [id]);

    return NextResponse.json({ success: true, message: 'Weight entry deleted' });
  } catch (error: any) {
    console.error('Failed to delete weight log:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
