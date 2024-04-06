package com.thebrchub.rest.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.thebrchub.rest.entities.EmailEntity;
import com.thebrchub.rest.services.EmailService;

@RestController
public class EmailController {

	@Autowired
	private EmailService emailService;

	@PostMapping(value = "/send/mail", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	private ResponseEntity<?> sendEmail(@RequestBody EmailEntity emailEntity) {
		try {
			emailService.sendEmail(emailEntity);
			return new ResponseEntity<>(emailEntity, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping(value = "/hello", produces = MediaType.APPLICATION_JSON_VALUE)
	private ResponseEntity<?> hello() {
		try {
			return new ResponseEntity<>("Hello!", HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
