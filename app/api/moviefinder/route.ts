"use server";

import { NextResponse } from 'next/server';
import {openai} from "@/lib/openai";

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'Write only 3 movies don\'t give date only 3 movies name' },
                { role: 'user', content: prompt },
            ],
        });


        return NextResponse.json({
            movie : response.choices[0].message.content
        });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
