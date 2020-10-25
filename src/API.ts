import {shuffleArray} from './Util';

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}

export interface Question  {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

export interface QuestionState {
    answers: string[];
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

export const  fetchQuizQuestions = async(amount: number, difficulty: Difficulty | undefined) => {
    // https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const response =  await fetch(endpoint);
    const data = await response.json();
    console.log(data.results);
    let questions: Question[] = data.results;
    console.log(questions);
    const questionFormat: QuestionState[] = questions.map((q: Question) => {
        return {
            ...q,
            answers:  shuffleArray([...q.incorrect_answers,q.correct_answer])
        }
    })
    console.log(questionFormat);
    return questionFormat;
}
