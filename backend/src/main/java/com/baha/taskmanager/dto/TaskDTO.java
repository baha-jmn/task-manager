package com.baha.taskmanager.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Future;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TaskDTO {

    @NotBlank
    private String title;

    private String description;

    @NotBlank
    private String status;

    @Min(1)
    @Max(5)
    private int priority;

    @Future
    private LocalDate dueDate;
}
