package com.demo.todo.service;

import com.demo.todo.model.Todo;
import com.demo.todo.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
@RequiredArgsConstructor  // Lombok constructor injection
public class TodoService {

    private final TodoRepository repo;

    // READ ALL
    public List<Todo> getAll() {
        return repo.findAll();
    }

    // READ ONE
    public Optional<Todo> getById(Long id) {
        return repo.findById(id);
    }

    // CREATE
    public Todo create(Todo todo) {
        return repo.save(todo);
    }

    // UPDATE
    public Todo update(Long id, Todo updated) {
        Todo existing = repo.findById(id)
                .orElseThrow(() -> new
                        RuntimeException("Todo not found"));
        existing.setTitle(updated.getTitle());
        existing.setDescription(updated.getDescription());
        existing.setCompleted(updated.isCompleted());
        return repo.save(existing);
    }

    // DELETE
    public void delete(Long id) {
        repo.deleteById(id);
    }
}