# Set 2 — System.exit() and Process Boundaries

**Status:** 2/387+  
**Anchor:** Did you get a chance to use System.exit() in your project?

## What Set 2 adds

GeoOps now has a short-lived GIS preflight CLI alongside the long-running Spring Boot web service.

The design is:

```text
command-line arguments
        ↓
DatasetPreflightValidator
        ↓
PreflightResult
        ↓
GeoOpsPreflightCli
        ↓
normal return for success
or non-zero process exit for failure
```

The validator deliberately does not terminate the JVM. It returns data that can be tested safely.

The CLI owns the process boundary.

## Process exit codes

```text
0  success
2  invalid command usage
3  dataset does not exist
4  path is not a regular file
5  unsupported dataset type
```

Supported file types in this set:

```text
.csv
.json
.geojson
```

## Web service rule

The Spring Boot application remains a long-running process.

Controller and service code must not terminate the whole JVM.

The server uses graceful shutdown through `application.yml`.

## Simulator evidence

Set 2 demonstrates the behavior through IntelliJ code typing, JUnit, Maven, Spring Boot controls, and the IntelliJ integrated terminal.

Terminal commands use the master `typeTerminal` action so command typing is visible and the current command receives the yellow boundary.

## Repository evidence

- `PreflightResult.java`
- `DatasetPreflightValidator.java`
- `GeoOpsPreflightCli.java`
- `DatasetPreflightValidatorTest.java`
- `application.yml`

## Continuity

Set 2 modifies the same GeoOps project built in Set 1.

Set 3 follows the original Developer-7 order and introduces the project methodology / Agile-Scrum workflow.
