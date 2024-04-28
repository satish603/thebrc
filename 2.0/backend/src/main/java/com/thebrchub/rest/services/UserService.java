package com.thebrchub.rest.services;

import com.thebrchub.rest.entities.AuthenticationRequest;
import com.thebrchub.rest.entities.AuthenticationResponse;
import com.thebrchub.rest.entities.RegisterRequest;
import com.thebrchub.rest.entities.UserEntity;

public interface UserService {
    
    AuthenticationResponse createUser(RegisterRequest request) throws Exception;

    void verifyOtp(UserEntity userEntity) throws Exception;

    AuthenticationResponse logInUser(AuthenticationRequest request) throws Exception;

    void resetPassword(UserEntity userEntity) throws Exception;

    void sendOtp(UserEntity userEntity) throws Exception;

    void verifyEmail(String uuid) throws Exception;

}
