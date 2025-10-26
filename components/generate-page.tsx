'use client';

import { FormEvent, useState } from "react";
import { Textarea } from "./ui/textarea";
import { generateLesson } from "@/lib/utils";
import { Button } from "./ui/button";

const GeneratePage = () => {

  const [lesson, setLesson] = useState<string>('');
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await generateLesson(lesson);
    setLesson('');
  }

  return (
    <main className="w-full">
      <form className="mb-4" onSubmit={handleSubmit}>
        <Textarea 
          value={lesson}
          placeholder="What would you like to learn today?"
          onChange={e => setLesson(e.target.value)}
          className="border p-2 w-full mb-2 outline-none"
        />
        <Button className="bg-blue-500 text-white px-3 py-1">Generate</Button>
      </form>
    </main>
  )
}

export default GeneratePage;