"use client";

import { LessonsType } from "@/lib/types";
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "./ui/item";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";
import { deleteLesson, formatDate } from "@/utils/helper";
import { Badge } from "./ui/badge";

type LessonItemProps = {  
  lesson: LessonsType  
}

const LessonItem = ({
  lesson
}: LessonItemProps) => {

  const navigateToLesson = () => {
    redirect(`/lessons/${lesson.id}`);
  }

  const onDelete = async () => {
    await deleteLesson(lesson.id);
  }

  return (
    <Item variant='outline'>
      <ItemContent>
        <ItemTitle>{lesson.lesson}</ItemTitle>
        <ItemDescription>Created On: {formatDate(lesson.created_at)}</ItemDescription>
      </ItemContent>
      <ItemActions>
        {lesson.status === 'generated' ? (
          <>
            <Button variant="outline" onClick={navigateToLesson}>View Lesson</Button>
            <Button variant="secondary" onClick={onDelete}>Delete</Button>
          </>
        ): (
        <>
          <Badge variant="secondary" className="bg-green-800">In Progress...</Badge>
          <Badge variant="destructive" className="cursor-pointer" onClick={onDelete}>Stop</Badge>
        </>
      )}
      </ItemActions>
    </Item>
  )  
}

export default LessonItem;