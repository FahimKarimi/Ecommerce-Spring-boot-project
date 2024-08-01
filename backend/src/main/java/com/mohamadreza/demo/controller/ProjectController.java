package com.mohamadreza.demo.controller;

import com.mohamadreza.demo.model.Project;
import com.mohamadreza.demo.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    //    Add New Project
    @PostMapping("/add")
    public Project addNewProject(@RequestBody Project project) {
        return projectService.addNewProject(project);
    }

    @GetMapping("/allProjects")
    public List<Project> getAllStudents() {
        return projectService.getAllProjects();
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<Optional<Project>> getProjectById(@PathVariable("projectId") int id) {
        Optional<Project> project = projectService.findProjectById(id);
        return ResponseEntity.ok(project);
    }

    @PutMapping("/{projectId}")
    public ResponseEntity<Project> updateProjectById(@RequestBody Project project, @PathVariable("projectId") int id) {
        Project updatedProject = projectService.updateProjectById(project, id);
        return ResponseEntity.accepted().body(updatedProject);
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<?> deleteProjectById(@PathVariable("projectId") int id) {
        projectService.deleteProjectById(id);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

}
