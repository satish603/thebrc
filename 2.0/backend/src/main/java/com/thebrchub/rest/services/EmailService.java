package com.thebrchub.rest.services;

import com.thebrchub.rest.entities.EmailEntity;

public interface EmailService {

	void sendEmail(EmailEntity emailEntity) throws Exception;

	String sendVerificationMail(String email) throws Exception;
	
	void sendOtp(String email) throws Exception;

}
