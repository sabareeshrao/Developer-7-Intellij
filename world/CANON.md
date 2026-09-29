# GeoOps World Canon

**Company:** AtlasGrid Geospatial Systems  
**Product:** GeoOps  
**Domain:** GIS / geospatial operations

## Set 1 canon

GeoOps starts as a small Java 17 / Spring Boot service. Project intake is held in memory. The first project fields are project code, name, coordinate reference system and creation time.

```text
HTTP → ProjectController → ProjectService → in-memory GeoProject records
```

No database, security layer, messaging platform, container platform, or production monitoring stack exists yet.

The project is a fictional learning environment and must not be represented as factual employment history.
