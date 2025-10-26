'use client';

import { fetchLesson } from "@/utils/helper";
import * as ts from 'typescript';
import * as Babel from '@babel/standalone';
import React, { useEffect, useState, use } from "react";

type LessonPageParams = {
  params: Promise<{
    id: string
  }>
}

const LessonPage = ({ params }: LessonPageParams) => {

  const { id } = use(params);
  const [ lesson, setLesson ] = useState<any>();
  const [ RenderedComponent, setRenderedComponent ] = useState<React.FC | null>(null);
  
  useEffect(() => {
    getLesson();
  }, [id])

  const compileAndRender = (sourceCode: string) => {
    try {
      const code = ts.transpileModule(sourceCode, {
        compilerOptions: {
          module: ts.ModuleKind.ESNext,
          jsx: ts.JsxEmit.React
        }
      }).outputText;

      const compiled = Babel.transform(code, {
        presets: ['react'],
        plugins: ['transform-modules-commonjs']
      }).code;

      const componentModule = {};
      new Function('React','exports', compiled!)(React, componentModule);

      const Component = (componentModule as any).default;
      if(Component) setRenderedComponent(() => Component);
    } catch(e) {
      console.error('Compilation error. Failed to generate code');
      console.error(e);
    }
  }

  const getLesson = async () => {
    const data = await fetchLesson(id);
    if(data) {
      setLesson(data);
      compileAndRender(data.generated_code);
    }
  }  
  
  if(!lesson) return <p>Loading...</p>  

  return (
    <main className="p-4">
      <h1>Lesson</h1>
      <div className="text-xs border-2 w-full p-4 overflow-scroll h-[200px]">
        <pre>
          {lesson.generated_code}
        </pre>
      </div>
      <div>
        {RenderedComponent ? (
          <div className="border-t pt-4">
            <h2 className="font-medium">Live Render:</h2>
            <RenderedComponent />
          </div>
        ): (
          <p>Waiting for generated lesson to render...</p>
        )}
      </div>
    </main>
  )

}

export default LessonPage;