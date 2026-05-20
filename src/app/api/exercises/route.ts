import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getDbPool } from '@/lib/db';

interface Exercise {
  name: string;
  force?: string;
  level?: string;
  mechanic?: string;
  equipment?: string;
  primaryMuscles?: string[];
  secondaryMuscles?: string[];
  instructions?: string[];
  category?: string;
}

let cachedExercises: Exercise[] = [];

function loadExercises(): Exercise[] {
  if (cachedExercises.length > 0) {
    return cachedExercises;
  }

  try {
    const filePath = path.join(process.cwd(), 'src', 'lib', 'exercises.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    cachedExercises = JSON.parse(fileContent);
    return cachedExercises;
  } catch (error) {
    console.error('Failed to load exercises database file:', error);
    return [];
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');
    const connectionString = req.headers.get('x-db-connection-string') || '';

    let exercises = [...loadExercises()];

    // If Postgres is connected, load custom exercises from the database
    if (connectionString) {
      try {
        const pool = await getDbPool(connectionString);
        const result = await pool.query(
          'SELECT name, category, primary_muscles as "primaryMuscles" FROM custom_exercises'
        );
        const customList = result.rows.map(row => ({
          name: row.name,
          category: row.category,
          primaryMuscles: row.primaryMuscles || [],
          equipment: 'custom',
        }));
        exercises = [...customList, ...exercises];
      } catch (err) {
        console.error('Failed to fetch custom exercises from database:', err);
      }
    }

    if (!query || query.trim().length < 2) {
      const popular = ['Bench Press', 'Squat', 'Deadlift', 'Overhead Press', 'Bicep Curl', 'Lunge', 'Pull-up', 'Push-up', 'Plank', 'Lateral Raise'];
      const defaultList = exercises.filter(e => 
        popular.some(pop => e.name.toLowerCase() === pop.toLowerCase())
      );
      const customPrefix = exercises.filter(e => e.equipment === 'custom');
      return NextResponse.json({ success: true, data: [...customPrefix, ...defaultList].slice(0, 15) });
    }

    const searchTerm = query.toLowerCase();
    const filtered = exercises.filter((e) => 
      e.name.toLowerCase().includes(searchTerm) ||
      (e.primaryMuscles && e.primaryMuscles.some(m => m.toLowerCase().includes(searchTerm))) ||
      (e.category && e.category.toLowerCase().includes(searchTerm))
    );

    return NextResponse.json({ success: true, data: filtered.slice(0, 20) });
  } catch (error: any) {
    console.error('Exercise search failed:', error);
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
    const { name, category, primaryMuscles } = body;

    if (!name || !category) {
      return NextResponse.json({ success: false, error: 'Missing exercise name or category' }, { status: 400 });
    }

    const pool = await getDbPool(connectionString);
    const result = await pool.query(
      `INSERT INTO custom_exercises (name, category, primary_muscles)
       VALUES ($1, $2, $3)
       ON CONFLICT (name) DO UPDATE SET category = EXCLUDED.category, primary_muscles = EXCLUDED.primary_muscles
       RETURNING name, category, primary_muscles as "primaryMuscles"`,
      [name, category, primaryMuscles || []]
    );

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    console.error('Failed to create custom exercise:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
