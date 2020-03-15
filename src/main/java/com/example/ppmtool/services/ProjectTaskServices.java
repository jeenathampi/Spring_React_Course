package com.example.ppmtool.services;

import com.example.ppmtool.domain.Backlog;
import com.example.ppmtool.domain.ProjectTask;
import com.example.ppmtool.exceptions.ProjectIdException;
import com.example.ppmtool.exceptions.ProjectNotFoundException;
import com.example.ppmtool.exceptions.ProjectTaskNotFoundException;
import com.example.ppmtool.repositories.BacklogRepository;
import com.example.ppmtool.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectTaskServices {

    @Autowired
    BacklogRepository backlogRepository;

    @Autowired
    ProjectTaskRepository projectTaskRepository;

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask){
        Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
        if(backlog == null){
            throw new ProjectNotFoundException("Project Not Found");
        }
        projectTask.setBacklog(backlog);
        Integer backlogSequence = backlog.getPTSequence();
        backlog.setPTSequence(++backlogSequence);
        projectTask.setProjectSequence(projectIdentifier+"-"+backlogSequence);
        projectTask.setProjectIdentifier(projectIdentifier);

        if(projectTask.getPriority()==null){
            projectTask.setPriority(3);
        }

        if(projectTask.getStatus()==""||projectTask.getStatus()==null){
            projectTask.setStatus("TO_DO");
        }
        return projectTaskRepository.save(projectTask);
    }

    public Iterable<ProjectTask> getProjectTasks(String projectIdentifier){
        List<ProjectTask> projectTask = projectTaskRepository.findByProjectIdentifierOrderByPriority(projectIdentifier);
        if(projectTask.size() == 0){
            throw new ProjectNotFoundException("Project:'"+projectIdentifier+"' Not Found");
        }
        return projectTask;
    }

    public ProjectTask findProjectTaskBySequence(String projectIdentifier, String projectSequence){
        Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
        if(backlog == null){
            throw new ProjectNotFoundException("Project with ID '"+projectIdentifier+"' not found");
        }

        ProjectTask projectTask = projectTaskRepository.findByProjectSequence(projectSequence);
        if(projectTask == null){
            throw new ProjectTaskNotFoundException("Project task with Id '"+projectSequence+"' not found");
        }

        if(!projectTask.getProjectIdentifier().equals(projectIdentifier)){
            throw new ProjectNotFoundException("Project task with Id '"+projectSequence+"' does not belong to '"+projectIdentifier+"'.");
        }
        return projectTask;

    }

    public ProjectTask updateProjectTask(ProjectTask updatedProjectTask, String projectIdentifier, String projectSequence){
        findProjectTaskBySequence(projectIdentifier, projectSequence);

        return projectTaskRepository.save(updatedProjectTask);
    }

    public void deleteProjectTask(String projectIdentifier, String projectSequence){
        ProjectTask projectTask = findProjectTaskBySequence(projectIdentifier, projectSequence);

        projectTaskRepository.delete(projectTask);
    }

}
