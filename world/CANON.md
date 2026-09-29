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
