'use client';

import { fetchLessons } from "@/utils/helper";
import { unsubscribe, subscribe } from "@/utils/supabase";
import { useEffect, useState } from "react";
import LessonItem from './lesson-item';
import { LessonsType } from "@/lib/types";
import { Button } from "./ui/button";
import { LessonSuggestion, SUGGESTIONS } from "@/lib/config";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { useAppDispatch, useAppSelector } from "@/utils/state/hooks";
import { setLessonInput, setLessons } from "@/utils/state/slices/lessons";
import { RootState } from "@/utils/state/store";

const LessonListings = () => {
  
  const lessons = useAppSelector((state: RootState) => state.lesson.lessons);
  const [ page, setPage ] = useState<number>(3);
  const [ count, setCount ] = useState<number>(0);

  const appDispatch = useAppDispatch();

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
    appDispatch(setLessons(data || []));
    setCount(data?.length || 0);
  }
  
  const loadMore = () => {
    setPage((prev) => prev + 3);
  }
  
  const showLess = () => {
    setPage((prev) => prev - 3);
  }

  const setLesson = (suggestion: LessonSuggestion) => {
    appDispatch(setLessonInput(suggestion.lesson));
  }

  return (
    <main className="w-full flex flex-col gap-2">
      {lessons?.slice(0,page)?.map(l => (
        <LessonItem key={l.id} lesson={l}/>
      ))}
      {count > 0 ? (
        <div>
          <p className="text-sm text-center">Showing {count > page ? page : count} of {count} lesson(s)</p>
          { page >= count ? (
            <Button variant="outline" className="w-[200px]" onClick={showLess}>Show Less</Button>
          ): (
            <Button variant="outline" className="w-[200px]" onClick={loadMore}>Load More</Button>
          )}
        </div>
      ): (
        <>
          <p className="text-center w-full text-gray-300 text-sm">No lessons available currently. Here are several ready-to-use lesson plan suggestions you can include.</p>
        </>
      ) }
      
      <div>                
        {SUGGESTIONS.map((item,index) => (
          <div 
            key={`suggestion-${index}`}
            className="w-full cursor-pointer"
            onClick={() => setLesson(item)}
          >
            <div className="flex flex-row align-middle w-full justify-items-stretch">
              <p className="text-sm p-2 w-full">{item.lesson}</p>            
              <Button variant="ghost">Use</Button>
            </div>
            <div className="flex flex-row gap-1">{item.tags.map(tag => (
              <Badge variant="secondary" key={`tag-${tag}-${index}}`}>{tag}</Badge>
            ))}</div>
            {(index < SUGGESTIONS.length - 1) ? (
              <Separator className="mt-2"/>
            ): null}
          </div>
        ))}
      </div>      
      
    </main>
  )
}

export default LessonListings;