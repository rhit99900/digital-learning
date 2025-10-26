export const TITLE = 'Digital Lesson Generator';

export type LessonSuggestion = {
  lesson: string;
  tags: string[]
}

export const SUGGESTIONS:LessonSuggestion[] = [
  {
    lesson: 'Explaining how fractions and decimals are related',
    tags: ['Maths','Algebra']
  },
  {
    lesson: 'Teaching multiplication through visual grouping',
    tags: ['Maths','Algebra']
  },
  {
    lesson: 'Understanding percentages with real-world examples',
    tags: ['Maths','Algebra']
  },
  {
    lesson: 'How the water cycle works',
    tags: ['Science']
  },
  {
    lesson: 'Understanding photosynthesis and the role of sunlight',
    tags: ['Science']
  }
]