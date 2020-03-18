package com.example.ppmtool.web;

import com.example.ppmtool.domain.User;
import com.example.ppmtool.services.MapValidationErrorService;
import com.example.ppmtool.services.UserServices;
import com.example.ppmtool.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    UserServices userServices;

    @Autowired
    MapValidationErrorService mapValidationErrorService;

    @Autowired
    UserValidator userValidator;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result){
        userValidator.validate(user, result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationErrorService(result);
        if(errorMap!= null) return errorMap;

        User newUser= userServices.saveUser(user);
        return new ResponseEntity<User>(newUser, HttpStatus.OK);
    }
}
