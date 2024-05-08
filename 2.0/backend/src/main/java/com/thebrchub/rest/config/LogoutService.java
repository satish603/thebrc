package com.thebrchub.rest.config;

import com.thebrchub.rest.repositories.TokenRepo;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

/**
 * 
 * @author shivanand
 */
@Service
public class LogoutService implements LogoutHandler {

	@Autowired
	private TokenRepo tokenRepository;

	@Override
	public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
		final String authHeader = request.getHeader("Authorization");
		final String jwt;
		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
			throw new RuntimeException("invalid header");
		}
		jwt = authHeader.substring(7);
		var storedToken = tokenRepository.findByToken(jwt).orElseThrow(() -> new RuntimeException("user not found"));
		;
		if (storedToken != null) {
			tokenRepository.delete(storedToken);
			SecurityContextHolder.clearContext();
		}
	}
}