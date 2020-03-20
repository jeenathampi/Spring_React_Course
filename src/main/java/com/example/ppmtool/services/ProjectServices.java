package com.example.ppmtool.services;

import com.example.ppmtool.domain.Backlog;
import com.example.ppmtool.domain.Project;
import com.example.ppmtool.domain.User;
import com.example.ppmtool.exceptions.ProjectIdException;
import com.example.ppmtool.exceptions.ProjectNotFoundException;
import com.example.ppmtool.repositories.BacklogRepository;
import com.example.ppmtool.repositories.ProjectRepository;
import com.example.ppmtool.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
public class ProjectServices {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private UserRepository userRepository;

    public Project saveOrUpdateProject(Project project, String username){
        if(project.getId()!=null){
            Project existingProject = projectRepository.findByProjectIdentifier(project.getProjectIdentifier());
            if(existingProject!=null&&(!existingProject.getProjectLeader().equals(username))){
              throw new ProjectNotFoundException("Project not found in your account");
            }else{
                throw new ProjectNotFoundException("Project cannot be updated because it doesnt exist");
            }
        }

        User user = userRepository.findByUsername(username);
        project.setUser(user);
        project.setProjectLeader(user.getUsername());
        project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
        if(project.getId() == null){
            Backlog backlog =new Backlog();
            project.setBacklog(backlog);
            backlog.setProject(project);
            backlog.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
        } else {
            project.setBacklog(backlogRepository.findByProjectIdentifier(project.getProjectIdentifier().toUpperCase()));
        }
            return projectRepository.save(project);
    }

    public Project findProjectByIdentifier(String projectId, String username){
        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
        if(project == null){
            throw new ProjectIdException("Project with identifier '"+projectId.toUpperCase()+"' doesn't exists");
        }
        if(!project.getProjectLeader().equals(username)){
            throw new ProjectNotFoundException("Project identifier '"+projectId.toUpperCase()+"' does not belong to the user");
        }
        return project;
    }

    public Iterable<Project> getAllProjects(String username){
        return projectRepository.findAllByProjectLeader(username);
    }

    public void deleteProjectByIdentifier(String projectId, String username){
//        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
//        if(project == null){
//            throw new ProjectIdException("Cannot delete the project : Project with identifier '"+projectId.toUpperCase()+"' doesn't exists");
//        }
        projectRepository.delete(findProjectByIdentifier(projectId.toUpperCase(), username));
    }

}
