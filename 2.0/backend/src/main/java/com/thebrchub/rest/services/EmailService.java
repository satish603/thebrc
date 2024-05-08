package com.thebrchub.rest.services;

import com.thebrchub.rest.entities.EmailEntity;

/**
 * 
 * @author shivanand
 */
public interface EmailService {

	void sendEmail(EmailEntity emailEntity) throws Exception;

	String sendVerificationMail(String email) throws Exception;
	
	String sendOtp(String email) throws Exception;

}
