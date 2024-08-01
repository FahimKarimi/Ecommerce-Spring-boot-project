package com.mohamadreza.demo.service;

import com.mohamadreza.demo.model.Project;
import com.mohamadreza.demo.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    public List<Project> getAllProjects() {
        List<Project> projects = projectRepository.findAll();
        if (projects.isEmpty()) {
            throw new NullPointerException("No projects found!");
        }
        return projects;
    }

    public Optional<Project> findProjectById(int id) {
        return projectRepository.findById(id);
    }

    public Project addNewProject(Project project) {
        return projectRepository.save(project);
    }

    public Project updateProjectById(Project project, int id) {
        Project updatedProject = projectRepository.findById(id).orElseThrow(() -> new NullPointerException("Project not found"));

        updatedProject.setName(project.getName());
        updatedProject.setDescription(project.getDescription());

        projectRepository.save(updatedProject);
        return updatedProject;
    }

    public void deleteProjectById(int id) {
        if (id == 0) {
            throw new NullPointerException("You need to provide ID of project to be deleted. ID can not be 0.");
        }
        Optional<Project> checkIfProjectWithIdExist = projectRepository.findById(id);
        if (checkIfProjectWithIdExist.isEmpty()) {
            throw new NullPointerException(
                    "Project can not be deleted because project with id: " + id + " does not exist.");
        }
        projectRepository.deleteById(id);
    }

}
