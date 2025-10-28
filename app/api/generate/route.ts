import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

const openai = new OpenAI({apiKey: process.env.OPEN_AI_API_KEY!});

function serverEvent (name: string, data: unknown) {
  return `event: ${name}\ndata: ${JSON.stringify(data)}\n\n`;
}

const model = 'gpt-5';

export async function POST(req: NextRequest){
  const { lesson } = await req.json();  

  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();

  (async() => {
    const write = (chunk: string) => writer.write(new TextEncoder().encode(chunk));
    const end = () => writer.close();

    try {
      // Step 1: Recieved Input
      await write(serverEvent("step", { status: 'Input Recived', lesson}));
    
      // Step 2: Creating lesson entry in database
      await write(serverEvent("step", { status: 'Inserting Lesson', lesson}));
      const { data, error } = await supabase
        .from('lessons')
        .insert([{ lesson }])
        .select()
        .single()

      if(error) {
        await write(serverEvent('error', { message: error.message}));
        return end();
      }

      // Step 3: Lesson Inserted
      await write(serverEvent("step", { status: 'Lesson Inserted', lesson}));

      // const imagePrompt = `Generate illustration for the lesson ${lesson}. Illustration should be in flat infographic style.`;

      // const images = await openai.images.generate({
      //   model: "gpt-image-1",
      //   prompt: imagePrompt,
      //   size: "1024x1024",
      //   n: 1
      // });

      // const base64 = images?.data?.[0]?.b64_json;
      // let image = `data:image/png;base64,${base64}`;

      // Step 4: Creating images for lesson.
      // await write(serverEvent("step", { status: `Generating media for the lesson with promt ${imagePrompt}`, lesson}));
      // Use this image ${image} inside the component as a header.

      const systemPrompt = `
        Generate a valid TypeScript React component that can run without import statements.
        Assume that React and all its hooks (useState, useEffect, useRef, etc.) are available as globals.
        Do not include 'import' or 'export' lines for React.
        The component must use 'export default function <Name>()' for the main component.
        The output code should not have markdown code formatter like "\`\`\`typescript". 
        The lesson generated should also have interactive lessons with state management within the generated function for the code.
        The lessons should be a page long with detailed definitions within the code, steps, if needed. Imaging the lesson is being taught to a 5 year old kid.
        Important: The output should not have anything that's not the React Component.
        The output code should not have <pre> or <code> tags.
      `;

      // Step 5: Generating user prompt.
      await write(serverEvent("step", { status: `Generating system prompt`, systemPrompt }));

      const prompt = `Generate a TypeScript React component using TailwindCSS to teach the lesson: ${lesson}`;
      // Step 6: Generating user prompt.

      await write(serverEvent("step", { status: `Generating user prompt ${prompt}`, lesson }));
      // Step 7: Initiating API request to OpenAI      

      await write(serverEvent("step", { status: `Calling OpenAI Model: \`${model}\``, model: model}));
      const response = await openai.chat.completions.create({
        model: model,
        stream: true,
        messages: [{
          role: 'system',
          content: systemPrompt
        }, {
          role: 'user', content: prompt
        }]
      });      

      let generatedCode = '';
      for await (const part of response) {
        // console.log(part.choices?.[0]?.delta);
        const token = part.choices?.[0]?.delta?.content ?? "";
        if (token) {
          generatedCode += token;          
        }
      }

      await write(serverEvent('step', { status: "Code generation completed by Model" }));
      await write(serverEvent('step', { status: "Updating Lesson Content in Database" }));

      const { data: update, error: updateError } = await supabase
        .from('lessons')
        .update({status: 'generated', generated_code: generatedCode })
        .eq('id', data.id);      

      if(updateError) {
        await write(serverEvent('error', {message: updateError.message}));
      }
      // @ts-ignore
      await write(serverEvent('step', { status: "Generation Completed", id: update?.id }));
      // @ts-ignore
      await write(serverEvent('done', { status: "Completed", id: update?.id }));
      end();
    } catch(e) {
      // @ts-ignore
      await writer.write(new TextEncoder().encode(serverEvent("error", { message: e?.message })));
      writer.close();
    }
  })();

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive'
    }
  });
}