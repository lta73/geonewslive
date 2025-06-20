// app/api/generate/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getTranscript } from '@/lib/youtube';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const { keyword } = await req.json();

  try {
    const transcript = await getTranscript();
    const sentences = transcript.split('.').filter(s => s.toLowerCase().includes(keyword.toLowerCase()));

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = `You are a geopolitical blogger. Based on the topic '${keyword}', write a 400-word blog article using the quotes below. Structure: intro, main points, conclusion.

Quotes:
${sentences.slice(0, 12).join('\n')}`;

    const result = await model.generateContent(prompt);
    const html = result.response.text().replace(/\n/g, '<br>');

    return NextResponse.json({ html });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
