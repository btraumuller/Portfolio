"use client";
import React, { useState } from 'react';

export default function QuizApp() {
      // do not modify the questions or answers below
      const [selection, setSelection] = useState("");
      const [point, setPoint] = useState(0);
      const [qCorrect, setqCorrect] = useState(0);
      const [feedback, setFeedback] = useState("");
      const questions = [
        {
          question: 'What is the capital of France?',
          options: ['London', 'Paris', 'Berlin', 'Madrid'],
          correct: 'Paris',
        },
        {
          question: 'What is the capital of Germany?',
          options: ['Berlin', 'Munich', 'Frankfurt', 'Hamburg'],
          correct: 'Berlin',
        },
      ];
      let checkAnswer = (answer:string, selection:string) => {
        if (answer === selection){
          console.log(point);
          setqCorrect(qCorrect + 1);
          setPoint(point + 1);
          setFeedback("Correct!");
          setSelection("");
        }
        else{
          setPoint(point + 1);
          setFeedback("Incorrect!");
          setSelection("");
        }
      };
      
      if (point < questions.length){
        return (
          <div className='max-w-screen-xl mx-auto flex justify-center flex-col flex-wrap p-4'>
            <h1 className='self-center text-3xl mb-2'>Quiz</h1>
            <div className='mx-auto rounded border border-dark-grey border-solid p-4 bg-white'>
              <h2 id="question" className='mb-2'>{questions[`${point}`].question}</h2>
              { questions[`${point}`].options.map((option, i) =>
                  <div  key={i} className='mb-1'>
                    <label htmlFor={option} className='cursor-pointer' onClick={() => setSelection(`${option}`)}>
                      <input 
                        type="radio" 
                        value={option}
                        checked={selection === option}
                        name="quiz"
                        onChange={() => setSelection(`${option}`)}
                        /> {option}
                        
                    </label>
                  </div>
                  )
              }
              
              <button id="submitBtn" className='mt-4 primary-btn' onClick={() => checkAnswer(questions[`${point}`].correct, `${selection}`)}>
                Submit
              </button>
              <div id="feedback" className='p2'>
                <p> {feedback} </p>
              </div>
            </div>
          </div>
        );
      }
      else{
        return(
          <div id="feedback" className='max-w-screen-xl mx-auto flex flex-col p-4'>
            <h2 className='text-center'>You scored {qCorrect} out of {questions.length}</h2> 
          </div>
        )
        
      }
    }