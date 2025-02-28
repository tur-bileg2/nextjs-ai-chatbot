import { NextResponse } from 'next/server';

// Remove edge runtime directive which is causing issues with postgres dependencies
// export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    // Simple auth check without database dependency
    // We'll just check for the presence of a request body
    const body = await req.json();
    const { text } = body;
    
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    // Just return success - actual TTS will be done client-side
    return NextResponse.json({ 
      success: true,
      message: 'TTS request received. Speech synthesis should be handled by the client browser.',
      text
    });
  } catch (error) {
    console.error('TTS error:', error);
    return NextResponse.json(
      { error: 'Failed to process text-to-speech request' },
      { status: 500 }
    );
  }
}
