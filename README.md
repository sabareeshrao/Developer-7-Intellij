# Developer-7-Intellij — GeoOps Developer Playback

This repository rebuilds the **Developer-7 / GeoOps** Java + Spring Boot project from scratch as an interactive, set-by-set developer learning journey.

## Current status

**Set 3 — Project Methodology / Agile-Scrum — COMPLETE**

The project now contains:

- Java 17
- Maven
- Spring Boot 3.3.5
- Spring MVC / embedded Tomcat
- Bean Validation
- Actuator
- Lombok
- JUnit 5 / Spring Boot Test
- an in-memory GeoOps REST slice
- a standalone GIS dataset preflight CLI
- explicit process exit codes
- graceful Spring Boot shutdown
- Postman verification
- Git / GitHub / GitHub Actions

No database, security, messaging, Docker, Kubernetes, or monitoring stack has been introduced early.

## Learning experience

The site reuses the simulator/runtime from `sabareeshrao/Experiment-VS-Code`.

Each step:

1. performs visible work in the actual software surface;
2. highlights the exact control, code line, command, or result;
3. uses zero-knowledge, reason-first explanation bullets;
4. reconstructs simulator state cumulatively so later sets continue the same GeoOps project.

Source creation follows the master pattern:

```text
create empty file → typeCode → exact code-line highlight
```

Terminal commands follow:

```text
typeTerminal → visible typing → yellow command boundary → exit status
```

## Current architecture

```text
HTTP
  ↓
ProjectController
  ↓
ProjectService
  ↓
in-memory GeoProject records

Inbound GIS file
  ↓
DatasetPreflightValidator
  ↓
PreflightResult
  ↓
GeoOpsPreflightCli
  ↓
process exit code
```

## Build the Java project

```bash
mvn clean verify
mvn spring-boot:run
```

## Learning site architecture

```text
Experiment-VS-Code
(master player + simulators)
        ↓ pinned by exact commit
Developer-7-Intellij
(project + curriculum + generated player data)
        ↓
GitHub Pages
```

The reusable simulator snapshot is pinned in `MASTER_SOFTWARE_REF`.

## Software used through Set 2

Spring Initializr · IntelliJ IDEA · Maven Central · Postman · Git · GitHub · GitHub Actions

## Next set

Set 3 follows the original Developer-7 order: **Project Methodology / Agile-Scrum**.

It will connect backlog work to GitHub issues, branches, pull requests, peer review, CI, Sprint Review, and Retrospective while continuing the same GeoOps repository.

## Set 3 delivery workflow

GeoOps now records how work moves from idea to reviewed code:

```text
Backlog → Ready → 2-week Sprint → feature branch
        → Pull Request → review + GitHub Actions
        → merge → Done → Sprint Review → Retrospective
```

Definition of Ready, Definition of Done, Sprint 001, the feature issue template, and the pull-request template are versioned beside the code.

## Current course size

- Set 1: 45 simulation steps
- Set 2: 26 simulation steps
- Set 3: 31 simulation steps
- Total through Set 3: 102 cumulative steps

## Next set

Set 4 follows the original Developer-7 order: **StringBuilder / StringBuffer**.
