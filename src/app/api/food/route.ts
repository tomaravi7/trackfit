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
      `SELECT id, date::text, food_name as "foodName", quantity::float, calories::float,
       protein::float, carbs::float, fiber::float, fat::float, meal_type as "mealType",
       serving_unit as "servingUnit",
       created_at as "createdAt"
       FROM food_logs WHERE date = $1 ORDER BY created_at ASC`,
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
    const { date, foodName, quantity, calories, protein, carbs, fiber, fat, mealType, servingUnit } = body;

    if (!date || !foodName || quantity === undefined || calories === undefined || protein === undefined || carbs === undefined || fiber === undefined || fat === undefined || !mealType) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const pool = await getDbPool(connectionString);
    const result = await pool.query(
      `INSERT INTO food_logs (date, food_name, quantity, calories, protein, carbs, fiber, fat, meal_type, serving_unit)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING id, date::text, food_name as "foodName", quantity::float, calories::float,
       protein::float, carbs::float, fiber::float, fat::float, meal_type as "mealType",
       serving_unit as "servingUnit", created_at as "createdAt"`,
      [date, foodName, quantity, calories, protein, carbs, fiber, fat, mealType, servingUnit || 'g']
    );

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    console.error('Failed to save food log:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const connectionString = req.headers.get('x-db-connection-string') || '';
    if (!connectionString) {
      return NextResponse.json({ success: false, error: 'Database connection missing' }, { status: 400 });
    }

    const body = await req.json();
    const { id, foodName, quantity, calories, protein, carbs, fiber, fat, mealType, servingUnit } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing food log ID' }, { status: 400 });
    }

    const pool = await getDbPool(connectionString);

    // Check that the entry is within 6 hours of creation
    const ageCheck = await pool.query(
      `SELECT id, created_at, EXTRACT(EPOCH FROM (NOW() - created_at))/3600 as hours_since
       FROM food_logs WHERE id = $1`,
      [id]
    );

    if (ageCheck.rows.length === 0) {
      return NextResponse.json({ success: false, error: 'Food log entry not found' }, { status: 404 });
    }

    const hoursSince = parseFloat(ageCheck.rows[0].hours_since);
    if (hoursSince > 6) {
      return NextResponse.json({
        success: false,
        error: `This entry was logged ${Math.round(hoursSince)} hours ago. Editing is only allowed within 6 hours of logging.`,
        editLocked: true
      }, { status: 403 });
    }

    const result = await pool.query(
      `UPDATE food_logs
       SET food_name = COALESCE($2, food_name),
           quantity = COALESCE($3, quantity),
           calories = COALESCE($4, calories),
           protein = COALESCE($5, protein),
           carbs = COALESCE($6, carbs),
           fiber = COALESCE($7, fiber),
           fat = COALESCE($8, fat),
           meal_type = COALESCE($9, meal_type),
           serving_unit = COALESCE($10, serving_unit)
       WHERE id = $1
       RETURNING id, date::text, food_name as "foodName", quantity::float, calories::float,
       protein::float, carbs::float, fiber::float, fat::float, meal_type as "mealType",
       serving_unit as "servingUnit", created_at as "createdAt"`,
      [id, foodName, quantity, calories, protein, carbs, fiber, fat, mealType, servingUnit]
    );

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    console.error('Failed to update food log:', error);
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
