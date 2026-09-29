package com.atlasgrid.geoops.project.domain;

import java.time.Instant;
import java.util.UUID;

public record GeoProject(
        UUID id,
        String projectCode,
        String name,
        String coordinateReferenceSystem,
        Instant createdAt
) {
}
