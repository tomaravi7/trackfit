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
      // Get all sessions for insights charts
      const result = await pool.query(
        'SELECT date::text, duration_minutes as "duration", energy_level as "energy", notes FROM workout_sessions ORDER BY date ASC'
      );
      return NextResponse.json({ success: true, data: result.rows });
    }

    if (!date) {
      return NextResponse.json({ success: false, error: 'Missing date parameter' }, { status: 400 });
    }

    const result = await pool.query(
      'SELECT id, date::text, duration_minutes as "duration", energy_level as "energy", notes FROM workout_sessions WHERE date = $1',
      [date]
    );

    return NextResponse.json({ success: true, data: result.rows[0] || null });
  } catch (error: any) {
    console.error('Failed to fetch workout session:', error);
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
    const { date, duration, energy, notes } = body;

    if (!date || duration === undefined || energy === undefined) {
      return NextResponse.json({ success: false, error: 'Missing date, duration or energy level' }, { status: 400 });
    }

    const pool = await getDbPool(connectionString);
    const result = await pool.query(
      `INSERT INTO workout_sessions (date, duration_minutes, energy_level, notes)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (date) DO UPDATE SET 
         duration_minutes = EXCLUDED.duration_minutes,
         energy_level = EXCLUDED.energy_level,
         notes = EXCLUDED.notes
       RETURNING id, date::text, duration_minutes as "duration", energy_level as "energy", notes`,
      [date, duration, energy, notes || '']
    );

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    console.error('Failed to log workout session:', error);
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
    await pool.query('DELETE FROM workout_sessions WHERE id = $1', [id]);

    return NextResponse.json({ success: true, message: 'Workout session deleted successfully' });
  } catch (error: any) {
    console.error('Failed to delete workout session:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
