import React, { useState, useEffect } from "react";
import './App.css';
import Navbar from "./Components/Navbar";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [isQuizStarted, setIsQuizStarted] = useState(false); 

  const getShuffledQuestions = (questions) => {
    return questions.sort(() => Math.random() - 0.5).slice(0, 10);
  };

  useEffect(() => {
    fetch('./quiz.json')
      .then((response) => response.json())
      .then((data) => setQuestions(getShuffledQuestions(data)))
      .catch((error) => console.error('Error loading JSON:', error));
  }, []);

  const handleStartQuiz = () => {
    setIsQuizStarted(true); 
  };

  const handleAnswerSelect = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedAnswer === questions[currentQuestionIndex].answer) {
      setScore(score + 10);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer("");
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleReload = () => {
    setQuestions(getShuffledQuestions(questions));
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer("");
    setIsQuizCompleted(false);
    setIsQuizStarted(false); 
  };

  return (
    <>
      <Navbar/>
      {questions.length === 0 ? (
        <span className="loader"></span>
      ) :!isQuizStarted ? (
        <div className="start-container">
          <h1 className="heading">React Quiz Challenge: Sharpen Your Skills!</h1>
          <button onClick={handleStartQuiz} >Start Quiz</button>
        </div>
      ) : (
        <div className="quiz-container">
          {isQuizCompleted ? (
            <div className="score-section">
              {score > 50 ? (
                <h2>Congratulations &#127881;! You passed the quiz with a score of {score} out of 100!</h2>
              ) : (
                <h2>You scored {score} out of 100</h2>
              )}
              <button onClick={handleReload}>Restart Quiz</button>
            </div>
          ) : (
            <div>
              <div className="question-section">
                <h2>
                  <span className="white">{currentQuestionIndex + 1}.</span> {questions[currentQuestionIndex].question}
                </h2>
                <ul>
                  {questions[currentQuestionIndex].options.map((option, index) => (
                    <li key={index}>
                      <label className="checkbox path">
                        <input
                          type="checkbox"
                          id={`option${index}`}
                          name="answer"
                          value={option}
                          checked={selectedAnswer === option}
                          onChange={handleAnswerSelect}
                        />
                        <svg viewBox="0 0 21 21">
                          <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                        </svg>
                        <span className="option">{option}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <button onClick={handleSubmit} disabled={!selectedAnswer}>
                Submit
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default App;
