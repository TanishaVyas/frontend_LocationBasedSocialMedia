    import React, { useState, useEffect } from 'react';

    const questionGroups = [
    [
        { question: "How would you describe your energy level right now?", options: ["Low", "Moderate", "High"] },
        { question: "How clear are your thoughts today?", options: ["Very clear", "Somewhat clear", "Cloudy"] },
        { question: "What’s the main thing on your mind right now?", options: ["Positive thoughts", "Worries or problems", "Confusion or uncertainty"] }
    ],
    [
        { question: "How do you feel about your current situation?", options: ["Very happy", "Neutral", "Very stressed"] },
        { question: "How much control do you feel over your day?", options: ["Completely in control", "Somewhat in control", "Out of control"] },
        { question: "Are you feeling physically comfortable?", options: ["Yes, very comfortable", "Somewhat uncomfortable", "Very hungry or uncomfortable"] }
    ],
    [
        { question: "How would you rate your overall mood today?", options: ["Happy", "Neutral", "Sad"] },
        { question: "How often are you finding yourself thinking about food today?", options: ["Not at all", "Occasionally", "Constantly"] },
        { question: "How would you describe your concentration?", options: ["Very focused", "A little distracted", "Hard to focus"] }
    ],
    [
        { question: "How satisfied are you with how things are going today?", options: ["Very satisfied", "Somewhat dissatisfied", "Very dissatisfied"] },
        { question: "Are you experiencing any physical discomfort or hunger?", options: ["No, I feel great", "A little uncomfortable", "Very hungry"] },
        { question: "How confident are you in your current decisions or actions?", options: ["Very confident", "Somewhat unsure", "Completely unsure"] }
    ],
    [
        { question: "How would you describe your general mood right now?", options: ["Happy", "Sad", "Stressed"] },
        { question: "How often do you feel confused or uncertain today?", options: ["Not at all", "Occasionally", "Often"] },
        { question: "How physically energetic do you feel?", options: ["Very energetic", "Somewhat low on energy", "Completely drained or hungry"] }
    ]
    ];

    function MoodChecker() {
        const [selectedGroup, setSelectedGroup] = useState([]);
        const [responses, setResponses] = useState([]);
        const [mood, setMood] = useState(null);
      
        // Select a random question group on component mount
        useEffect(() => {
          const randomIndex = Math.floor(Math.random() * questionGroups.length);
          setSelectedGroup(questionGroups[randomIndex]);
          setResponses(new Array(3).fill(null));
        }, []);
      
        // Handle response selection for each question
        const handleResponseChange = (index, response) => {
          const newResponses = [...responses];
          newResponses[index] = response;
          setResponses(newResponses);
        };
      
        // Send answers to Gemini and get the mood response
        const determineMood = async () => {
          const apiKey = "AIzaSyCijFUV7i0YQygptRf4WZXSn4LxTqMhCus"; // Replace with your Gemini API key
          const answersText = responses.map((answer, idx) => `Q${idx + 1}: ${answer}`).join(", ");
        
          try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                contents: [
                  {
                    parts: [
                      {
                        text: `Based on the following responses, determine the mood: ${answersText}`
                      }
                    ]
                  }
                ]
              }),
            });
        
            if (response.status === 429) {
              setMood("Rate limit exceeded. Please wait and try again.");
              return;
            }
        
            const data = await response.json();
            const moodResponse = data?.contents?.[0]?.parts?.[0]?.text || "Unable to determine mood.";
            setMood(moodResponse);
          } catch (error) {
            console.error("Error with Gemini API:", error);
            setMood("Unable to determine mood.");
          }
        };
      
        return (
          <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
            <h2>Answer the questions to determine your mood</h2>
            {selectedGroup.map((q, idx) => (
              <div key={idx} style={{ marginBottom: '15px' }}>
                <p>{q.question}</p>
                {q.options.map((option, i) => (
                  <label key={i} style={{ display: 'block' }}>
                    <input
                      type="radio"
                      name={`question-${idx}`}
                      value={option}
                      checked={responses[idx] === option}
                      onChange={() => handleResponseChange(idx, option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            ))}
            <button onClick={determineMood} disabled={responses.includes(null)}>Submit Answers</button>
            
            {mood && (
              <div style={{ marginTop: '20px' }}>
                <h3>Your Mood: {mood}</h3>
              </div>
            )}
          </div>
        );
      }
      
      export default MoodChecker;