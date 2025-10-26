'use client';

import { FormEvent, useState } from "react";
import { Textarea } from "./ui/textarea";
import { streamLessonGeneration } from "@/lib/utils";
import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/utils/state/hooks";
import { RootState } from "@/utils/state/store";
import { setLessonInput } from "@/utils/state/slices/lessons";
import ItemLoading from "./loading-item";

const GeneratePage = () => {

  const lessonInput = useAppSelector((state:RootState) => state.lesson.lessonInput);
  const appDispatch = useAppDispatch();
  
  const [ steps, setSteps ] = useState<string[]>([]);
  const [ loading, setLoading ] = useState(false);
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSteps([]);    
    // await generateLesson(lessonInput);
    // appDispatch(setLessonInput(''));
    await streamLessonGeneration(lessonInput, {
      onStep: (status) => setSteps((prev) => [...prev, status]),
      onToken: (token) => { console.log(`Token: ${token}`)},
      onError: ((error) => { console.error(error)}),
      onDone: () => {
        console.log('Done');
        setLoading(false);
        setSteps([]);
      }
    })
  }

  const setLesson = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    appDispatch(setLessonInput(e.target.value));
  }

  return (
    <main className="w-full">
      <form className="mb-4 flex flex-col gap-2 justify-items-center" onSubmit={handleSubmit}>
        <Textarea 
          value={lessonInput}
          placeholder="What would you like to learn today?"
          onChange={setLesson}
          className="border p-2 w-full mb-2 outline-none resize-none"
        />
        <Button variant="default">Generate</Button>
      </form>
      
      {loading ? (
        <ItemLoading steps={steps} />
      ) : null }
    </main>
  )
}

export default GeneratePage;