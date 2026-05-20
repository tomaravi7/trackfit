import { NextRequest, NextResponse } from 'next/server';
import { getDbPool } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const connectionString = req.headers.get('x-db-connection-string') || '';
    if (!connectionString) {
      return NextResponse.json({ success: false, error: 'Database connection missing' }, { status: 400 });
    }

    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    if (!startDate || !endDate) {
      return NextResponse.json({ success: false, error: 'startDate and endDate parameters are required' }, { status: 400 });
    }

    const pool = await getDbPool(connectionString);
    
    // We execute a full query merging food logs, water logs, and workout sets by date
    const query = `
      SELECT 
        d.date::text as date,
        COALESCE(f.calories, 0)::float as calories,
        COALESCE(w.amount, 0)::float as water,
        COALESCE(wk.sets, 0)::integer as workout_sets,
        s.duration_minutes as "sessionDuration",
        s.energy_level as "sessionEnergy"
      FROM (
        SELECT DISTINCT date FROM food_logs WHERE date BETWEEN $1::date AND $2::date
        UNION
        SELECT DISTINCT date FROM water_logs WHERE date BETWEEN $1::date AND $2::date
        UNION
        SELECT DISTINCT date FROM workouts WHERE date BETWEEN $1::date AND $2::date
        UNION
        SELECT DISTINCT date FROM workout_sessions WHERE date BETWEEN $1::date AND $2::date
      ) d
      LEFT JOIN (
        SELECT date, SUM(calories) as calories FROM food_logs GROUP BY date
      ) f ON d.date = f.date
      LEFT JOIN (
        SELECT date, SUM(amount_ml) as amount FROM water_logs GROUP BY date
      ) w ON d.date = w.date
      LEFT JOIN (
        SELECT date, COUNT(*) as sets FROM workouts GROUP BY date
      ) wk ON d.date = wk.date
      LEFT JOIN workout_sessions s ON d.date = s.date
      ORDER BY d.date ASC
    `;

    const result = await pool.query(query, [startDate, endDate]);
    return NextResponse.json({ success: true, data: result.rows });
  } catch (error: any) {
    console.error('Failed to fetch consistency data:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
