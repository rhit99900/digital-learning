import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function generateLesson(lesson: string) {
  await fetch('/api/generate', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json'        
    },
    body: JSON.stringify({ lesson })
  });
}

export interface StreamCallbacks {
  onStep?: (step: string, data?:any) => void;
  onToken?: (token: string) => void;
  onError?: (message: string) => void;
  onDone?: () => void;
}

export async function streamLessonGeneration(lesson: string, callbacks: StreamCallbacks) {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lesson }),
  });

  if(!res.ok || !res.body) {
    callbacks.onError?.(`Failed to generate lesson ${res.statusText}`);
    return;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      // Process each SSE event block as they come
      let boundary;
      while ((boundary = buffer.indexOf("\n\n")) >= 0) {
        const chunk = buffer.slice(0, boundary);
        buffer = buffer.slice(boundary + 2); // Remove processed block

        const lines = chunk.split("\n");
        let event: string | null = null;
        let data: any = null;

        for (const line of lines) {
          if (line.startsWith("event:")) {
            event = line.replace("event:", "").trim();
          } else if (line.startsWith("data:")) {
            try {
              data = JSON.parse(line.replace("data:", "").trim());
            } catch {
              data = line.replace("data:", "").trim();
            }
          }
        }

        if (event && data) {
          // TODO: Debug
          // console.log(event,data);
          switch (event) {
            case "step":
              callbacks.onStep?.(data.status, data);
              break;
            case "token":
              callbacks.onToken?.(data.token);
              break;
            case "error":
              callbacks.onError?.(data.message);
              break;
            case "done":
              callbacks.onDone?.();
              break;
          }
        }
      }
    }
  } catch (err: any) {    
    callbacks.onError?.(err.message || "Stream error");
  }
}

// This check can be removed, it is just for tutorial purposes
export const hasEnvVars =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
