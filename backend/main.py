from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional, List
import random
from facts import facts
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="Factopia", description="A FastAPI trivia project", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # or ["*"] for all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data model for adding a new fact
class Fact(BaseModel):
    text: str
    category: Optional[str] = "general"

@app.get("/")
def home():
    return {"message": "Welcome to Factopia 🎉!"}

@app.get("/fact")
def get_random_fact():
    return random.choice(facts)

@app.get("/facts", response_model=List[dict])
def get_all_facts():
    return facts

@app.get("/facts/filter")
def get_facts_by_category(category: str):
    filtered = [fact for fact in facts if fact["category"].lower() == category.lower()]
    return filtered or {"message": "No facts found for this category"}


@app.post("/facts")
def add_fact(new_fact: Fact):
    new_id = max(f["id"] for f in facts) + 1 if facts else 1
    fact_entry = {
        "id": new_id,
        "text": new_fact.text,
        "category": new_fact.category
    }
    facts.append(fact_entry)
    return {"message": "New fact added!", "fact": fact_entry}

@app.delete("/facts/{fact_id}")
def delete_fact(fact_id: int):
    for fact in facts:
        if fact["id"] == fact_id:
            facts.remove(fact)
            return {"message": f"Fact with id {fact_id} deleted"}
    raise HTTPException(status_code=404, detail="Fact not found")

@app.put("/facts/{fact_id}")
def update_fact(fact_id: int, updated: Fact):
    for fact in facts:
        if fact["id"] == fact_id:
            fact["text"] = updated.text
            fact["category"] = updated.category
            return {"message": "Fact updated", "fact": fact}
    raise HTTPException(status_code=404, detail="Fact not found")
