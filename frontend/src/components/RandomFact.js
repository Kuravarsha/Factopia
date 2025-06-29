import axios from 'axios';
import { useEffect, useState } from 'react';

function RandomFact() {
  const [fact, setFact] = useState("");

  const getFact = async () => {
    const res = await axios.get("http://127.0.0.1:8000/fact");
    setFact(res.data.text);
  };

  useEffect(() => {
    getFact();
  }, []);

  return (
    <div>
      <h2>🎯 Random Fact</h2>
      <p>{fact}</p>
      <button onClick={getFact}>Get New Fact</button>
    </div>
  );
}

export default RandomFact;
