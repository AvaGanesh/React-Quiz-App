import React from 'react'
import { UserAnswers } from '../App'
import './QuestionCard.css';

export interface QuestionCardProps {
    question: string;
    answers: string[];
    callback: any;
    userAnswer: UserAnswers | undefined;
    questionNo: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({question,answers,callback,userAnswer,
                                                    questionNo,totalQuestions}) => {
    return (
        <div className="card">
           <p className="number">
               Question: <strong> {questionNo} / {totalQuestions} </strong>
           </p>
           <h4 dangerouslySetInnerHTML={{__html: question}}/>
           <div>
                {
                    answers.map((answer)=> {
                        return <div key={answer}>
                            <button className="btn btn-primary" disabled={userAnswer ?  true : false} value={answer} onClick={callback}>
                                <span dangerouslySetInnerHTML={{__html: answer}}/>
                            </button>
                        </div>
                    })
                }
           </div>
        </div>
    )
}

export default QuestionCard
