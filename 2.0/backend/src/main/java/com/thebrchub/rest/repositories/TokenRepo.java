package com.thebrchub.rest.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.thebrchub.rest.token.Token;

@Repository
public interface TokenRepo extends MongoRepository<Token, String> {

    @Query("{'user._id': ?0}")
    List<Token> findAllTokensByUser(String id);

    Optional<Token> findByToken(String token);
}