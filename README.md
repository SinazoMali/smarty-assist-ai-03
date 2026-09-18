# AI Workplace Ally

Build a modern, responsive SaaS web app called **AI Workplace Productivity Assistant**.



### Core Requirement



**ALL user-facing answers, summaries, insights, recommendations, task plans, and chatbot responses MUST be dynamically AI-generated.**



Do NOT use hard-coded, placeholder, mocked, predefined, or generic responses. The AI must analyze the user's actual input and generate a contextual response.



### Features



**1. Meeting Notes Summarizer**



* User enters or pastes meeting notes.

* AI analyzes the actual notes and generates:



  * Concise summary

  * Key discussion points

  * Action items

  * Decisions

  * Deadlines

* AI output must be editable.



**2. AI Task Planner**



* User enters their actual tasks, priorities, deadlines, and available time.

* AI analyzes the input and creates a personalized daily or weekly schedule.

* AI prioritizes tasks based on urgency, importance, deadlines, and workload.

* Generated plan must be editable.



**3. Article & Topic Summarizer**



* User can enter a topic, article text, or URL.

* AI analyzes the provided content/input and generates:



  * Summary

  * Key insights

  * Important points

  * Practical recommendations

  * Relevant source/platform links when available

* Do not display generic summaries unrelated to the user's input.



**4. AI Workplace Chatbot**



* Provide a conversational AI assistant.

* Users can ask workplace, productivity, planning, writing, summarization, or research questions.

* Every response must be dynamically generated based on the user's prompt and conversation context.

* Include useful suggested prompts, but chatbot answers must never be hard-coded.



### UI/UX



* Modern professional SaaS dashboard.

* Light grey background with clean white cards.

* Responsive desktop, tablet, and mobile design.

* Sidebar navigation:



  * Dashboard

  * Meeting Summarizer

  * Task Planner

  * Article & Topic Summarizer

  * AI Chat

* Clear input areas, buttons, cards, tabs, loading states, and empty states.

* AI-generated outputs should be clearly separated from user input.

* Allow users to edit AI-generated results.



### AI Behavior



* Always analyze the user's actual input before responding.

* Provide specific, contextual, useful answers rather than generic content.

* If the user's input is insufficient, ask a relevant clarification question instead of inventing information.

* Show an appropriate loading state while AI is generating a response.

* Handle AI errors gracefully.



### Responsible AI



Display a disclaimer:



"AI-generated content may contain errors or omissions. Review important information before using it for workplace, business, legal, financial, or other significant decisions."



### Technical Scope



* Frontend/UI focused.

* No backend database.

* No authentication.

* Do not permanently store user data.

* Use temporary in-session state only.

* Keep the implementation simple and suitable for a Lovable Free account with limited credits.

* **Prioritize real AI-generated functionality over mock data, static examples, or decorative features.**

*

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://smarty-assist-ai-03.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/bf611d24-e999-448e-b0d0-55e2c29e8f59).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
