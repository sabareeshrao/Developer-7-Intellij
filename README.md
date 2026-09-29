# Developer-7-Intellij — GeoOps Developer Playback

This repository rebuilds the **Developer-7 / GeoOps** Java + Spring Boot project from scratch as an interactive, set-by-set developer learning journey.

## Current status

**Set 1 — Development Environment & Spring Boot Bootstrap — COMPLETE**

The project is deliberately small at this point. Set 1 establishes:

- Java 17
- Maven
- Spring Boot 3.3.5
- Spring MVC / embedded Tomcat
- Bean Validation
- Actuator
- Lombok
- JUnit 5 / Spring Boot Test
- a first in-memory GeoOps REST vertical slice
- Postman verification
- Git / GitHub / GitHub Actions

No database, security, messaging, Docker, Kubernetes, or monitoring stack is introduced early.

## Learning experience

The site reuses the simulator/runtime from `sabareeshrao/Experiment-VS-Code`.

Each step:

1. performs visible work in the software a developer would really use;
2. highlights the exact control, code, command, or result;
3. explains the step with short YouTube-style narration;
4. reconstructs simulator state cumulatively, so later sets continue the same GeoOps project.

Narration is validated to reject repeated full explanation sentences.

## Set 1 runnable slice

```text
HTTP
  ↓
ProjectController
  ↓
ProjectService
  ↓
in-memory GeoProject records
```

Endpoints:

- `GET /actuator/health`
- `GET /api/projects`
- `POST /api/projects`

## Build the Java project

```bash
mvn clean test
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

The exact reusable simulator snapshot is stored in `MASTER_SOFTWARE_REF`.

## Current software in Set 1

Spring Initializr · IntelliJ IDEA · Postman · Git · GitHub · GitHub Actions

## Next set

Set 2 will add the controlled GIS preflight CLI and Java process-lifecycle behavior around `System.exit()`. The primary simulator will remain **IntelliJ IDEA**, with its integrated terminal used where command-line execution helps explain the process boundary.
