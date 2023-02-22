package ru.kata.spring.boot_security.demo.controllers;


import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.entenies.Role;
import ru.kata.spring.boot_security.demo.entenies.User;
import ru.kata.spring.boot_security.demo.services.RoleService;
import ru.kata.spring.boot_security.demo.services.UserService;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
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
    public User getAuthorizedUser(Principal principal) {
        Optional<User> user = userService.findByUserName(principal.getName());
        return user.get();
    }



    @GetMapping("/roles")
    public List<Role> showAllRoles() {
        List<Role> allRole = roleService.findAllRoles();
        return allRole;
    }

    @GetMapping("/users")
    public List<User> showAllUsers() {
        List<User> allUsers = userService.allUser();
        return allUsers;
    }

    @GetMapping("/users/{id}")
    public User getUser(@PathVariable Long id) {
        User user = userService.findUserById(id);
        return user;
    }


    @PostMapping("/users")
    public User addNewUser(@RequestBody User user) {
        userService.saveUser(user);
        return user;
    }

    @PutMapping("/users")
    public User updateUser(@RequestBody User user) {
        if (user.getRoles().isEmpty()) {
            Set<Role> roles = userService.findUserById(user.getId()).getRoles();
            user.setRoles(roles);
        }
        userService.update(user);
        return user;
    }

    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return "User with ID = " + id + " was deleted!";
    }
}


