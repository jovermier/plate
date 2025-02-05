import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { createOpenAI } from '@ai-sdk/openai';
import { convertToCoreMessages, streamText } from 'ai';

export async function POST(req: NextRequest) {
  const {
    apiKey: key,
    messages,
    system,
    model = 'gpt-4o-mini',
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
    const result = await streamText({
      messages: convertToCoreMessages(messages),
      system: system,
      maxTokens: 2048,
      model: openai(model),
    });

    return result.toDataStreamResponse();
  } catch {
    return NextResponse.json(
      { error: 'Failed to process AI request' },
      { status: 500 }
    );
  }
}
