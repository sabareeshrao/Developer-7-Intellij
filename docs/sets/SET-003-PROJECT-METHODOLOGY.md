# Set 3 — Project Methodology: Agile / Scrum

**Status:** 3/387+  
**Anchor:** ⭐ Can you tell me your project methodology? Is it based on Agile or Waterfall model?

## Job-experience answer established by the GeoOps repository

The fictional GeoOps project follows an **Agile/Scrum-style delivery model** with **2-week sprints**.

The reason is practical: GIS requirements can evolve after the team inspects real survey files, coordinate-reference metadata, client validation rules, and downstream integration behavior. Rather than waiting for a long Waterfall cycle, the team delivers small working increments, gets feedback, and adjusts the next backlog items.

The repository proves this methodology through:
- `docs/process/AGILE-WORKFLOW.md`
- `docs/process/DEFINITION-OF-DONE.md`
- `docs/process/SPRINT-001.md`
- `.github/ISSUE_TEMPLATE/feature.yml`
- `.github/pull_request_template.md`
- GitHub Actions CI

The delivery flow is:

```text
Backlog
  ↓
Refinement / Ready
  ↓
Sprint Planning
  ↓
Development branch
  ↓
Pull Request
  ↓
Review + CI
  ↓
Done
  ↓
Sprint Review
  ↓
Retrospective
```

## Part A

### 1. What is Agile and why would a software team choose it over Waterfall?

Agile is an iterative delivery approach where software is built and reviewed in small increments instead of completing the entire project through one long requirements → design → development → testing → release sequence.

GeoOps uses that style because GIS inputs and validation rules can become clearer only after the team sees real data and feedback.

### 2. What is Scrum and how does it organize Agile work into sprints?

Scrum is a framework commonly used to organize Agile delivery. GeoOps uses 2-week sprints with a Sprint Goal, selected backlog stories, daily coordination, development/testing, Sprint Review, and Retrospective.

### 3. What is a user story and how is it different from a task?

A user story describes a useful outcome. A task describes implementation work needed to achieve that outcome.

### 4. What are acceptance criteria?

Acceptance criteria are observable conditions that must be true for a story to be accepted.

### 5. What happens during Sprint Planning, Daily Stand-up, Sprint Review, and Retrospective?

Sprint Planning selects ready work. Daily Stand-up coordinates progress and blockers. Sprint Review demonstrates completed behavior. Retrospective identifies concrete improvements for the next sprint.

### 6. What are Definition of Ready and Definition of Done?

Definition of Ready asks whether a story is understood well enough to start. Definition of Done asks whether the completed change satisfies implementation, testing, review, documentation, and delivery expectations.

### 7. How does GitHub issue → branch → pull request → CI map to a sprint?

```text
User story
   ↓
GitHub Issue
   ↓
feature/<issue>-name
   ↓
implementation + tests + docs
   ↓
Pull Request
   ↓
review + GitHub Actions
   ↓
merge to main
   ↓
Done / Sprint Review
```

## Set 3 world decision

GeoOps now has an established delivery methodology:

- Agile/Scrum-style process
- 2-week sprint cadence
- backlog refinement before Sprint Planning
- Definition of Ready
- Definition of Done
- short-lived feature branches
- pull requests
- peer review
- CI verification
- Sprint Review
- Retrospective
