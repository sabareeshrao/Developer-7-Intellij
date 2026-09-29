# Set 1 — Development Environment and Spring Boot Bootstrap

**Status:** 1/387+  
**Anchor:** ⭐ What's your preferred development environment and tool set for Spring Boot application?

Set 1 creates the first runnable GeoOps vertical slice instead of starting from a finished codebase.

## Development baseline

- IntelliJ IDEA is the primary IDE.
- Java 17 is the project JDK.
- Maven owns build and dependency management.
- Spring Boot 3.3.5 is pinned in the original GeoOps baseline.
- Spring Web provides Spring MVC, JSON support and embedded Tomcat.
- Bean Validation validates request input.
- Actuator exposes health and info endpoints.
- Lombok is available for selected boilerplate reduction.
- JUnit 5 / Spring Boot Test verifies the application context.
- Git and GitHub provide source control.
- GitHub Actions runs Maven verification.

## Runtime slice

```text
POST /api/projects
        ↓
ProjectController
        ↓
ProjectService
        ↓
in-memory List<GeoProject>
```

A database is intentionally absent. Persistence arrives only when a later set justifies it.

## Learning playback

The simulator walks through project generation, opening the project in IntelliJ, understanding Maven dependency resolution, creating the Java classes, running tests, starting Spring Boot, exercising the API in Postman, and completing the Git/GitHub/CI handoff.

The explanation card uses conversational YouTube-style narration. Full explanation sentences may not be duplicated between steps; `scripts/build-player-data.py` enforces that rule.
