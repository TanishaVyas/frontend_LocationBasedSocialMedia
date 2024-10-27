import React, { useState } from "react";
import { postUser } from "../api";

function Form() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [responseMessage, setResponseMessage] = useState("");

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await postUser(form);
      setResponseMessage(data.message || "User registered successfully");
    } catch (error) {
      setResponseMessage("Failed to register user");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <span>Username</span>
        <input
          type="text"
          name="username"
          onChange={handleForm}
          value={form.username}
        />
        <span>Password</span>
        <input
          type="password"
          name="password"
          onChange={handleForm}
          value={form.password}
        />
        <input type="submit" value="Register" />
      </form>
      <p>{responseMessage}</p>
    </div>
  );
}

export default Form;
