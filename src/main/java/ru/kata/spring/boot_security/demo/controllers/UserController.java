package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.kata.spring.boot_security.demo.entenies.User;

@Controller
@RequestMapping("/user")
public class UserController {

    @RequestMapping("")
    public String mainPageUserInfo(Model model, @AuthenticationPrincipal User user) {
        model.addAttribute("userModel", user);
        return "user";
    }
}
