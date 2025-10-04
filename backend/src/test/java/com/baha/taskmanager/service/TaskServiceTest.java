package com.baha.taskmanager.service;

import com.baha.taskmanager.dto.TaskDTO;
import com.baha.taskmanager.exception.TaskNotFoundException;
import com.baha.taskmanager.model.Task;
import com.baha.taskmanager.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createTask_shouldSaveAndReturnTask() {
        TaskDTO dto = new TaskDTO();
        dto.setTitle("Test Task");
        dto.setDescription("Test Description");
        dto.setStatus("TODO");
        dto.setPriority(1);
        dto.setDueDate(LocalDate.now().plusDays(1));

        Task task = new Task();
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setStatus(dto.getStatus());
        task.setPriority(dto.getPriority());
        task.setDueDate(dto.getDueDate());

        when(taskRepository.save(any(Task.class))).thenReturn(task);

        Task savedTask = taskService.createTask(dto);

        assertNotNull(savedTask);
        assertEquals("Test Task", savedTask.getTitle());
        verify(taskRepository, times(1)).save(any(Task.class));
    }

    @Test
    void getTaskById_whenTaskExists_shouldReturnTask() {
        Task task = new Task();
        task.setId("1");
        task.setTitle("Test");

        when(taskRepository.findById("1")).thenReturn(Optional.of(task));

        Task found = taskService.getTaskById("1");

        assertNotNull(found);
        assertEquals("Test", found.getTitle());
    }

    @Test
    void getTaskById_whenTaskNotFound_shouldThrowException() {
        when(taskRepository.findById("1")).thenReturn(Optional.empty());

        assertThrows(TaskNotFoundException.class, () -> taskService.getTaskById("1"));
    }

    @Test
    void getAllTasks_shouldReturnTaskList() {
        when(taskRepository.findAll()).thenReturn(List.of(new Task(), new Task()));

        List<Task> tasks = taskService.getAllTasks();

        assertEquals(2, tasks.size());
        verify(taskRepository, times(1)).findAll();
    }

    @Test
    void deleteTask_shouldCallRepositoryDelete() {
        String id = "1";
        doNothing().when(taskRepository).deleteById(id);

        taskService.deleteTask(id);

        verify(taskRepository, times(1)).deleteById(id);
    }
}
