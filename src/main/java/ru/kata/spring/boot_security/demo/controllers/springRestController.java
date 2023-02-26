package ru.kata.spring.boot_security.demo.controllers;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.entenies.Role;
import ru.kata.spring.boot_security.demo.entenies.User;
import ru.kata.spring.boot_security.demo.services.RoleService;
import ru.kata.spring.boot_security.demo.services.UserService;

import java.security.Principal;
import java.util.List;
import java.util.Set;


@RestController
@RequestMapping("/api")
public class springRestController {
    private final UserService userService;
    private final RoleService roleService;

    public springRestController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/principal")
    public ResponseEntity<User> getAuthorizedUser(Principal principal) {
        User user = userService.findByUserName(principal.getName()).get();
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/roles")
    public ResponseEntity<List<Role>> showAllRoles() {
        List<Role> listRoles = roleService.findAllRoles();
        return new ResponseEntity<>(listRoles, HttpStatus.OK);
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> showAllUsers() {
        List<User> listUsers = userService.allUser();
        return new ResponseEntity<>(listUsers, HttpStatus.OK);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        User user = userService.findUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }


    @PostMapping("/users")
    public ResponseEntity<HttpStatus> addNewUser(@RequestBody User user) {
        userService.saveUser(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/users")
    public ResponseEntity<HttpStatus> updateUser(@RequestBody User user) {
        if (user.getRoles().isEmpty()) {
            Set<Role> roles = userService.findUserById(user.getId()).getRoles();
            user.setRoles(roles);
        }
        userService.update(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}


