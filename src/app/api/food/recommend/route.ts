import { NextRequest, NextResponse } from 'next/server';
import { recommendFoods, getQuickSuggestions } from '@/lib/food-recommender';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    const calories = parseFloat(searchParams.get('calories') || '0');
    const protein = parseFloat(searchParams.get('protein') || '0');
    const carbs = parseFloat(searchParams.get('carbs') || '0');
    const fat = parseFloat(searchParams.get('fat') || '0');
    const fiber = parseFloat(searchParams.get('fiber') || '0');
    const mealType = searchParams.get('mealType') as 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' || 'Snack';
    const limit = parseInt(searchParams.get('limit') || '10');

    if (calories <= 0 && protein <= 0 && carbs <= 0 && fat <= 0) {
      return NextResponse.json({ 
        success: true, 
        data: { 
          recommendations: [],
          suggestions: getQuickSuggestions({ calories: 500, protein: 30, carbs: 50, fat: 20, fiber: 10 }, mealType)
        } 
      });
    }

    const budget = { calories, protein, carbs, fat, fiber };
    const recommendations = recommendFoods(budget, mealType, limit);
    const suggestions = getQuickSuggestions(budget, mealType);

    const formattedRecommendations = recommendations.map(rec => ({
      name: rec.food.name,
      calories: rec.food.calories,
      protein: rec.food.protein,
      carbs: rec.food.carbs,
      fiber: rec.food.fiber,
      fat: rec.food.fat,
      category: rec.food.category,
      region: rec.food.region,
      mealType: rec.food.mealType,
      tags: rec.food.tags,
      score: rec.score,
      reason: rec.reason,
    }));

    return NextResponse.json({ 
      success: true, 
      data: { 
        recommendations: formattedRecommendations,
        suggestions 
      } 
    });
  } catch (error: any) {
    console.error('Food recommendation failed:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
