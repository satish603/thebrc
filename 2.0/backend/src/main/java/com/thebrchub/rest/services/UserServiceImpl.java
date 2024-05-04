package com.thebrchub.rest.services;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.thebrchub.rest.config.JwtService;
import com.thebrchub.rest.entities.AuthenticationRequest;
import com.thebrchub.rest.entities.AuthenticationResponse;
import com.thebrchub.rest.entities.RegisterRequest;
import com.thebrchub.rest.entities.UserEntity;
import com.thebrchub.rest.repositories.TokenRepo;
import com.thebrchub.rest.repositories.UserRepo;
import com.thebrchub.rest.token.Token;
import com.thebrchub.rest.token.TokenType;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepo userRepo;

	@Autowired
	private EmailService emailService;

	@Autowired
	private TokenRepo tokenRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private JwtService jwtService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Override
	public AuthenticationResponse createUser(RegisterRequest request) throws Exception {

		if (userRepo.existsById(request.getEmail())) {
			throw new RuntimeException("User already Exists. Use login feature");
		}

		// later Verify email if its temp or fake

		UserEntity user = new UserEntity();
		user.setEmail(request.getEmail());
		user.setName(request.getName());
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		user.setRole(request.getRole());
		user.setMobile(request.getMobile());
		user.setIsEmailVerified(false);
		user.setIsMobileVerified(false);
		user.setCurrentOtp(null);

		userRepo.save(user);

		return null;

	}

	@Override
	public void verifyOtp(RegisterRequest userEntity) throws Exception {

		UserEntity user = userRepo.findById(userEntity.getEmail())
				.orElseThrow(() -> new RuntimeException("user not found"));

		if (!userEntity.getOtp().equals(user.getCurrentOtp())) {
			throw new RuntimeException("OTP doesn't match");
		}

		user.setCurrentOtp(null);
		user.setIsEmailVerified(true);
		userRepo.save(user);

	}

	@Override
	public AuthenticationResponse logInUser(AuthenticationRequest request) throws Exception {

		authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

		var user = userRepo.findById(request.getEmail()).orElseThrow(() -> new RuntimeException("user not found"));

		var jwtToken = jwtService.generateToken(user);
		String refreshToken = null;
		revokeAllUserTokens(user);
		saveUserToken(user, jwtToken);

		return getAuthenticationResponse(jwtToken, refreshToken);

	}

	@Override
	public void resetPassword(RegisterRequest userEntity, String otp) throws Exception {

		UserEntity user = userRepo.findById(userEntity.getEmail())
				.orElseThrow(() -> new RuntimeException("user not found"));

		if (!otp.equalsIgnoreCase(user.getCurrentOtp())) {
			throw new RuntimeException("OTP doesn't match");
		}

		user.setCurrentOtp(null);
		user.setPassword(passwordEncoder.encode(userEntity.getPassword()));
		userRepo.save(user);

	}

	@Override
	public void verifyEmail(String uuid) throws Exception {

		if (uuid == null) {
			throw new Exception("Unable to verify email");
		}

		byte[] decodedBytes = Base64.getDecoder().decode(uuid);
		String recievedUuid = new String(decodedBytes, StandardCharsets.UTF_8);
		String recievedOtp = recievedUuid.substring(0, 6);
		String email = recievedUuid.substring(7);

		UserEntity user = userRepo.findById(email).orElseThrow(() -> new RuntimeException("user not found"));

		if (!recievedOtp.equalsIgnoreCase(user.getCurrentOtp())) {
			throw new RuntimeException("Invalid Link. Please generate again!!");
		}

		user.setCurrentOtp(null);
		user.setIsEmailVerified(true);
		userRepo.save(user);

	}

	@Override
	public void sendVerifyMail(RegisterRequest userEntity) throws Exception {

		UserEntity user = userRepo.findById(userEntity.getEmail())
				.orElseThrow(() -> new RuntimeException("user not found"));

		String currentOtp = emailService.sendVerificationMail(user.getEmail());
		user.setCurrentOtp(currentOtp);
		userRepo.save(user);

	}

	@Override
	public void sendOtp(RegisterRequest userEntity) throws Exception {

		UserEntity user = userRepo.findById(userEntity.getEmail())
				.orElseThrow(() -> new RuntimeException("user not found"));

		String currentOtp = emailService.sendOtp(userEntity.getEmail());
		user.setCurrentOtp(currentOtp);
		userRepo.save(user);

	}

	private void saveUserToken(UserEntity user, String jwtToken) {

		Token token = new Token();
		token.setUser(user);
		token.setTokenType(TokenType.BEARER);
		token.setToken(jwtToken);
		token.setRevoked(false);
		token.setExpired(false);

		tokenRepository.save(token);
	}

	private void revokeAllUserTokens(UserEntity user) {
		List<Token> validUserTokens = tokenRepository.findAllTokensByUser(user.getEmail());
		if (validUserTokens.isEmpty())
			return;
		validUserTokens.forEach(token -> {
			tokenRepository.delete(token); // Delete older tokens
		});
	}

	private AuthenticationResponse getAuthenticationResponse(String jwtToken, String refreshToken) {
		AuthenticationResponse response = new AuthenticationResponse();
		response.setAccessToken(jwtToken);
		response.setRefreshToken(refreshToken);
		return response;
	}
}
