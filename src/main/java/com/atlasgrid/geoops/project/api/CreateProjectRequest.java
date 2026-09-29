package com.atlasgrid.geoops.project.api;

import jakarta.validation.constraints.NotBlank;

public record CreateProjectRequest(
        @NotBlank String projectCode,
        @NotBlank String name,
        @NotBlank String coordinateReferenceSystem
) {
}
