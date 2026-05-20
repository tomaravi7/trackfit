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

    if (!date) {
      return NextResponse.json({ success: false, error: 'Date query parameter is required' }, { status: 400 });
    }

    const pool = await getDbPool(connectionString);
    const result = await pool.query(
      'SELECT id, date::text, food_name as "foodName", quantity::float, calories::float, protein::float, carbs::float, fiber::float, fat::float, meal_type as "mealType" FROM food_logs WHERE date = $1 ORDER BY created_at ASC',
      [date]
    );

    return NextResponse.json({ success: true, data: result.rows });
  } catch (error: any) {
    console.error('Failed to fetch food logs:', error);
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
    const { date, foodName, quantity, calories, protein, carbs, fiber, fat, mealType } = body;

    if (!date || !foodName || quantity === undefined || calories === undefined || protein === undefined || carbs === undefined || fiber === undefined || fat === undefined || !mealType) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const pool = await getDbPool(connectionString);
    const result = await pool.query(
      'INSERT INTO food_logs (date, food_name, quantity, calories, protein, carbs, fiber, fat, meal_type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id, date::text, food_name as "foodName", quantity::float, calories::float, protein::float, carbs::float, fiber::float, fat::float, meal_type as "mealType"',
      [date, foodName, quantity, calories, protein, carbs, fiber, fat, mealType]
    );

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    console.error('Failed to save food log:', error);
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
    await pool.query('DELETE FROM food_logs WHERE id = $1', [id]);

    return NextResponse.json({ success: true, message: 'Food log deleted successfully' });
  } catch (error: any) {
    console.error('Failed to delete food log:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
