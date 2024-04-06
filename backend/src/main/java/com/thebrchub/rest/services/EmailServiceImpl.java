package com.thebrchub.rest.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.thebrchub.rest.entities.EmailEntity;

import jakarta.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl implements EmailService {

	@Autowired
	private JavaMailSender mailSender;

	@Autowired
	private TemplateEngine templateEngine;

	@Value("${brc.members.mail}")
	private String[] brcMembersMail;

	@Value("${brc.mail}")
	private String brcMail;

	@Override
	public void sendEmail(EmailEntity emailEntity) throws Exception {

		String[] bcc = brcMembersMail;
		String emailSubject = "NEW FEEDBACK MESSAGE!!";

		try {
			String htmlContent = generateHtmlContent(emailEntity.getName(), emailEntity.getEmail(),
					emailEntity.getMessage());

			MimeMessage message = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message);

			helper.setTo(brcMail);
			helper.setBcc(bcc);
			helper.setSubject(emailSubject);
			helper.setText(htmlContent, true);
			mailSender.send(message);
		} catch (Exception e) {
			throw new RuntimeException("Error sending mail", e);
		}
	}

	private String generateHtmlContent(String name, String email, String message) {
		Context context = new Context();
		context.setVariable("name", name);
		context.setVariable("email", email);
		context.setVariable("message", message);
		return templateEngine.process("emailTemplate", context);
	}

}
