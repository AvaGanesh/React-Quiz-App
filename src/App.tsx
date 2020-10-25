import React, { useState } from 'react';
import './App.css';
import QuestionCard from './components/QuestionCard';
import { Difficulty, fetchQuizQuestions, QuestionState } from './API';
import AnswerTable from './components/AnswerTable';

export interface UserAnswers {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
  userAnswer: string;
}

const App = () => {
  const [isError, setError] = useState(false);
  const [difficultyLevel, setDifficultyLevel] = useState<Difficulty>(Difficulty.EASY);
  const [isLoading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const TOTAL_QUESTIONS = 10;

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(10, difficultyLevel);
    if(newQuestions.length === 0) {
      setError(true);
    } else {
      setQuestions(newQuestions);
      setUserAnswers([]);
      setScore(0);
      setLoading(false);
    }

  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) {
        setScore((prev) => prev + 1);
      }

      const answerObject = {
        question: questions[number].question,
        answer: questions[number].correct_answer,
        correct,
        correctAnswer: questions[number].correct_answer,
        userAnswer: e.currentTarget.value
      }
      setUserAnswers(prev => [...prev, answerObject]);
    }
  }

  const radioButtonChange = (e: any) => {
    console.log(e.target.value);
    console.log(e);
    setDifficultyLevel(e.target.value);
  }


  const nextQuestion = () => {
    const next = number + 1;
    if (next === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(next);
    }
  }

  return (
    <div className="App">
      <h1>React Quiz</h1>
      { isError ? <div>Error while loading the questions!!</div> : null}
  
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ?
        (<div>
          <div className="container" onChange={radioButtonChange}>

            <div className="custom-control custom-radio">
              <input
                type="radio" value={Difficulty.EASY}
                defaultChecked
                name="difficulty" className="custom-control-input" id="radio1"/>
              <label className="custom-control-label" htmlFor="radio1">Easy</label>
            </div>
            <div className="custom-control custom-radio">
              <input type="radio"
                id="radio2"
                value={Difficulty.MEDIUM} name="difficulty"

                className="custom-control-input" />
              <label className="custom-control-label" htmlFor="radio2">Medium</label>
            </div>
            <div className="custom-control custom-radio">
              <input type="radio"

                value={Difficulty.HARD} name="difficulty"
                id="radio3"
                className="custom-control-input" />
              <label className="custom-control-label" htmlFor="radio3">Hard</label>
            </div>
          </div>
          <button className="btn btn-primary" onClick={startTrivia}>Start Quiz</button>
        </div>) : null
      }
      {!isError && !gameOver ? <h3>Score: <strong> {score} </strong> </h3> : null}
      { !isLoading && userAnswers.length === TOTAL_QUESTIONS ? 
      <div className="container full-width">
         <table className="table table-sm">
            <thead>
                <tr>
                <th scope="col">Question </th>
                <th scope="col">Answer</th>
                <th scope="col">Correct Answer</th>
                <th scope="col">Your Answer</th>
                </tr>
            </thead>
            <tbody>
              {
                userAnswers.map((answer) => {
                  return (<AnswerTable question={answer.question}
                               answer={answer.answer} 
                               userAnswer={answer.answer}
                               correctAnswer={answer.correctAnswer}
                               correct={answer.correct} />)
                })
              }
            </tbody>
        </table>
      </div>: null}
      {!isError && !gameOver && !isLoading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ?
        (userAnswers[number].correct ?
          <div className="alert alert-success" role="alert">
            Correct Answer!!
        </div> :
          <div>
            <div className="alert alert-danger" role="alert">
              Wrong Answer!!
           </div>
            <h4>Correct Answer is: <strong>{userAnswers[number].correctAnswer}</strong></h4>
          </div>
        ) : null
      }


      { !isError && isLoading ?
        <div className="d-flex justify-content-center">
          <div>
            <p>Loading Questions...</p>
          </div>
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div> : null}
      {
        !isError && !isLoading && !gameOver && userAnswers.length !== TOTAL_QUESTIONS &&
        <QuestionCard questionNo={number + 1} totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer} />
      }

      {!isError && !gameOver && !isLoading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ?
          
           <button className="btn btn-warning" onClick={nextQuestion}>Next &gt; </button>
           
           : null}


        
    </div>
  );
}

export default App;
