import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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

    const exercises = loadExercises();

    if (!query || query.trim().length < 2) {
      // Return a set of default popular exercises if query is empty or too short
      const popular = ['Bench Press', 'Squat', 'Deadlift', 'Overhead Press', 'Bicep Curl', 'Lunge', 'Pull-up', 'Push-up', 'Plank', 'Lateral Raise'];
      const defaultList = exercises.filter(e => 
        popular.some(pop => e.name.toLowerCase() === pop.toLowerCase())
      );
      return NextResponse.json({ success: true, data: defaultList.slice(0, 10) });
    }

    const searchTerm = query.toLowerCase();
    const filtered = exercises.filter((e) => 
      e.name.toLowerCase().includes(searchTerm) ||
      (e.primaryMuscles && e.primaryMuscles.some(m => m.toLowerCase().includes(searchTerm))) ||
      (e.category && e.category.toLowerCase().includes(searchTerm))
    );

    // Limit to 20 results for performance
    return NextResponse.json({ success: true, data: filtered.slice(0, 20) });
  } catch (error: any) {
    console.error('Exercise search failed:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
