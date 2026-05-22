import { NextRequest, NextResponse } from 'next/server';
import { searchIndianFoods, IndianFood } from '@/lib/indian-foods';

interface OFFProduct {
  product_name?: string;
  product_name_en?: string;
  brands?: string;
  image_front_thumb_url?: string;
  nutriments?: {
    'energy-kcal_100g'?: number;
    'energy-kcal'?: number;
    energy_100g?: number;
    proteins_100g?: number;
    carbohydrates_100g?: number;
    fiber_100g?: number;
    fat_100g?: number;
  };
}

function formatIndianFood(food: IndianFood) {
  return {
    name: food.name,
    image: null,
    calories: food.calories,
    protein: food.protein,
    carbs: food.carbs,
    fiber: food.fiber,
    fat: food.fat,
    category: food.category,
    region: food.region,
    mealType: food.mealType,
    servingSize: food.servingSize,
    tags: food.tags,
    source: 'indian-database',
  };
}

function formatOFFProduct(p: OFFProduct) {
  const name = p.product_name || p.product_name_en || 'Unknown Food';
  const brandName = p.brands ? ` (${p.brands})` : '';
  const fullName = `${name}${brandName}`;

  const nutriments = p.nutriments || {};
  
  let calories = 0;
  if (nutriments['energy-kcal_100g'] !== undefined) {
    calories = nutriments['energy-kcal_100g'];
  } else if (nutriments['energy-kcal'] !== undefined) {
    calories = nutriments['energy-kcal'];
  } else if (nutriments.energy_100g !== undefined) {
    calories = Math.round(nutriments.energy_100g / 4.184);
  }

  const protein = nutriments.proteins_100g || 0;
  const carbs = nutriments.carbohydrates_100g || 0;
  const fiber = nutriments.fiber_100g || 0;
  const fat = nutriments.fat_100g || 0;

  return {
    name: fullName,
    image: p.image_front_thumb_url || null,
    calories: Math.round(calories * 10) / 10,
    protein: Math.round(protein * 10) / 10,
    carbs: Math.round(carbs * 10) / 10,
    fiber: Math.round(fiber * 10) / 10,
    fat: Math.round(fat * 10) / 10,
    source: 'open-food-facts',
  };
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ success: true, data: [] });
    }

    const indianResults = searchIndianFoods(query);
    const formattedIndian = indianResults.map(formatIndianFood);

    const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
      query
    )}&search_simple=1&action=process&json=1&page_size=20`;

    let offResults: any[] = [];
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);
    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'TrackFit - WebApp - Version 1.0',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const products: OFFProduct[] = data.products || [];
        offResults = products
          .filter((p) => p.product_name || p.product_name_en)
          .map(formatOFFProduct);
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.warn('Open Food Facts search timed out');
      } else {
        console.error('Open Food Facts search failed:', err);
      }
    } finally {
      clearTimeout(timeoutId);
    }

    const indianNames = new Set(formattedIndian.map(f => f.name.toLowerCase()));
    const uniqueOFF = offResults.filter(f => !indianNames.has(f.name.toLowerCase()));

    const combined = [...formattedIndian, ...uniqueOFF];

    return NextResponse.json({ success: true, data: combined });
  } catch (error: any) {
    console.error('Food search failed:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
