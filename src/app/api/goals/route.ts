import { NextRequest, NextResponse } from 'next/server';
import { getDbPool } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const connectionString = req.headers.get('x-db-connection-string') || '';
    if (!connectionString) {
      return NextResponse.json({ success: false, error: 'Database connection missing' }, { status: 400 });
    }

    const pool = await getDbPool(connectionString);
    const result = await pool.query(
      'SELECT calories, protein, carbs, fiber, fat FROM user_goals ORDER BY updated_at DESC LIMIT 1'
    );

    if (result.rows.length === 0) {
      // Fallback default goals if for some reason database doesn't have it
      return NextResponse.json({
        success: true,
        data: { calories: 2000, protein: 130, carbs: 220, fiber: 30, fat: 65 }
      });
    }

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    console.error('Failed to fetch goals:', error);
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
    const { calories, protein, carbs, fiber, fat } = body;

    if (calories === undefined || protein === undefined || carbs === undefined || fiber === undefined || fat === undefined) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const pool = await getDbPool(connectionString);
    
    // Check if goal exists first
    const checkResult = await pool.query('SELECT id FROM user_goals ORDER BY id ASC LIMIT 1');
    
    let result;
    if (checkResult.rows.length > 0) {
      const id = checkResult.rows[0].id;
      result = await pool.query(
        'UPDATE user_goals SET calories = $1, protein = $2, carbs = $3, fiber = $4, fat = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING calories, protein, carbs, fiber, fat',
        [calories, protein, carbs, fiber, fat, id]
      );
    } else {
      result = await pool.query(
        'INSERT INTO user_goals (calories, protein, carbs, fiber, fat) VALUES ($1, $2, $3, $4, $5) RETURNING calories, protein, carbs, fiber, fat',
        [calories, protein, carbs, fiber, fat]
      );
    }

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    console.error('Failed to update goals:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
