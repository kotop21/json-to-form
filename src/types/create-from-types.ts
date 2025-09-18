export interface Question {
  question: string;
  options: string[];
  correctAnswer?: string;
  points?: number;
}

export interface FormData {
  title?: string;
  questions: Question[];
  defaultPoints?: number;
}

export interface CreateFormResult {
  success: boolean;
  message?: string;
  error?: string;
}