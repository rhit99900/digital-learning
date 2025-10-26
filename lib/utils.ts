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

// This check can be removed, it is just for tutorial purposes
export const hasEnvVars =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
