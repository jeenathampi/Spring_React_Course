package com.example.ppmtool.web;

import com.example.ppmtool.domain.ProjectTask;
import com.example.ppmtool.services.MapValidationErrorService;
import com.example.ppmtool.services.ProjectTaskServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/backlog")
public class BacklogController {
    @Autowired
    ProjectTaskServices projectTaskServices;

    @Autowired
    MapValidationErrorService mapValidationErrorService;

    @PostMapping("/{backlog_id}")
    public ResponseEntity<?> addPTtoBacklog(@Valid @RequestBody ProjectTask projectTask, BindingResult result, @PathVariable String backlog_id, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationErrorService(result);
        if (errorMap != null) {
            return errorMap;
        }
        ProjectTask projectTask1 = projectTaskServices.addProjectTask(backlog_id, principal.getName(),projectTask);
        return new ResponseEntity<ProjectTask>(projectTask1, HttpStatus.OK);
    }

    @GetMapping("/{backlog_id}")
    public Iterable<ProjectTask> getProjectTasksByIdentifier(@PathVariable String backlog_id, Principal principal){
        return projectTaskServices.getProjectTasks(backlog_id, principal.getName());
    }

    @GetMapping("/{backlog_id}/{project_sequence}")
    public ResponseEntity<?> getProjectTaskBySequence(@PathVariable String backlog_id, @PathVariable String project_sequence,Principal principal){
        ProjectTask projectTask= projectTaskServices.findProjectTaskBySequence(backlog_id, project_sequence, principal.getName());
        return new ResponseEntity<ProjectTask>(projectTask, HttpStatus.OK);
    }

    @PatchMapping("/{backlog_id}/{project_sequence}")
    public ResponseEntity<?> updateProjectTask(@Valid @RequestBody ProjectTask projectTask, BindingResult result, @PathVariable String backlog_id, @PathVariable String project_sequence, Principal principal){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationErrorService(result);
        if (errorMap != null) {
            return errorMap;
        }
        ProjectTask updatedProjectTask = projectTaskServices.updateProjectTask(projectTask, backlog_id, project_sequence, principal.getName());
        return new ResponseEntity<ProjectTask>(updatedProjectTask, HttpStatus.OK);
    }

    @DeleteMapping("/{backlog_id}/{project_sequence}")
    public  ResponseEntity<?> deleteProjectTaskById(@PathVariable String backlog_id, @PathVariable String project_sequence, Principal principal){
        projectTaskServices.deleteProjectTask(backlog_id, project_sequence, principal.getName());
        return new ResponseEntity<String>("Project Task with Id '"+project_sequence+"' was deleted", HttpStatus.OK);
    }
}
