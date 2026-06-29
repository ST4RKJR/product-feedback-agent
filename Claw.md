# Claw: Product Feedback → PRD Autonomous Agent

## 🔗 GitHub Repository Link
[https://github.com/ST4RKJR/product-feedback-agent.git](https://github.com/ST4RKJR/product-feedback-agent.git)

---

## 🤖 Brief Explanation of the Agent and Workflow
**Claw** is an autonomous AI agent designed to act as a virtual Product Manager. Its primary objective is to ingest noisy, unstructured customer feedback and seamlessly transform it into actionable, structured Product Requirements Documents (PRDs). 

### End-to-End Workflow:
1. **Ingestion**: The user pastes raw customer feedback text or uploads a bulk CSV file containing feedback strings into the React UI.
2. **Analysis & Synthesis**: The Express backend receives the data and prompts the Gemini LLM to act as a PM. The agent reads every item, classifies them (Bug, Feature Request, Complaint, Praise), groups identical topics together, counts occurrences, assigns priority levels (High/Medium/Low), and calculates a confidence score for its synthesis.
3. **Escalation**: If the agent encounters feedback that is too ambiguous or vague (resulting in a low confidence score), it refuses to categorize it and instead escalates it to a "Human Review" queue.
4. **Drafting**: The synthesized, high-confidence groups are then passed back into the agent to autonomously draft a complete Product Requirements Document (PRD), focusing on Executive Summary, Objectives, Features, Bug Fixes, and Success Metrics.

---

## 📥 Input and Output Examples

### Input Example (CSV or Text)
> "The app crashes immediately when I try to open the analytics dashboard on my iPad."
> "I love the new dark mode! It's so much easier on the eyes."
> "The login button sometimes requires me to click it twice before it actually logs me in."
> "Dashboard takes a solid 10 seconds to load sometimes. Too slow."

### Output Example
**1. Synthesized Insights Table:**
* **Topic:** Dashboard Performance
* **Category:** Complaint
* **Priority:** Medium
* **Confidence:** 95%
* **Description:** "The main dashboard takes too long to load data."

**2. Generated PRD (Markdown excerpt):**
```markdown
# Product Requirements Document
## 1. Executive Summary
Based on recent feedback, this PRD outlines critical updates required. Focus is on resolving high-priority login issues and improving dashboard load times.
## 2. Bug Fixes
* **Login Button**: Fix the event listener bug causing the login button to require multiple clicks.
```

---

## 🛠️ Tools, APIs, Models, and Databases Used
* **Frontend**: React (Vite) with Vanilla CSS (Modern Glassmorphism UI)
* **Backend**: Node.js + Express
* **File Handling**: Multer (for in-memory CSV parsing)
* **LLM Engine**: Google Gemini API (`@google/genai` SDK) utilizing the `gemini-2.5-pro` model for advanced reasoning and formatting.
* **Architecture**: Client-Server standard REST API.

*(Note: In alignment with the project requirements to keep the scope realistic and avoid overengineering, a dedicated persistent database was omitted for this 2-day student MVP version).*

---

## ⚠️ Exception Handling and Escalation Logic
* **Agent Escalation (Human-in-the-Loop)**: The LLM is explicitly prompted to score its own confidence on a scale of 0-100. If the text is vague (e.g., *"It just feels weird sometimes"*), the agent flags it with a low confidence score and escalates it to a dedicated **"Human Review Required"** table in the UI, attaching a specific reason why it couldn't classify it.
* **API Fallbacks**: If the `GEMINI_API_KEY` is missing, the backend explicitly throws a `500` error halting the process instead of failing silently, ensuring developers properly configure the environment.
* **Input Validation**: The frontend and backend both validate that non-empty text or valid `.csv` files are provided before attempting LLM ingestion.

---

## 🚀 What the Current Version Can Do Autonomously
* Ingest and parse bulk customer feedback seamlessly.
* Classify sentiment and intent (Bug, Feature, Praise, Complaint).
* Synthesize and group dozens of redundant feedback items into single actionable topics.
* Score its own confidence on its analytical decisions.
* Flag unprocessable data for manual human review.
* Draft a complete, formatted PRD based solely on the insights it just synthesized.

---

## 🔮 Improvements Planned for the Next Version
1. **Automated Data Pipelines**: Replace manual CSV uploads with direct API integrations to scrape feedback from Zendesk, Twitter, App Store Reviews, and Discord continuously in the background.
2. **Database Persistence**: Integrate MongoDB or PostgreSQL to store historical feedback, allowing the agent to track if a specific bug is increasing in frequency over time.
3. **Downstream Automation**: Allow the agent to automatically push the generated PRD directly to Notion/Confluence, and autonomously draft individual Jira Tickets for the engineering team based on the PRD's "Bug Fixes" and "Features" sections.
4. **User Authentication**: Implement JWT/OAuth so multiple Product Managers can maintain separate workspaces.
