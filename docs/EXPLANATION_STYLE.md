# Explanation Card Style

The explanation card must sound like a developer building the project with the learner in a YouTube walkthrough.

It must **not** sound like architecture documentation, a README, an interview answer, or a textbook.

## Voice

Good narration sounds like:

- "Alright, this is where our GeoOps application actually begins."
- "Now look at @SpringBootApplication."
- "Here's why we're doing this."
- "Notice what we are not adding yet."
- "Think of this as the base address for project APIs."
- "Watch what happens when we send this request."
- "For now, we're keeping this in memory."
- "Later, when the project actually needs a database, we'll add one."

These phrases are examples of the tone, not fixed templates. Do not repeat them mechanically.

## How to explain a step

For each visible action:

1. Start with what the learner is looking at right now.
2. Explain the idea in simple spoken English.
3. Introduce the technical term only after the learner understands the basic idea.
4. Explain why the code or setting is needed.
5. Connect it to code we already created when that connection helps.
6. Show a small flow when useful.
7. Mention what comes next only when it naturally helps the learner understand the current step.

## Language rule

Prefer:

> "Maven is going to help us manage the libraries GeoOps needs."

Avoid:

> "Maven establishes a repeatable dependency-management and build abstraction."

Prefer:

> "The controller handles HTTP. The service handles the work."

Avoid:

> "The application layer separates transport concerns from business responsibilities."

Prefer:

> "If we stop the application right now, this in-memory project disappears."

Avoid:

> "The current implementation has non-durable process-scoped state."

If a simpler sentence can teach the same idea, use the simpler sentence.

## Detail rule

Detailed explanations are welcome.

The problem is not length. The problem is dense wording.

A longer explanation is better when it walks through the code naturally:

```text
Postman
   ↓
ProjectController
   ↓
ProjectService
   ↓
GeoProject
```

Shorter is not automatically better.

## What the explanation should do

The learner should be able to answer:

- What am I looking at?
- What does this line, annotation, file, setting, or button do?
- Why are we using it here?
- How does it connect to what we already built?
- What would happen if we did this differently?
- Where is the project going next?

Do not force all six into every step. Use only what helps that specific moment.

## Forbidden tone

Do not write sentences like:

- "This establishes the architecture decision."
- "This creates a repeatable path from developer workstation to CI."
- "This source scaffold provides the runtime baseline."
- "The model establishes a coordinated dependency set."
- "This boundary preserves separation of concerns."

Those ideas can still be taught, but explain them conversationally first.

## Repetition rule

Do not reuse the same full explanation sentence in two steps.

Do not begin every card with "Now we're..." and do not end every card with "Next we're going to...".

Vary the narration naturally.

The build script performs a sentence-level duplicate check.

## UI rule

The master global explanation card from `Experiment-VS-Code` is authoritative.

Do not create a second downstream explanation UI.

The visible code, command, result, or control must stay highlighted while the narration explains it.
