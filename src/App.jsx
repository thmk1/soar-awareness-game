import { useState } from "react";

function App() {
  const scenarios = [
    {
      question: "You receive an email asking for your password.",
      answers: [
        { text: "Provide the password", points: 0 },
        { text: "Report it to IT", points: 10 },
      ],
    },
    {
      question: "You find a USB stick in the parking lot.",
      answers: [
        { text: "Plug it into your PC", points: 0 },
        { text: "Give it to IT", points: 10 },
      ],
    },
    {
      question: "Someone asks for your MFA code.",
      answers: [
        { text: "Share it", points: 0 },
        { text: "Never share MFA codes", points: 10 },
      ],
    },
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);

  function selectAnswer(points) {
    setScore(score + points);

    if (current < scenarios.length - 1) {
      setCurrent(current + 1);
    } else {
      alert(`Game Over! Your score is ${score + points}`);
    }
  }

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>🛡️ SOAR Cyber Awareness Game</h1>

      <h2>{scenarios[current].question}</h2>

      {scenarios[current].answers.map((answer, index) => (
        <div key={index}>
          <button
            style={{
              padding: "10px",
              margin: "10px",
              cursor: "pointer",
            }}
            onClick={() => selectAnswer(answer.points)}
          >
            {answer.text}
          </button>
        </div>
      ))}

      <h3>Score: {score}</h3>
    </div>
  );
}

export default App;