package com.karim.sslserver.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.karim.sslserver.model.User;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class LoginController {

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public String login(@RequestBody User user) throws Exception {
		if (user == null || (user.getEmail() == null && user.getPassword() == null)) {
			throw new Exception(String.format("User information is missed!!"));
		}
		if (user.getPassword() == null || user.getPassword().length() == 0) {
			return "{ \"error\": \"Missing password\" }";
		}
		if (user.getEmail() == null || user.getEmail().length() == 0) {
			return "{ \"error\": \"Missing email\" }";
		}
		

		return "{ \"token\": \"QpwL5tke4Pnpja7X\" }";
	}

}
