package com.mohamadreza.demo.model;

// Import annotations and packages

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import java.util.List;

// Annotate the class as an entity and map it to the table name
@Entity
@Getter
@Setter
@Table(name = "employees")
public class Employee {

    // Declare the fields and annotate them with the column names
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NonNull
    private String name;

    private String role;
    private String team;
    private String status;
    private int age;

    private String avatar;

    @NonNull
    private String email;

    // Generate constructors, getters, setters, and toString methods
    public Employee() {
    }

    public Employee(int id, @NonNull String name, String role, String team, String status, int age, String avatar, @NonNull String email) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.team = team;
        this.status = status;
        this.age = age;
        this.avatar = avatar;
        this.email = email;
    }

    // Getters and setters omitted for brevity

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", role='" + role + '\'' +
                ", team='" + team + '\'' +
                ", status='" + status + '\'' +
                ", age=" + age +
                ", avatar='" + avatar + '\'' +
                ", email='" + email + '\'' +
                '}';
    }

    @JsonIgnore
    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
    private List<Project> projects;
}
