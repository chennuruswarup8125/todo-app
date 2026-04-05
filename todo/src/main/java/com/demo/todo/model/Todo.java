package com.demo.todo.model;

import jakarta.persistence.*;
import lombok.*;

@Entity            // marks this as a DB table
@Table(name = "todos")
@Data              // Lombok: generates getters/setters
@NoArgsConstructor
@AllArgsConstructor
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;       // auto-incremented PK

    @Column(nullable = false)
    private String title;  // todo text

    private String description;

    private boolean completed = false; // default
}