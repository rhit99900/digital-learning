import { supabase } from "./supabase"

export const fetchLessons = async () => {
  const { data } = await supabase.from('lessons')
    .select('*')
    .order('created_at', { ascending: false});
  return data;
}

export const fetchLesson = async (id: string) => {
  const { data } = await supabase
    .from('lessons')
    .select('*')
    .eq('id', id)
    .single();
  
  return data;
}