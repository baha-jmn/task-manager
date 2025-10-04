package com.baha.taskmanager.controller;

import com.baha.taskmanager.dto.TaskDTO;
import com.baha.taskmanager.model.Task;
import com.baha.taskmanager.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping
    public ResponseEntity<Task> createTask(@Valid @RequestBody TaskDTO taskDTO) {
        Task createdTask = taskService.createTask(taskDTO);
        return ResponseEntity.ok(createdTask);
    }

    @GetMapping
    public List<Task> getTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("/{id}")
    public Task getTask(@PathVariable String id) {
        return taskService.getTaskById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable String id, @Valid @RequestBody TaskDTO taskDTO) {
        Task updatedTask = taskService.updateTask(id, taskDTO);
        return ResponseEntity.ok(updatedTask);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable String id) {
        taskService.deleteTask(id);
    }

    @GetMapping("/filter")
    public List<Task> filterTasks(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Integer priority,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dueDateStart,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dueDateEnd,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String sortDir
    ) {
        return taskService.filterTasks(status, priority, dueDateStart, dueDateEnd, search, sortBy, sortDir);
    }


}
