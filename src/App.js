import './App.css';
import React, { useState } from 'react'; 

function App() {
  const [form, setForm] = useState({ username: '', password: '' }); // Initialize state

  const handleForm = (e) => {
    console.log(`${e.target.name}: ${e.target.value}`);
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
      const response = await fetch('http://localhost:8080/demo', {
        method: 'POST',
        body:JSON.stringify(form),
        headers:{
          'Content-Type':'application/json'
        }
      });
      const data = await response.json();
      console.log(data);
    
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <p>{JSON.stringify(form)}</p>
        <span>Username</span>
        <input type="text" name="username" onChange={handleForm} value={form.username} />
        <span>Password</span>
        <input type="password" name="password" onChange={handleForm} value={form.password} />
        <input type="submit" />
      </form>
    </div>
  );
}

export default App;
