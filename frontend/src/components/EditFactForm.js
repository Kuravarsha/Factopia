import axios from "axios";
import { useState } from "react";

function EditFactForm({ fact, onUpdate, onCancel }) {
  const [text, setText] = useState(fact.text);
  const [category, setCategory] = useState(fact.category);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(`http://127.0.0.1:8000/facts/${fact.id}`, {
      text,
      category,
    });
    onUpdate();
  };

  return (
    <form onSubmit={handleUpdate}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        style={{ width: "300px" }}
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ width: "150px", marginLeft: "10px" }}
      />
      <button type="submit" style={{ marginLeft: "10px" }}>Update</button>
      <button type="button" onClick={onCancel} style={{ marginLeft: "5px" }}>Cancel</button>
    </form>
  );
}

export default EditFactForm;
