import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
)

export const subscribe = (callback: () => void) => {
  const channel = supabase.channel('realtime-lessons')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'lessons'    
    }, 
    (payload) => {
      callback();
    }
  )
  .subscribe();    
  return channel;
}

export const unsubscribe = (channel:any) => {
  return supabase.removeChannel(channel);
}