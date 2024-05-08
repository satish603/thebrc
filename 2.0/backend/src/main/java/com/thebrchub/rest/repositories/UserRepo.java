package com.thebrchub.rest.repositories;

import com.thebrchub.rest.entities.UserEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * 
 * @author shivanand
 */
@Repository
public interface UserRepo extends MongoRepository<UserEntity, String> {

}