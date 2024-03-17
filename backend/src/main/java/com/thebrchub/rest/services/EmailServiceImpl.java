package com.thebrchub.rest.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.thebrchub.rest.entities.EmailEntity;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl implements EmailService {

	@Autowired
	private JavaMailSender mailSender;

	@Autowired
	private TemplateEngine templateEngine;

	@Override
	public void sendEmail(EmailEntity emailEntity) {
		String replyTo = "thebrcexplorers@gmail.com";
		String[] bcc = { "thebrcexplorers@gmail.com", "shivanandburli0702@gmail.com", "srikanthrajhk9611@gmail.com",
				"satishchauhan603@gmail.com" };
		String emailSubject = "Confirmation Mail";
		String htmlContent = generateHtmlContent(emailEntity.getName(),emailEntity.getMessage());

		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);
		try {
			helper.setTo(emailEntity.getEmail());
			helper.setReplyTo(replyTo);
			helper.setBcc(bcc);
			helper.setSubject(emailSubject);
			helper.setText(htmlContent, true);
			mailSender.send(message);
		} catch (MessagingException e) {
			e.printStackTrace();
		}
	}

	private String generateHtmlContent(String name,String message) {
		Context context = new Context();
		context.setVariable("name", name);
		context.setVariable("message", message);
		return templateEngine.process("emailTemplate", context);
	}

}
