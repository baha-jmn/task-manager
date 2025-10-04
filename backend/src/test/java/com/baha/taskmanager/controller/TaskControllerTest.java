package com.baha.taskmanager.controller;

import com.baha.taskmanager.dto.TaskDTO;
import com.baha.taskmanager.model.Task;
import com.baha.taskmanager.service.TaskService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDate;
import java.util.Collections;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
public class TaskControllerTest {

    private final MockMvc mockMvc;

    @Mock
    private TaskService taskService;

    @InjectMocks
    private TaskController taskController;

    public TaskControllerTest() {
        mockMvc = MockMvcBuilders.standaloneSetup(taskController).build();
    }

    @Test
    void getTasks_shouldReturnListOfTasks() throws Exception {
        Task task = new Task();
        task.setTitle("Test Task");
        task.setDescription("Test Desc");
        task.setStatus("TODO");
        task.setPriority(1);
        task.setDueDate(LocalDate.now().plusDays(1));

        when(taskService.getAllTasks()).thenReturn(Collections.singletonList(task));

        mockMvc.perform(get("/api/tasks"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Test Task"));
    }

    @Test
    void createTask_shouldReturnCreatedTask() throws Exception {
        TaskDTO dto = new TaskDTO();
        dto.setTitle("New Task");
        dto.setDescription("Desc");
        dto.setStatus("TODO");
        dto.setPriority(1);
        dto.setDueDate(LocalDate.now().plusDays(1));

        Task task = new Task();
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setStatus(dto.getStatus());
        task.setPriority(dto.getPriority());
        task.setDueDate(dto.getDueDate());

        when(taskService.createTask(dto)).thenReturn(task);

        mockMvc.perform(post("/api/tasks")
                        .contentType("application/json")
                        .content(new ObjectMapper().writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("New Task"));
    }
}
