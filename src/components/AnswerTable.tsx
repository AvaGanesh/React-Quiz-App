import React from 'react'
import { UserAnswers } from '../App'

const AnswerTable: React.FC<UserAnswers> = ({question, answer, correctAnswer, userAnswer}) => {
    console.log(question, answer,correctAnswer, userAnswer);
    return (
        <tr>

            <td>
                {question}
            </td>
            <td>
                {answer}
            </td>
            <td>
                {correctAnswer}
            </td>
            <td>
                {userAnswer}
            </td>
        </tr>
    )
}

export default AnswerTable
