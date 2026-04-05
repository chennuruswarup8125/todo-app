package com.demo.todo.controller;

import com.demo.todo.model.Todo;
import com.demo.todo.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")  // allow frontend
public class TodoController {

    private final TodoService service;

    // GET /api/todos
    @GetMapping
    public List<Todo> getAll() {
        return service.getAll();
    }

    // GET /api/todos/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Todo> getOne(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/todos
    @PostMapping
    public ResponseEntity<Todo> create(
            @RequestBody Todo todo) {
        Todo saved = service.create(todo);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(saved);
    }

    // PUT /api/todos/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Todo> update(
            @PathVariable Long id,
            @RequestBody Todo todo) {
        return ResponseEntity.ok(service.update(id, todo));
    }

    // DELETE /api/todos/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}