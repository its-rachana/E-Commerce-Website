"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Feedback() {
  const router = useRouter();
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents form from reloading the page

    try {
      const response = await fetch("/submitFeedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: feedback }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/thankyoupage"); // assuming you have this route
      } else {
        setError(data.error || "Submission failed.");
      }
    } catch (err) {
      setError("Something went wrong.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <h2>Feedback Form</h2>
          <label>Feedback:</label><br />
          <input
            type="text"
            value={feedback}
            required
            onChange={handleChange}
          /><br />
          <input type="submit" value="Submit" />
        </form>
        {error && <p className="text-danger">{error}</p>}
      </header>
    </div>
  );
}
