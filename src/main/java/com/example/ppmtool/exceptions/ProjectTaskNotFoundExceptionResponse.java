package com.example.ppmtool.exceptions;

public class ProjectTaskNotFoundExceptionResponse {

    String ProjectTask;

    public ProjectTaskNotFoundExceptionResponse(String projectTask) {
        ProjectTask = projectTask;
    }

    public String getProjectTask() {
        return ProjectTask;
    }

    public void setProjectTask(String projectTask) {
        ProjectTask = projectTask;
    }
}
