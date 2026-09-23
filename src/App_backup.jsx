import { useState, useEffect } from "react";

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
        "SOAR investigates the sender and searches for similar phishing emails.",
    },
    {
      question: "You find a USB device in the parking lot.",
      options: [
        { text: "Connect it to your PC", points: 0, correct: false },
        { text: "Give it to IT", points: 10, correct: true },
      ],
      explanation:
        "Unknown USB devices should never be connected to company devices.",
    },
    {
      question: "A Teams user asks for your MFA code.",
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
        "Verification reduces phishing and malware risks.",
    },
    {
      question: "Your PC starts displaying many pop-ups.",
      options: [
        { text: "Ignore them", points: 0, correct: false },
        { text: "Disconnect and call IT", points: 10, correct: true },
      ],
      explanation:
        "Rapid containment helps prevent malware spreading.",
    },
    {
      question: "A QR code promises a free reward if you sign in.",
      options: [
        { text: "Scan and sign in", points: 0, correct: false },
        { text: "Verify the source first", points: 10, correct: true },
      ],
      explanation:
        "QR phishing attacks continue to increase.",
    },
    {
      question: "You receive repeated MFA prompts you didn't request.",
      options: [
        { text: "Approve one", points: 0, correct: false },
        { text: "Deny and contact IT", points: 10, correct: true },
      ],
      explanation:
        "This may be an MFA fatigue attack.",
    },
    {
      question: "A coworker asks for your password.",
      options: [
        { text: "Share it", points: 0, correct: false },
        { text: "Politely refuse", points: 10, correct: true },
      ],
      explanation:
        "Passwords should never be shared.",
    },
    {
      question: "Confidential information was sent to the wrong person.",
      options: [
        { text: "Report it immediately", points: 10, correct: true },
        { text: "Ignore it", points: 0, correct: false },
      ],
      explanation:
        "Reporting minimizes the impact of data exposure.",
    },
    {
      question: "A website offers free software downloads.",
      options: [
        { text: "Install it", points: 0, correct: false },
        { text: "Use approved software only", points: 10, correct: true },
      ],
      explanation:
        "Unapproved software may introduce security risks.",
    },
  ];

  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);

  const [playerName, setPlayerName] = useState("");
  const [playerEmail, setPlayerEmail] = useState("");
  const [playerDepartment, setPlayerDepartment] = useState("");

  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (!started || showExplanation) return;

    if (timeLeft === 0) {
      setFeedback("⏰ Time's Up!");
      setShowExplanation(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, started, showExplanation]);

  const answerQuestion = (option) => {
    setScore((prev) => prev + option.points);

    setFeedback(
      option.correct
        ? "✅ Correct!"
        : "❌ Incorrect!"
    );

    setShowExplanation(true);
  };

  const nextQuestion = () => {
    setCurrent((prev) => prev + 1);
    setFeedback("");
    setShowExplanation(false);
    setTimeLeft(30);
  };

  const restartGame = () => {
    setStarted(false);
    setCurrent(0);
    setScore(0);
    setFeedback("");
    setShowExplanation(false);
    setTimeLeft(30);

    setPlayerName("");
    setPlayerEmail("");
    setPlayerDepartment("");
  };

  const printCertificate = () => {
    window.print();
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
    background: "white",
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

          <p style={{ textAlign: "center" }}>
            Test your cybersecurity knowledge.
          </p>

          <input
            type="text"
            placeholder="Full Name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            style={{ width: "100%", padding: "12px", marginBottom: "10px" }}
          />

          <input
            type="email"
            placeholder="Email"
            value={playerEmail}
            onChange={(e) => setPlayerEmail(e.target.value)}
            style={{ width: "100%", padding: "12px", marginBottom: "10px" }}
          />

          <input
            type="text"
            placeholder="Department"
            value={playerDepartment}
            onChange={(e) => setPlayerDepartment(e.target.value)}
            style={{ width: "100%", padding: "12px", marginBottom: "20px" }}
          />

          <button
            onClick={() => {
              if (
                !playerName ||
                !playerEmail ||
                !playerDepartment
              ) {
                alert("Please complete all fields.");
                return;
              }

              setStarted(true);
            }}
            style={{
              width: "100%",
              padding: "15px",
              border: "none",
              borderRadius: "10px",
              background: "#0078D4",
              color: "white",
              cursor: "pointer",
            }}
          >
            Start Challenge
          </button>
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
            🎓 Certificate of Completion
          </h1>

          <h2 style={{ textAlign: "center" }}>
            {playerName}
          </h2>

          <p style={{ textAlign: "center" }}>
            has successfully completed the
          </p>

          <h2 style={{ textAlign: "center", color: "#0078D4" }}>
            SOAR Cyber Awareness Challenge
          </h2>

          <h1 style={{ textAlign: "center" }}>
            {badge}
          </h1>

          <h2 style={{ textAlign: "center" }}>
            Score: {score}/100
          </h2>

          <h2 style={{ textAlign: "center" }}>
            Percentage: {percentage}%
          </h2>

          <button
            onClick={printCertificate}
            style={{
              width: "100%",
              padding: "15px",
              border: "none",
              borderRadius: "10px",
              background: "#28a745",
              color: "white",
              marginTop: "20px",
              cursor: "pointer",
            }}
          >
            🖨️ Print Certificate
          </button>

          <button
            onClick={restartGame}
            style={{
              width: "100%",
              padding: "15px",
              border: "none",
              borderRadius: "10px",
              background: "#0078D4",
              color: "white",
              marginTop: "10px",
              cursor: "pointer",
            }}
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  const progress =
    ((current + 1) / scenarios.length) * 100;

  return (
    <div style={appStyle}>
      <div style={cardStyle}>
        <h1 style={{ textAlign: "center", color: "#0078D4" }}>
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
            }}
          />
        </div>

        <h3 style={{ marginTop: "20px" }}>
          ⏱️ Time Remaining: {timeLeft}s
        </h3>

        <p>
          Question {current + 1} of {scenarios.length}
        </p>

        <h2>{scenarios[current].question}</h2>

        {!showExplanation ? (
          scenarios[current].options.map((option, index) => (
            <button
              key={index}
              onClick={() => answerQuestion(option)}
              style={{
                width: "100%",
                padding: "15px",
                marginTop: "10px",
                border: "none",
                borderRadius: "10px",
                background: "#0078D4",
                color: "white",
                cursor: "pointer",
              }}
            >
              {option.text}
            </button>
          ))
        ) : (
          <>
            <h2>{feedback}</h2>

            <div
              style={{
                background: "#eef6ff",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <strong>🤖 SOAR Response</strong>
              <p>{scenarios[current].explanation}</p>
            </div>

            <button
              onClick={nextQuestion}
              style={{
                width: "100%",
                padding: "15px",
                marginTop: "15px",
                border: "none",
                borderRadius: "10px",
                background: "#28a745",
                color: "white",
                cursor: "pointer",
              }}
            >
              Next Question
            </button>
          </>
        )}

        <h3 style={{ textAlign: "center", marginTop: "20px" }}>
          Score: {score}
        </h3>
      </div>
    </div>
  );
}