import { indianFoods, IndianFood } from './indian-foods';

export interface FoodRecommendation {
  food: IndianFood;
  score: number;
  reason: string;
}

export interface MacroBudget {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export function recommendFoods(
  budget: MacroBudget,
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack',
  limit: number = 10
): FoodRecommendation[] {
  const scored: FoodRecommendation[] = [];

  for (const food of indianFoods) {
    if (food.mealType !== mealType) continue;
    if (food.calories > budget.calories * 1.2) continue;

    let score = 0;
    const reasons: string[] = [];

    const calorieFit = 1 - Math.abs(food.calories - budget.calories * 0.3) / (budget.calories * 0.3);
    score += Math.max(0, calorieFit) * 30;

    if (budget.protein > 0) {
      const proteinRatio = food.protein / food.calories;
      if (proteinRatio > 0.1) {
        score += 20;
        reasons.push('high-protein');
      }
    }

    if (budget.fiber > 0 && food.fiber >= 4) {
      score += 15;
      reasons.push('high-fiber');
    }

    if (food.fat <= budget.fat * 0.5) {
      score += 10;
    }

    if (food.tags.includes('low-calorie') && budget.calories < 300) {
      score += 15;
      reasons.push('light option');
    }

    if (food.tags.includes('high-protein') && budget.protein > 20) {
      score += 10;
    }

    const macroBalance = (
      (food.protein * 4 + food.carbs * 4 + food.fat * 9) / food.calories
    );
    if (macroBalance >= 0.8 && macroBalance <= 1.2) {
      score += 10;
    }

    if (food.calories <= budget.calories) {
      score += 20;
    } else if (food.calories <= budget.calories * 1.1) {
      score += 10;
    }

    scored.push({
      food,
      score: Math.round(score),
      reason: reasons.length > 0 ? reasons.join(', ') : 'fits your budget',
    });
  }

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, limit);
}

export function getQuickSuggestions(
  budget: MacroBudget,
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack'
): string[] {
  const suggestions: string[] = [];

  if (budget.calories < 100) {
    suggestions.push('Your calorie budget is very low. Consider chaas or coconut water.');
  } else if (budget.calories < 200) {
    suggestions.push('Light options: idli, khichdi, or sprouts salad would fit well.');
  } else if (budget.calories < 400) {
    suggestions.push('Good budget! Try dal tadka with chapati or masala dosa.');
  } else {
    suggestions.push('Plenty of budget left. A full meal with roti, dal, and sabzi would work great.');
  }

  if (budget.protein < 10) {
    suggestions.push('Low on protein budget. Skip high-protein foods or save for tomorrow.');
  } else if (budget.protein > 30) {
    suggestions.push('High protein budget remaining. Add paneer, dal, or chole to hit your goals.');
  }

  if (budget.fat < 5) {
    suggestions.push('Fat budget is tight. Avoid fried snacks and creamy curries.');
  }

  return suggestions;
}
