import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

const openai = new OpenAI({apiKey: process.env.OPEN_AI_API_KEY!});

export async function POST(req: NextRequest){
  const { lesson } = await req.json();  

  const { data, error } = await supabase
    .from('lessons')
    .insert([{ lesson }])
    .select()
    .single()

  if(error) return NextResponse.json({error}, {status: 500});

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{
      role: 'system',
      content: `
        Generate a valid typescript code for a lesson component.
        The output should only have code and nothing else. 
        The output should also exclude import statements, such as import React.
        Component declaration must always be of the format \`export default function <ComponentName>\` and must not have any other export statements aside of this.
        The output code should not have markdown code formatter like "\`\`\`typescript".
        The output code should not have <pre> or <code> tags.
      `,
    }, {
      role: 'user', content: `Generate a typescript react component, using tailwindcss, images teaching a lesson for: ${lesson}`
    }]
  });

  const generatedCode = response.choices[0].message.content;

  await supabase
    .from('lessons')
    .update({status: 'generated', generated_code: generatedCode })
    .eq('id', data.id);

  return NextResponse.json(data);
}