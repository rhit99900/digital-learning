export const TITLE = 'Digital Lesson Generator';

export type LessonSuggestion = {
  lesson: string;
  tags: string[]
}

export const SUGGESTIONS: LessonSuggestion[] = [
  // --- Mathematics ---
  {
    lesson: "Explaining how fractions and decimals are related",
    tags: ["Maths", "Algebra"]
  },
  {
    lesson: "Teaching multiplication through visual grouping",
    tags: ["Maths", "Algebra"]
  },
  {
    lesson: "Understanding percentages with real-world examples",
    tags: ["Maths", "Algebra"]
  },
  {
    lesson: "Visualizing division as equal sharing",
    tags: ["Maths", "Arithmetic"]
  },
  {
    lesson: "Understanding area and perimeter with shapes",
    tags: ["Maths", "Geometry"]
  },
  {
    lesson: "Comparing fractions using visual bars",
    tags: ["Maths", "Fractions"]
  },
  {
    lesson: "Plotting linear equations on a coordinate grid",
    tags: ["Maths", "Graphing"]
  },

  // --- Science ---
  {
    lesson: "How the water cycle works",
    tags: ["Science", "Earth Science"]
  },
  {
    lesson: "Understanding photosynthesis and the role of sunlight",
    tags: ["Science", "Biology"]
  },
  {
    lesson: "Explaining gravity through falling objects",
    tags: ["Science", "Physics"]
  },
  {
    lesson: "Parts of a plant and their functions",
    tags: ["Science", "Biology"]
  },
  {
    lesson: "Exploring phases of the moon",
    tags: ["Science", "Astronomy"]
  },
  {
    lesson: "Understanding renewable and non-renewable energy sources",
    tags: ["Science", "Environment"]
  },

  // --- Computer Science / Logic ---
  {
    lesson: "Explaining loops using visual repetition",
    tags: ["Computers", "Programming"]
  },
  {
    lesson: "Understanding binary numbers with colored blocks",
    tags: ["Computers", "Programming"]
  },
  {
    lesson: "Explaining conditional logic with flow diagrams",
    tags: ["Computers", "Programming"]
  },

  // --- Language & Grammar ---
  {
    lesson: "Identifying nouns, verbs, and adjectives in a sentence",
    tags: ["Language", "Grammar"]
  },
  {
    lesson: "Understanding synonyms and antonyms through visuals",
    tags: ["Language", "Vocabulary"]
  },
  {
    lesson: "Using tenses to describe past, present, and future",
    tags: ["Language", "Grammar"]
  },

  // --- Environmental & Life Skills ---
  {
    lesson: "Understanding recycling and waste segregation",
    tags: ["Environment", "Life Skills"]
  },
  {
    lesson: "Saving water through daily habits",
    tags: ["Environment", "Life Skills"]
  },
  {
    lesson: "Healthy eating habits and balanced diet",
    tags: ["Health", "Life Skills"]
  },
  {
    lesson: "Understanding teamwork and cooperation",
    tags: ["Social Studies", "Life Skills"]
  }
];