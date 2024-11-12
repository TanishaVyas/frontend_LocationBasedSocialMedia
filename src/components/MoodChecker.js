import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchNearbyGroups, fetchAllCategories } from "../services/groupService";

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
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * questionGroups.length);
    setSelectedGroup(questionGroups[randomIndex]);
    setResponses(new Array(3).fill(null));
  }, []);

  useEffect(() => {
    fetchAllCategories()
      .then((fetchedCategories) => {
        setCategories(fetchedCategories);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleResponseChange = (index, response) => {
    const newResponses = [...responses];
    newResponses[index] = response;
    setResponses(newResponses);
  };

  const determineMood = async () => {
    const apiKey = "AIzaSyAg8l4ecjT9jfZRKeFmx8YmCTp_DkRjl9A"; // Replace with your Gemini API key
    const questionsAndAnswers = selectedGroup.map((q, idx) => `Q${idx + 1}: ${q.question} - A: ${responses[idx]}`).join(", ");
    
    const prompt = `Here are the user's responses: ${questionsAndAnswers}. Based on these answers, return only one of the following moods: happy, sad, stressed, 
    confused, or hungry. Also choose the category to visit based on the mood. Categories are ${categories} give the answer amount of words and return only two things mood and category`;

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
                  text: prompt
                }
              ]
            }
          ]
        })
      });

      if (response.status === 429) {
        setMood("Rate limit exceeded. Please wait and try again.");
        return;
      }

      const data = await response.json();
      let moodResponse = data.candidates[0].content.parts[0].text.trim() || "Unable to determine mood.";

      const possibleMoods = ["happy", "sad", "stressed", "confused", "hungry"];
      let detectedMood = possibleMoods.find(mood => moodResponse.toLowerCase().includes(mood));
      let detectedCategory = categories.find(category => moodResponse.toLowerCase().includes(category.toLowerCase()));

      setMood(detectedMood);
      setSelectedCategory(detectedCategory);
    } catch (error) {
      console.error("Error with Gemini API:", error);
      setMood("Unable to determine mood.");
    }
  };

  const navigate = useNavigate();
  const handleNavigateToGroup = () => {
    navigate('/search', { state: { category: selectedCategory } });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto', backgroundColor: '#f4f7f6', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#333', fontFamily: 'Arial, sans-serif' }}>Answer the questions to determine your mood</h2>
      
      {selectedGroup.map((q, idx) => (
        <div key={idx} style={{ marginBottom: '15px' }}>
          <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#555' }}>{q.question}</p>
          {q.options.map((option, i) => (
            <label key={i} style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
              <input
                type="radio"
                name={`question-${idx}`}
                value={option}
                checked={responses[idx] === option}
                onChange={() => handleResponseChange(idx, option)}
                style={{ marginRight: '8px' }}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      
      <button 
        onClick={determineMood} 
        disabled={responses.includes(null)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: responses.includes(null) ? 'not-allowed' : 'pointer',
          width: '100%',
          fontSize: '16px',
        }}
      >
        Submit Answers
      </button>

      {mood && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <h3 style={{ color: '#333', fontFamily: 'Arial, sans-serif' }}>Your Mood: {mood}</h3>
          {selectedCategory && (
            <button 
              onClick={handleNavigateToGroup}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007BFF',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
                marginTop: '10px'
              }}
            >
              Go to {selectedCategory} Groups
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default MoodChecker;
