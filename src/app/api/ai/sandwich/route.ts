import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const apiKey = req.headers.get('x-openai-key') || process.env.OPENAI_API_KEY || '';
    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: 'No OpenAI API key provided. Add your key in Settings.',
        needsKey: true
      }, { status: 400 });
    }

    const body = await req.json();
    const { item, itemMacros, remainingBudget, dailyGoals, dailyConsumed } = body;

    const prompt = `You are a precise nutrition coach. A user is deciding whether to eat the following:

ITEM: "${item.name}"
Item macros: ${item.calories} kcal, ${item.protein}g protein, ${item.carbs}g carbs, ${item.fat}g fat, ${item.fiber}g fiber

Their remaining daily budget (after what they've already eaten today):
- Calories: ${remainingBudget.calories} kcal remaining of ${dailyGoals.calories} kcal goal
- Protein: ${remainingBudget.protein}g remaining of ${dailyGoals.protein}g goal
- Carbs: ${remainingBudget.carbs}g remaining of ${dailyGoals.carbs}g goal
- Fat: ${remainingBudget.fat}g remaining of ${dailyGoals.fat}g goal
- Fiber: ${remainingBudget.fiber}g remaining of ${dailyGoals.fiber}g goal

Already consumed today: ${dailyConsumed.calories} kcal, ${dailyConsumed.protein}g protein, ${dailyConsumed.carbs}g carbs, ${dailyConsumed.fat}g fat

Give a short, direct, practical recommendation (2-3 sentences max). Be conversational and encouraging. Rate it as one of: "Go for it!", "Maybe half?", "Consider alternatives", or "Skip it". Format your response as JSON with fields: verdict (string, one of the 4 options above), reasoning (string, 2-3 sentences), tip (string, one actionable tip like a healthier alternative or portion suggestion).`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a helpful nutrition coach. Always respond with valid JSON only, no markdown.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      if (response.status === 401) {
        return NextResponse.json({ success: false, error: 'Invalid OpenAI API key. Check your key in Settings.', needsKey: true }, { status: 401 });
      }
      return NextResponse.json({ success: false, error: errData?.error?.message || 'OpenAI API error' }, { status: 500 });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content?.trim() || '';

    let parsed: any;
    try {
      parsed = JSON.parse(content);
    } catch {
      // Try to extract JSON from content
      const match = content.match(/\{[\s\S]*\}/);
      parsed = match ? JSON.parse(match[0]) : { verdict: 'Consider alternatives', reasoning: content, tip: '' };
    }

    return NextResponse.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('AI sandwich route error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
