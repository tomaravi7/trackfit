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
    const exercise = searchParams.get('exercise');
    const all = searchParams.get('all') === 'true';

    const pool = await getDbPool(connectionString);
    let result;

    if (date) {
      result = await pool.query(
        'SELECT id, date::text, exercise_name as "exerciseName", weight::float, reps, set_number as "setNumber" FROM workouts WHERE date = $1 ORDER BY created_at ASC',
        [date]
      );
    } else if (exercise) {
      result = await pool.query(
        'SELECT id, date::text, exercise_name as "exerciseName", weight::float, reps, set_number as "setNumber" FROM workouts WHERE LOWER(exercise_name) = LOWER($1) ORDER BY date ASC, set_number ASC',
        [exercise]
      );
    } else if (all) {
      result = await pool.query(
        'SELECT id, date::text, exercise_name as "exerciseName", weight::float, reps, set_number as "setNumber" FROM workouts ORDER BY date ASC, set_number ASC'
      );
    } else {
      return NextResponse.json({ success: false, error: 'Date, exercise or all query parameter is required' }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: result.rows });
  } catch (error: any) {
    console.error('Failed to fetch workouts:', error);
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
    const { date, exerciseName, weight, reps, setNumber } = body;

    if (!date || !exerciseName || weight === undefined || reps === undefined || setNumber === undefined) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const pool = await getDbPool(connectionString);
    const result = await pool.query(
      'INSERT INTO workouts (date, exercise_name, weight, reps, set_number) VALUES ($1, $2, $3, $4, $5) RETURNING id, date::text, exercise_name as "exerciseName", weight::float, reps, set_number as "setNumber"',
      [date, exerciseName, weight, reps, setNumber]
    );

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    console.error('Failed to save workout set:', error);
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
    await pool.query('DELETE FROM workouts WHERE id = $1', [id]);

    return NextResponse.json({ success: true, message: 'Set deleted successfully' });
  } catch (error: any) {
    console.error('Failed to delete set:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
