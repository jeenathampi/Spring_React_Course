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
    private BacklogRepository backlogRepository;

    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    @Autowired
    private ProjectServices projectServices;

    public ProjectTask addProjectTask(String projectIdentifier, String username, ProjectTask projectTask){

            Backlog backlog = projectServices.findProjectByIdentifier(projectIdentifier,username).getBacklog();
                    //backlogRepository.findByProjectIdentifier(projectIdentifier);
            projectTask.setBacklog(backlog);
            Integer backlogSequence = backlog.getPTSequence();
            backlog.setPTSequence(++backlogSequence);
            projectTask.setProjectSequence(projectIdentifier+"-"+backlogSequence);
            projectTask.setProjectIdentifier(projectIdentifier);

            if(projectTask.getPriority()==null||projectTask.getPriority()==0){
                projectTask.setPriority(3);
            }

            if(projectTask.getStatus()==""||projectTask.getStatus()==null){
                projectTask.setStatus("TO_DO");
            }
            return projectTaskRepository.save(projectTask);
    }

    public Iterable<ProjectTask> getProjectTasks(String projectIdentifier, String username){
        projectServices.findProjectByIdentifier(projectIdentifier,username);
        List<ProjectTask> projectTask = projectTaskRepository.findByProjectIdentifierOrderByPriority(projectIdentifier);

        return projectTask;
    }

    public ProjectTask findProjectTaskBySequence(String projectIdentifier, String projectSequence, String username){
        projectServices.findProjectByIdentifier(projectIdentifier,username);

        ProjectTask projectTask = projectTaskRepository.findByProjectSequence(projectSequence);
        if(projectTask == null){
            throw new ProjectTaskNotFoundException("Project task with Id '"+projectSequence+"' not found");
        }

        if(!projectTask.getProjectIdentifier().equals(projectIdentifier)){
            throw new ProjectNotFoundException("Project task with Id '"+projectSequence+"' does not belong to '"+projectIdentifier+"'.");
        }
        return projectTask;

    }

    public ProjectTask updateProjectTask(ProjectTask updatedProjectTask, String projectIdentifier, String projectSequence, String username){
        findProjectTaskBySequence(projectIdentifier, projectSequence, username);

        return projectTaskRepository.save(updatedProjectTask);
    }

    public void deleteProjectTask(String projectIdentifier, String projectSequence, String username){
        ProjectTask projectTask = findProjectTaskBySequence(projectIdentifier, projectSequence,username);

        projectTaskRepository.delete(projectTask);
    }

}
