package com.baha.taskmanager.service;

import com.baha.taskmanager.exception.TaskNotFoundException;
import com.baha.taskmanager.model.Task;
import com.baha.taskmanager.repository.TaskRepository;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class TaskService {
    private final TaskRepository taskRepository;
    private final MongoTemplate mongoTemplate;

    public TaskService(TaskRepository taskRepository, MongoTemplate mongoTemplate) {
        this.taskRepository = taskRepository;
        this.mongoTemplate = mongoTemplate;
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task getTaskById(String id) {
        return taskRepository.findById(id).orElseThrow(() -> new TaskNotFoundException(id));
    }

    public Task updateTask(String id, Task updatedTask) {
        Task task = getTaskById(id);
        task.setTitle(updatedTask.getTitle());
        task.setDescription(updatedTask.getDescription());
        task.setStatus(updatedTask.getStatus());
        task.setPriority(updatedTask.getPriority());
        task.setDueDate(updatedTask.getDueDate());
        return taskRepository.save(task);
    }

    public void deleteTask(String id) {
        taskRepository.deleteById(id);
    }

    public List<Task> filterTasks(
            String status,
            Integer priority,
            Date dueDateStart,
            Date dueDateEnd,
            String search,
            String sortBy,
            String sortDir
    ) {
        Query query = new Query();

        if (status != null) {
            query.addCriteria(Criteria.where("status").is(status));
        }

        if (priority != null) {
            query.addCriteria(Criteria.where("priority").is(priority));
        }

        if (dueDateStart != null &&  dueDateEnd != null) {
            query.addCriteria(Criteria.where("dueDate").gte(dueDateStart).lte(dueDateEnd));
        }


        if (search != null && !search.isEmpty()) {
            query.addCriteria(new Criteria().orOperator(
                    Criteria.where("title").regex(search, "i"),
                    Criteria.where("description").regex(search, "i")
            ));
        }

        if(sortBy != null && !sortBy.isEmpty()) {
            Sort.Direction direction = "desc".equalsIgnoreCase(sortDir) ? Sort.Direction.DESC : Sort.Direction.ASC;
            query.with(Sort.by(direction, sortBy));
        }

        return mongoTemplate.find(query, Task.class);
    }
}
