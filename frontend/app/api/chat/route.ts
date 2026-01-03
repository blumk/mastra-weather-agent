import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const apiUrl = process.env.MASTRA_API_URL || 'http://localhost:4111';

  const response = await fetch(`${apiUrl}/api/agents/weather-agent/stream`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    return new Response('Failed to get response from agent', { status: 500 });
  }

  // Create a TransformStream to process the SSE stream
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const transformStream = new TransformStream({
    async transform(chunk, controller) {
      const text = decoder.decode(chunk);
      const lines = text.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          // Parse SSE data line
          try {
            const jsonStr = line.slice(6).trim();
            if (jsonStr) {
              const data = JSON.parse(jsonStr);
              // Extract text from text-delta events
              if (data.type === 'text-delta' && data.payload?.text) {
                controller.enqueue(encoder.encode(data.payload.text));
              }
            }
          } catch {
            // Skip malformed lines
          }
        }
      }
    },
  });

  return new Response(response.body?.pipeThrough(transformStream), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
    },
  });
}
