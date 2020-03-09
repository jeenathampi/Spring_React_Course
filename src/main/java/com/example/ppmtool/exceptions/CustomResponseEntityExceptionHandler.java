package com.example.ppmtool.exceptions;

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
            ProjectIdExceptionResponse exceptionResponse = new ProjectIdExceptionResponse("Entity already exists");
            return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
        }
        return  null;

    }
}
