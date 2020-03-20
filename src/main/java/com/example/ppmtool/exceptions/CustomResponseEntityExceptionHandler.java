package com.example.ppmtool.exceptions;

import com.example.ppmtool.domain.Project;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler
    public final ResponseEntity<Object> handleProjectIdException(Exception ex, WebRequest request){
        if(ex instanceof DataIntegrityViolationException) {
            ProjectIdExceptionResponse exceptionResponse = new ProjectIdExceptionResponse("Project Identifier already exists");
            return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
        } else if(ex instanceof ProjectIdException){
            ProjectIdExceptionResponse exceptionResponse = new ProjectIdExceptionResponse(ex.getMessage());
            return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
        }


        return  null;

    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleProjectNotFoundException(ProjectNotFoundException ex, WebRequest request){

        ProjectNotFoundExceptionResponse exceptionResponse = new ProjectNotFoundExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleProjectTaskNotFoundException(ProjectTaskNotFoundException ex, WebRequest request){
        ProjectTaskNotFoundExceptionResponse exceptionResponse= new ProjectTaskNotFoundExceptionResponse(ex.getMessage());

        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleUsernameExistsException(UsernameException ex, WebRequest request){
        UsernameExceptionResponse exceptionResponse = new UsernameExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

}
