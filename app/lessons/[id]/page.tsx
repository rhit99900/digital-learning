import { fetchLesson } from "@/utils/helper";
import { supabase } from "@/utils/supabase";

type LessonPageParams = {
  params: {
    id: string
  }
}

const LessonPage = async ({ params }: LessonPageParams) => {

  const { id } = await params;
  const lesson = await fetchLesson(id);
  
  if(!lesson) return <p>Lesson Not Found</p>

  return (
    <main className="p-4">
      <h1>Lesson</h1>
      <pre>
        {lesson.generated_code}
      </pre>
    </main>
  )

}

export default LessonPage;