package com.thebrchub.rest.entities;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

@Component
@Document(collection = "users")
public class UserEntity implements UserDetails {

	private String name;

	@Id
	@JsonProperty("email")
	private String email;

	private String mobile;

	@JsonIgnore
	private String password;

	@JsonIgnore
	@Enumerated(EnumType.STRING)
	private Role role;

	@JsonProperty("events")
	private Set<EventEntity> events = new HashSet<EventEntity>();

	@JsonIgnore
	private Boolean isMobileVerified;

	@JsonIgnore
	private Boolean isEmailVerified;

	@JsonIgnore
	private String currentOtp;

	public UserEntity() {
	}

	public UserEntity(String name, String email, String mobile, String password) {
		this.name = name;
		this.email = email;
		this.mobile = mobile;
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Boolean getIsMobileVerified() {
		return isMobileVerified;
	}

	public void setIsMobileVerified(Boolean isMobileVerified) {
		this.isMobileVerified = isMobileVerified;
	}

	public Boolean getIsEmailVerified() {
		return isEmailVerified;
	}

	public void setIsEmailVerified(Boolean isEmailVerified) {
		this.isEmailVerified = isEmailVerified;
	}

	public String getCurrentOtp() {
		return currentOtp;
	}

	public void setCurrentOtp(String currentOtp) {
		this.currentOtp = currentOtp;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return role.getAuthorities();
	}

	@Override
	public String getUsername() {
		return email;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public Set<EventEntity> getEvents() {
		return events;
	}

	public void setEvents(Set<EventEntity> events) {
		this.events = events;
	}

}
