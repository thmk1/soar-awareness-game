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
        "SOAR investigates the sender and automatically searches for similar phishing emails.",
    },
    {
      question: "You find a USB device in the parking lot.",
      options: [
        { text: "Connect it to your PC", points: 0, correct: false },
        { text: "Give it to IT", points: 10, correct: true },
      ],
      explanation:
        "Unknown USB devices may carry malware and should be handled by IT.",
    },
    {
      question: "A Teams user requests your MFA code.",
      options: [
        { text: "Share it", points: 0, correct: false },
        { text: "Refuse and report", points: 10, correct: true },
      ],
      explanation:
        "MFA codes are personal and should never be shared.",
    },
    {
      question: "You receive an invoice from an unknown supplier.",
      options: [
        { text: "Open it immediately", points: 0, correct: false },
        { text: "Verify the sender first", points: 10, correct: true },
      ],
      explanation:
        "Verification helps prevent phishing and malware infections.",
    },
    {
      question: "Your PC suddenly displays many pop-ups.",
      options: [
        { text: "Ignore them", points: 0, correct: false },
        { text: "Disconnect and contact IT", points: 10, correct: true },
      ],
      explanation:
        "Quick containment helps stop malware from spreading.",
    },
    {
      question: "A QR code promises a free reward if you sign in.",
      options: [
        { text: "Scan and sign in", points: 0, correct: false },
        { text: "Verify the source first", points: 10, correct: true },
      ],
      explanation:
        "QR phishing attacks are becoming increasingly common.",
    },
    {
      question: "You receive repeated MFA prompts you didn't request.",
      options: [
        { text: "Approve one to stop them", points: 0, correct: false },
        { text: "Deny and contact IT", points: 10, correct: true },
      ],
      explanation:
        "This may be an MFA fatigue attack.",
    },
    {
      question: "A coworker asks for your password temporarily.",
      options: [
        { text: "Share it", points: 0, correct: false },
        { text: "Refuse politely", points: 10, correct: true },
      ],
      explanation:
        "Passwords should never be shared under any circumstance.",
    },
    {
      question: "You accidentally send confidential information to the wrong person.",
      options: [
        { text: "Report the incident", points: 10, correct: true },
        { text: "Hope nobody notices", points: 0, correct: false },
      ],
      explanation:
        "Prompt reporting helps minimize potential data exposure.",
    },
    {
      question: "A website offers free software downloads.",
      options: [
        { text: "Install it", points: 0, correct: false },
        { text: "Use approved company software only", points: 10, correct: true },
      ],
      explanation:
        "Unauthorized software can introduce malware and security risks.",
    },
  ];

  const [started, setStarted] = useState(false);
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
    setCurrent(current + 1);
    setShowExplanation(false);
    setFeedback("");
  };

  const restartGame = () => {
    setStarted(false);
    setCurrent(0);
    setScore(0);
    setShowExplanation(false);
    setFeedback("");
  };

  const appStyle = {
    minHeight: "100vh",
    background: "#f3f7fb",
    padding: "40px",
    fontFamily: "Segoe UI, sans-serif",
  };

  const cardStyle = {
    maxWidth: "900px",
    margin: "auto",
    background: "#fff",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
  };

  if (!started) {
    return (
      <div style={appStyle}>
        <div style={cardStyle}>
          <h1 style={{ textAlign: "center", color: "#0078D4" }}>
            🛡️ SOAR Cyber Awareness Challenge
          </h1>

          <p style={{ textAlign: "center", fontSize: "18px" }}>
            Test your cybersecurity skills and become a Cyber Hero!
          </p>

          <h3>Topics Covered:</h3>

          <ul style={{ lineHeight: "2" }}>
            <li>📧 Phishing Emails</li>
            <li>🔐 MFA Security</li>
            <li>💾 USB Threats</li>
            <li>📱 QR-Code Scams</li>
            <li>🗂️ Data Protection</li>
            <li>🤖 SOAR Response Actions</li>
          </ul>

          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <button
              onClick={() => setStarted(true)}
              style={{
                background: "#0078D4",
                color: "white",
                border: "none",
                padding: "15px 35px",
                fontSize: "18px",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              Start Challenge
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (current >= scenarios.length) {
    const percentage = Math.round((score / 100) * 100);

    let badge = "📚 Security Learner";

    if (score >= 80) badge = "🏆 Cyber Hero";
    else if (score >= 60) badge = "🛡️ Security Champion";

    return (
      <div style={appStyle}>
        <div style={cardStyle}>
          <h1 style={{ textAlign: "center" }}>
            🎉 Training Complete!
          </h1>

          <h2 style={{ textAlign: "center" }}>{badge}</h2>

          <h1
            style={{
              textAlign: "center",
              color: "#0078D4",
            }}
          >
            {percentage}%
          </h1>

          <h3 style={{ textAlign: "center" }}>
            Final Score: {score}/100
          </h3>

          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <button
              onClick={restartGame}
              style={{
                background: "#0078D4",
                color: "white",
                border: "none",
                padding: "15px 30px",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const progress = ((current + 1) / scenarios.length) * 100;

  return (
    <div style={appStyle}>
      <div style={cardStyle}>
        <h1
          style={{
            textAlign: "center",
            color: "#0078D4",
            marginBottom: "25px",
          }}
        >
          🛡️ SOAR Cyber Awareness Challenge
        </h1>

        <div
          style={{
            background: "#ddd",
            height: "20px",
            borderRadius: "20px",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              background: "#0078D4",
              height: "20px",
              borderRadius: "20px",
              transition: "0.3s",
            }}
          />
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: "15px",
          }}
        >
          Question {current + 1} of {scenarios.length}
        </p>

        <h2 style={{ textAlign: "center" }}>
          {scenarios[current].question}
        </h2>

        {!showExplanation ? (
          scenarios[current].options.map((option, index) => (
            <button
              key={index}
              onClick={() => answerQuestion(option)}
              style={{
                width: "100%",
                padding: "15px",
                marginTop: "15px",
                border: "none",
                borderRadius: "10px",
                background: "#0078D4",
                color: "white",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              {option.text}
            </button>
          ))
        ) : (
          <>
            <h2 style={{ textAlign: "center" }}>
              {feedback}
            </h2>

            <div
              style={{
                background: "#eef6ff",
                padding: "20px",
                borderRadius: "10px",
                marginTop: "20px",
              }}
            >
              <strong>🤖 SOAR Automation Response</strong>
              <p>{scenarios[current].explanation}</p>
            </div>

            <button
              onClick={nextQuestion}
              style={{
                width: "100%",
                marginTop: "20px",
                padding: "15px",
                border: "none",
                borderRadius: "10px",
                background: "#28a745",
                color: "white",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Next Question
            </button>
          </>
        )}

        <h3
          style={{
            marginTop: "25px",
            textAlign: "center",
            color: "#555",
          }}
        >
          Score: {score}
        </h3>
      </div>
    </div>
  );
}