package com.example.ppmtool.web;

import com.example.ppmtool.domain.Project;
import com.example.ppmtool.services.MapValidationErrorService;
import com.example.ppmtool.services.ProjectServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.*;

@RestController
@RequestMapping("/api/project")
public class ProjectController {

    @Autowired
    private ProjectServices projectServices;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping
    public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult result, Principal principal){

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationErrorService(result);
        if(errorMap!=null) return errorMap;

        Project project1 = projectServices.saveOrUpdateProject(project, principal.getName());

        return new ResponseEntity<Project>(project1, HttpStatus.OK);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<?> findProject(@PathVariable String projectId, Principal principal){
        Project project1 = projectServices.findProjectByIdentifier(projectId, principal.getName());
        return new ResponseEntity<Project>(project1, HttpStatus.OK);
    }

    @GetMapping
    public Iterable<Project> findAllProjects(Principal principal){
        return projectServices.getAllProjects(principal.getName());
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<?> deleteProject(@PathVariable String projectId, Principal principal){
        projectServices.deleteProjectByIdentifier(projectId, principal.getName());
        return new ResponseEntity<String>("Project with projectId '"+projectId.toUpperCase()+"' was deleted", HttpStatus.OK);
    }

}
