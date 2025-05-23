package com.thebrchub.rest.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.thebrchub.rest.config.LogoutService;
import com.thebrchub.rest.entities.AuthenticationRequest;
import com.thebrchub.rest.entities.AuthenticationResponse;
import com.thebrchub.rest.entities.RegisterRequest;
import com.thebrchub.rest.services.UserService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * 
 * @author shivanand
 */
@Tag(name = "User Services", description = "APIs to invoke user services.")
@RestController
public class UserController {

	// Forgot password
	// otp retry count
	// while login check if otp is verified
	// forgot password use otp to reset password

	@Autowired
	private UserService userService;

	@Autowired
	private LogoutService logoutService;

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private HttpServletResponse response;

	private Authentication authentication = null;

	@PostMapping(value = "/signup", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	private ResponseEntity<?> addUser(@RequestBody RegisterRequest request) {
		try {
			userService.createUser(request);
			return new ResponseEntity<>("user registration successful!!", HttpStatus.OK);
		} catch (Exception e) {
			// e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping(value = "/signout", produces = MediaType.APPLICATION_JSON_VALUE)
	private ResponseEntity<?> logOut() {
		try {
			logoutService.logout(request, response, authentication);
			return new ResponseEntity<>("logout successful", HttpStatus.OK);
		} catch (Exception e) {
			// e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping(value = "/verify/otp/", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	private ResponseEntity<?> verifyOtp(@RequestBody RegisterRequest userEntity) {
		try {
			userService.verifyOtp(userEntity);
			return new ResponseEntity<>("Verified successfully!!", HttpStatus.OK);
		} catch (Exception e) {
			// e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping(value = "/signin", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	private ResponseEntity<?> logIn(@RequestBody AuthenticationRequest request) {
		try {
			AuthenticationResponse res = userService.logInUser(request);
			response.setHeader("token", res.getAccessToken());
			return new ResponseEntity<>("login successful!!", HttpStatus.OK);
		} catch (Exception e) {
			// e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping(value = "/reset/password/{otp}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	private ResponseEntity<?> forgotPassword(@PathVariable("otp") String otp, @RequestBody RegisterRequest userEntity) {
		try {
			userService.resetPassword(userEntity, otp);
			return new ResponseEntity<>("Password reset successfully!!", HttpStatus.OK);
		} catch (Exception e) {
			// e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping(value = "/send/verify/mail", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	private ResponseEntity<?> sendVerifyMail(@RequestBody RegisterRequest userEntity) {
		try {
			userService.sendVerifyMail(userEntity);
			return new ResponseEntity<>("mail sent successfully!!", HttpStatus.OK);
		} catch (Exception e) {
			// e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping(value = "/send/otp", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	private ResponseEntity<?> sendOtp(@RequestBody RegisterRequest userEntity) {
		try {
			userService.sendOtp(userEntity);
			return new ResponseEntity<>("otp sent successfully!!", HttpStatus.OK);
		} catch (Exception e) {
			// e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping(value = "/authenticate/verify/email/{uuid}", produces = MediaType.APPLICATION_JSON_VALUE)
	private ResponseEntity<?> verifyEmail(@PathVariable("uuid") String uuid) {
		try {
			String trimmedUuid = (uuid != null && !uuid.trim().isEmpty()) ? uuid.trim() : null;
			userService.verifyEmail(trimmedUuid);
			return new ResponseEntity<>("user verified successfully!!", HttpStatus.OK);
		} catch (Exception e) {
			// e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
