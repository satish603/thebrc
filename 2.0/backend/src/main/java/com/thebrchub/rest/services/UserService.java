package com.thebrchub.rest.services;

import com.thebrchub.rest.entities.AuthenticationRequest;
import com.thebrchub.rest.entities.AuthenticationResponse;
import com.thebrchub.rest.entities.RegisterRequest;

/**
 * 
 * @author shivanand
 */
public interface UserService {

	AuthenticationResponse createUser(RegisterRequest request) throws Exception;

	void verifyOtp(RegisterRequest userEntity) throws Exception;

	AuthenticationResponse logInUser(AuthenticationRequest request) throws Exception;

	void resetPassword(RegisterRequest userEntity, String otp) throws Exception;

	void sendVerifyMail(RegisterRequest userEntity) throws Exception;

	void verifyEmail(String uuid) throws Exception;

	void sendOtp(RegisterRequest userEntity) throws Exception;;

}
