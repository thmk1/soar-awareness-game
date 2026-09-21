import { useState } from "react";

export default function App() {
  const scenarios = [
    {
      question:
        "You receive an email claiming your Microsoft 365 password will expire today.",
      options: [
        { text: "Click the link", points: 0, correct: false },
        { text: "Report it to IT/Security", points: 10, correct: true },
      ],
      explanation:
        "SOAR investigates the sender and can automatically quarantine similar emails.",
    },
    {
      question: "You find a USB device in the parking lot.",
      options: [
        { text: "Plug it into your PC", points: 0, correct: false },
        { text: "Give it to IT", points: 10, correct: true },
      ],
      explanation:
        "Unknown USB devices may contain malware and should never be connected.",
    },
    {
      question: "A Teams user asks for your MFA code.",
      options: [
        { text: "Share it", points: 0, correct: false },
        { text: "Refuse and report", points: 10, correct: true },
      ],
      explanation:
        "MFA codes should never be shared with anyone.",
    },
    {
      question: "You receive an invoice from an unknown supplier.",
      options: [
        { text: "Open immediately", points: 0, correct: false },
        { text: "Verify sender first", points: 10, correct: true },
      ],
      explanation:
        "Verification helps prevent phishing and malware infections.",
    },
    {
      question: "Your computer starts showing many pop-ups.",
      options: [
        { text: "Disconnect and call IT", points: 10, correct: true },
        { text: "Ignore it", points: 0, correct: false },
      ],
      explanation:
        "Quick containment limits malware spread.",
    },
    {
      question: "A QR code asks you to log in to claim a prize.",
      options: [
        { text: "Scan and log in", points: 0, correct: false },
        { text: "Verify the source", points: 10, correct: true },
      ],
      explanation:
        "QR phishing attacks are increasingly common.",
    },
    {
      question: "You receive repeated MFA prompts you did not request.",
      options: [
        { text: "Approve one to stop notifications", points: 0, correct: false },
        { text: "Deny and contact IT", points: 10, correct: true },
      ],
      explanation:
        "This may be an MFA fatigue attack.",
    },
    {
      question: "A colleague asks you to share your password.",
      options: [
        { text: "Share it", points: 0, correct: false },
        { text: "Refuse politely", points: 10, correct: true },
      ],
      explanation:
        "Passwords are personal and must never be shared.",
    },
    {
      question: "You notice confidential files sent to the wrong person.",
      options: [
        { text: "Report the incident", points: 10, correct: true },
        { text: "Do nothing", points: 0, correct: false },
      ],
      explanation:
        "Prompt reporting reduces potential data exposure.",
    },
    {
      question: "You receive a link promising free software.",
      options: [
        { text: "Download it", points: 0, correct: false },
        { text: "Use approved company software only", points: 10, correct: true },
      ],
      explanation:
        "Unapproved software may contain malware.",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);

  const answerQuestion = (option) => {
    setScore(score + option.points);

    setFeedback(
      option.correct
        ? "✅ Correct!"
        : "❌ Incorrect!"
    );

    setShowExplanation(true);
  };

  const nextQuestion = () => {
    setFeedback("");
    setShowExplanation(false);
    setCurrent(current + 1);
  };

  const restartGame = () => {
    setCurrent(0);
    setScore(0);
    setFeedback("");
    setShowExplanation(false);
  };

  if (current >= scenarios.length) {
    let badge = "📚 Security Learner";

    if (score >= 80) badge = "🏆 Cyber Hero";
    else if (score >= 60) badge = "🛡️ Security Champion";

    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h1>Training Complete!</h1>
        <h2>{badge}</h2>
        <h3>Score: {score}/100</h3>

        <button onClick={restartGame}>
          Play Again
        </button>
      </div>
    );
  }

  const progress =
    ((current + 1) / scenarios.length) * 100;

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "auto",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      <h1>🛡️ SOAR Cyber Awareness Challenge</h1>

      <div
        style={{
          background: "#ddd",
          height: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            background: "#0078D4",
            height: "20px",
            borderRadius: "10px",
          }}
        />
      </div>

      <p>
        Question {current + 1} of {scenarios.length}
      </p>

      <h2>{scenarios[current].question}</h2>

      {!showExplanation ? (
        <div>
          {scenarios[current].options.map((option) => (
            <button
              key={option.text}
              onClick={() => answerQuestion(option)}
              style={{
                display: "block",
                width: "100%",
                padding: "12px",
                margin: "10px 0",
                cursor: "pointer",
              }}
            >
              {option.text}
            </button>
          ))}
        </div>
      ) : (
        <div>
          <h3>{feedback}</h3>
          <p>{scenarios[current].explanation}</p>
          <button onClick={nextQuestion}>
            {current === scenarios.length - 1 ? "Finish" : "Next Question"}
          </button>
        </div>
      )}
    </div>
  );
}