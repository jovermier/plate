import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';

export async function POST(req: NextRequest) {
  const {
    apiKey: key,
    system,
    model = 'gpt-4o-mini',
    prompt,
  } = await req.json();

  const apiKey = key || process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Missing OpenAI API key.' },
      { status: 401 }
    );
  }

  const openai = createOpenAI({ apiKey });

  try {
    const result = await generateText({
      system,
      temperature: 0.7,
      abortSignal: req.signal,
      maxTokens: 50,
      model: openai(model),
      prompt: prompt,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return NextResponse.json(null, { status: 408 });
    }

    return NextResponse.json(
      { error: 'Failed to process AI request' },
      { status: 500 }
    );
  }
}
