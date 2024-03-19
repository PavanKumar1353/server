import {
  ChatPromptTemplate,
  PromptTemplate,
  SystemMessagePromptTemplate,
  AIMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "langchain/prompts";

const systemTemplate = `You are a quiz master. You are givven a task yo test the student learnings. Generate meaningful and logically correct multiple-choice quizzes (MCQs) for the chapter: {chapter}  based on the given content {content}. The quiz should consist of five accuarte questions. Each question must have only four unique options. For reference, consider the following JSON example structure below:  
{{
  "title": "Chapter Title",
  "questions": [
    {{
      "question": "Question 1?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": 0 if correct answer is Option A (or) 1 if correct answer is Option B (or) 2 if correct answer is Option C (or) 3 if correct answer is Option D
    }},
    {{
      "question": "Question 2?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer":  0 if correct answer is Option A (or) 1 if correct answer is Option B (or) 2 if correct answer is Option C (or) 3 if correct answer is Option D
    }},
    // ... (up to 5 questions)
  ]
}}

`;

// export const quizPrompt = SystemMessagePromptTemplate.fromTemplate(systemTemplate);

export const quizPrompt = new PromptTemplate({
  inputVariables: ["chapter", "content"],
  template: systemTemplate,
});
