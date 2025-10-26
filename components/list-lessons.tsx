'use client';

import { fetchLessons } from "@/utils/helper";
import { unsubscribe, subscribe } from "@/utils/supabase";
import { useEffect, useState } from "react";
import LessonItem from './lesson-item';
import { LessonsType } from "@/lib/types";
import { Button } from "./ui/button";

const LessonListings = () => {

  const [ lessons, setLessons ] = useState<LessonsType[]>();
  const [ page, setPage ] = useState<number>(3);
  const [ count, setCount ] = useState<number>(0);

  useEffect(() => {
    getLessons();
    const channel = subscribe(() => {
      console.log("Trigger database change");
      getLessons();
    })
    return () => {
      unsubscribe(channel)
    }
  }, [])

  const getLessons = async () => {    
    const data = await fetchLessons();
    setLessons(data || []);
    setCount(data?.length || 0);
  }
  
  const loadMore = () => {
    setPage((prev) => prev + 3);
  }
  
  const showLess = () => {
    setPage((prev) => prev - 3);
  }

  return (
    <main className="w-full flex flex-col gap-2">
      {lessons?.slice(0,page)?.map(l => (
        <LessonItem key={l.id} lesson={l}/>
      ))}
      <p className="text-sm text-center">Showing {page} of {count} lessons</p>      
      { page >= count ? (
        <Button variant="outline" className="w-[200px]" onClick={showLess}>Show Less</Button>
      ): (
        <Button variant="outline" className="w-[200px]" onClick={loadMore}>Load More</Button>
      )}
      
    </main>
  )
}

export default LessonListings;