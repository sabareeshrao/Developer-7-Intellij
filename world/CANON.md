# GeoOps World Canon

**Company:** AtlasGrid Geospatial Systems  
**Product:** GeoOps  
**Domain:** GIS / geospatial operations

## Set 1 canon

GeoOps starts as a Java 17 / Spring Boot service. Project intake is held in memory.

```text
HTTP → ProjectController → ProjectService → in-memory GeoProject records
```

No database, security layer, messaging platform, container platform, or production monitoring stack exists yet.

## Set 2 canon — process boundaries

GeoOps now distinguishes between two Java process types.

### Long-running Spring Boot service

The web service must not terminate the JVM from controller, service, or normal business logic.

Normal service termination uses Spring Boot graceful shutdown with a 20-second shutdown-phase timeout.

### Short-lived GIS preflight CLI

`GeoOpsPreflightCli` checks an inbound GIS dataset before a batch-style workflow submits it to GeoOps.

`DatasetPreflightValidator` returns a `PreflightResult`; only the outer CLI boundary converts a failed result into a non-zero process status.

Established process codes:

- 0 = success
- 2 = invalid CLI usage
- 3 = dataset does not exist
- 4 = path is not a regular file
- 5 = unsupported dataset type

Supported extensions at this stage are `.csv`, `.json`, and `.geojson`.

The project is a fictional learning environment and must not be represented as factual employment history.

## Set 3 canon — Agile / Scrum delivery

GeoOps now uses an Agile/Scrum-style delivery model with a 2-week sprint cadence.

The established delivery flow is:

```text
Backlog
  ↓
Refined / Ready
  ↓
Sprint Planning
  ↓
feature branch
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

A story is Ready only when its outcome and acceptance criteria are understood, major dependencies are known, required GIS examples or sample data are available when needed, and no unresolved blocker prevents starting.

A story is Done only after applicable implementation, automated testing, CI, review, GIS/data checks, documentation, and acceptance criteria are complete.

Development uses short-lived feature branches. Pull requests are reviewed before merge, and GitHub Actions must pass before merge.

Sprint 001 records three connected stories:

1. GEO-1 — Bootstrap GeoOps.
2. GEO-2 — Preflight inbound GIS datasets.
3. GEO-3 — Establish the delivery workflow.

Set 3 introduces process artifacts only; it does not add a new runtime framework or database.
