import axios from 'axios';
import { useState } from 'react';

function AddFactForm() {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://127.0.0.1:8000/facts", {
      text,
      category: category || "general"
    });
    alert("Fact added!");
    setText("");
    setCategory("");
  };

  return (
    <div>
      <h2>➕ Add a New Fact</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your fact"
          required
          style={{ width: "300px", padding: "5px" }}
        />
        <br /><br />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category (optional)"
          style={{ padding: "5px" }}
        />
        <br /><br />
        <button type="submit">Submit Fact</button>
      </form>
    </div>
  );
}

export default AddFactForm;
