import axios from "axios";
import { useEffect, useState } from "react";
import EditFactForm from "./EditFactForm";

function AllFacts() {
  const [facts, setFacts] = useState([]);
  const [editingFact, setEditingFact] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const fetchFacts = () => {
    axios.get("http://127.0.0.1:8000/facts")
      .then(res => setFacts(res.data));
  };

  useEffect(() => {
    fetchFacts();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/facts/${id}`);
    fetchFacts();
  };

  const handleUpdateComplete = () => {
    setEditingFact(null);
    fetchFacts();
  };

  // 🔍 Filtering logic
  const filteredFacts = facts.filter(fact =>
    fact.text.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter === "all" || fact.category.toLowerCase() === categoryFilter)
  );

  // 🔄 Unique categories for dropdown
  const categories = ["all", ...new Set(facts.map(f => f.category.toLowerCase()))];

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>📚 All Facts</h2>

      {/* 🔍 Search + Filter */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search facts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "8px", width: "250px", marginRight: "10px" }}
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{ padding: "8px" }}
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat.toUpperCase()}</option>
          ))}
        </select>
      </div>

      {/* 🧾 Fact List */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredFacts.map(fact => (
          <li key={fact.id} style={{
            background: "#fff",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
          }}>
            {editingFact?.id === fact.id ? (
              <EditFactForm
                fact={fact}
                onUpdate={handleUpdateComplete}
                onCancel={() => setEditingFact(null)}
              />
            ) : (
              <>
                <strong style={{ color: "#555" }}>[{fact.category}]</strong> {fact.text}
                <div style={{ float: "right" }}>
                  <button onClick={() => setEditingFact(fact)} style={{ marginRight: "8px" }}>✏️ Edit</button>
                  <button onClick={() => handleDelete(fact.id)}>🗑️ Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllFacts;
