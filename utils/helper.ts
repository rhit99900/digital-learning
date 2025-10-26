import { format } from "date-fns";
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

export const deleteLesson = async (id: string) => {
  const { error } = await supabase.from("lessons").delete().eq("id", id);
  if(error) {
    throw new Error(`Failed to delete lesson ID: ${id}`);
  } else {
    return true;
  }
}

export const formatDate = (data: Date) => {
  try {
    return format(new Date(data), 'dd MMM hh:mm aa');
  } catch(e) {
    return '';
  }
}