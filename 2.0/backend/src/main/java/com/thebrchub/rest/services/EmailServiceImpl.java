package com.thebrchub.rest.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.UUID;
import java.util.stream.Collectors;

import com.thebrchub.rest.entities.EmailEntity;

import jakarta.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl implements EmailService {

	private static final int OTP_LENGTH = 6; // Length of OTP
	private static final String OTP_CHARACTERS = "0123456789"; // Characters to use for OTP

	@Autowired
	private JavaMailSender mailSender;

	@Autowired
	private TemplateEngine templateEngine;

	@Value("${server.port}")
	private String serverPort;

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

	@Override
	public String sendVerificationMail(String email) throws Exception {

		String emailSubject = "Link for THE BRC HUB account verification";
		String otp = generateOTP();
		String uuidToEncode = otp + "_" + email;
		String uuid = Base64.getEncoder().encodeToString(uuidToEncode.getBytes());
		String verifyUrl = generateVerifyUrl(uuid);

		try {
			MimeMessage message = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message);

			helper.setTo(email);
			helper.setSubject(emailSubject);
			helper.setText(verifyUrl, false); // we require html content?
			mailSender.send(message);
		} catch (Exception e) {
			throw new RuntimeException("Error sending mail", e);
		}

		return otp;
	}

	// Generate OTP
	public String generateVerifyUrl(String uuid) {
		String verifyUrl = "http://" + getIpAddress() + ":" + serverPort + "/authenticate/verify/email/" + uuid;
		return verifyUrl;
	}

	private String getIpAddress() {
		try {
			InetAddress inetAddress = InetAddress.getLocalHost();
			return inetAddress.getHostAddress();
		} catch (UnknownHostException e) {
			e.printStackTrace();
			return "Unknown";
		}
	}

	// Generate OTP
	public String generateOTP() {
		SecureRandom random = new SecureRandom();
		String otp = random.ints(0, OTP_CHARACTERS.length()).limit(OTP_LENGTH).mapToObj(OTP_CHARACTERS::charAt)
				.map(Object::toString).collect(Collectors.joining());
		return otp;
	}

	private String generateHtmlContent(String name, String email, String message) {
		Context context = new Context();
		context.setVariable("name", name);
		context.setVariable("email", email);
		context.setVariable("message", message);
		return templateEngine.process("emailTemplate", context);
	}

	@Override
	public void sendOtp(String email) throws Exception {

		String emailSubject = "OTP for THE BRC HUB account";
		String otp = generateOTP();

		try {
			MimeMessage message = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message);

			helper.setTo(email);
			helper.setSubject(emailSubject);
			helper.setText(otp, false); // we require html content?
			mailSender.send(message);
		} catch (Exception e) {
			throw new RuntimeException("Error sending mail", e);
		}

	}

}
