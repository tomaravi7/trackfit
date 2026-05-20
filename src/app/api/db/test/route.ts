import { NextRequest, NextResponse } from 'next/server';
import { getDbPool } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const connectionString = req.headers.get('x-db-connection-string') || '';
    if (!connectionString) {
      return NextResponse.json(
        { success: false, error: 'Database connection string is required' },
        { status: 400 }
      );
    }

    const pool = await getDbPool(connectionString);
    const client = await pool.connect();
    
    try {
      const res = await client.query('SELECT NOW()');
      return NextResponse.json({
        success: true,
        message: 'Connected successfully!',
        timestamp: res.rows[0].now,
      });
    } finally {
      client.release();
    }
  } catch (error: any) {
    console.error('Database connection test failed:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Connection failed' },
      { status: 500 }
    );
  }
}
