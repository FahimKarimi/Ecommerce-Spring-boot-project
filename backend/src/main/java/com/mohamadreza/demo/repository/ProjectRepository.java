package com.mohamadreza.demo.repository;

import com.mohamadreza.demo.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Integer> {
    Optional<Project> findProjectById(int id);
}
