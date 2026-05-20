import { NextRequest, NextResponse } from 'next/server';

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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ success: true, data: [] });
    }

    // Call Open Food Facts search endpoint (CORS-friendly search, but done on server for cleanliness)
    const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
      query
    )}&search_simple=1&action=process&json=1&page_size=20`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'TrackFit - WebApp - Version 1.0',
      },
    });

    if (!response.ok) {
      throw new Error(`Open Food Facts API responded with status ${response.status}`);
    }

    const data = await response.json();
    const products: OFFProduct[] = data.products || [];

    const formattedFoods = products
      .filter((p) => p.product_name || p.product_name_en)
      .map((p) => {
        const name = p.product_name || p.product_name_en || 'Unknown Food';
        const brandName = p.brands ? ` (${p.brands})` : '';
        const fullName = `${name}${brandName}`;

        const nutriments = p.nutriments || {};
        
        // Extract calories per 100g: try energy-kcal first, then fallbacks
        let calories = 0;
        if (nutriments['energy-kcal_100g'] !== undefined) {
          calories = nutriments['energy-kcal_100g'];
        } else if (nutriments['energy-kcal'] !== undefined) {
          calories = nutriments['energy-kcal'];
        } else if (nutriments.energy_100g !== undefined) {
          // Convert kJ to kcal
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
        };
      });

    return NextResponse.json({ success: true, data: formattedFoods });
  } catch (error: any) {
    console.error('Open Food Facts search failed:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
