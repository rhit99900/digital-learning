'use client';

import { fetchLesson, formatDate } from "@/utils/helper";
import * as ts from 'typescript';
import * as Babel from '@babel/standalone';
import React, { useEffect, useState, use } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LessonsType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type LessonPageParams = {
  params: Promise<{
    id: string
  }>
}

const LessonPage = ({ params }: LessonPageParams) => {

  const { id } = use(params);
  const [ lesson, setLesson ] = useState<LessonsType>();
  const [ RenderedComponent, setRenderedComponent ] = useState<React.FC | null>(null);
  const [ progress, setProgress ] = useState<number>(10);
  
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
      new Function('React','useState', 'useEffect', 'exports', compiled!)(
        React,
        React.useState,
        React.useEffect,
        componentModule,
      );

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

  useEffect(() => {
    const timer = setTimeout(() => setProgress(89), 200);
    return () => clearTimeout(timer);
  }, [])
  
  if(!lesson) {
    return (
      <div className="w-full h-[400px] flex justify-center items-center">
        <div className="w-[50%]">
          Loading...
          <Progress value={progress} className="w-full" />
        </div>
      </div>
    )
  } else {
    return (
      <section className="w-full max-w-5xl flex flex-col justify-between items-center p-3 px-5 text-sm">
        <h1>Lesson: <strong>{lesson.lesson}</strong></h1>      
        <div>
          {RenderedComponent ? (
            <div>
              <RenderedComponent />
            </div>
          ): (
            <div>Waiting for generated lesson to render...</div>
          )}
        </div>
        <div className="w-full">
          <Dialog>            
            <DialogTrigger asChild>
              <Button variant="outline">Open Source Code</Button>
            </DialogTrigger>            
            <DialogContent className="fixed w-screen h-full max-w-none overflow-auto p-6">
              <DialogHeader>
                <DialogTitle>Lesson: <strong>{lesson.lesson}</strong></DialogTitle>
                <p className="text-xs">Created On: {formatDate(lesson.created_at)}</p>
                <p className="text-xs font-thin">This code snippet is AI Generated using Open AI model <strong>gpt-4o-mini</strong></p>
              </DialogHeader>
              <DialogDescription asChild>
                <div className="text-xs border rounded p-4 bg-gray-900 text-gray-100 font-mono whitespace-pre-wrap break-words overflow-auto">
                  <pre className="whitsspace-pre-wrap break-words">
                    {lesson.generated_code}
                  </pre>
                </div>
              </DialogDescription>
            </DialogContent>            
          </Dialog>
        </div>
      </section>
    )
  }

}

export default LessonPage;