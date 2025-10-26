"use client";

import { LessonsType } from "@/lib/types";
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "./ui/item";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";

type LessonItemProps = {  
  lesson: LessonsType  
}

const LessonItem = ({
  lesson
}: LessonItemProps) => {

  const navigateToLesson = () => {
    redirect(`/lessons/${lesson.id}`);
  }

  return (
    <Item variant='outline'>
      <ItemContent>
        <ItemTitle>{lesson.lesson}</ItemTitle>
        <ItemDescription>Created On: {new Date(lesson.created_at).toISOString()}</ItemDescription>
      </ItemContent>
      <ItemActions>        
        <Button variant="outline" onClick={navigateToLesson}>View Lesson</Button>
      </ItemActions>
    </Item>
  )  
}

export default LessonItem;