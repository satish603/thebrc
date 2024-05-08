package com.thebrchub.rest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

/**
 * 
 * @author shivanand
 */
@SpringBootApplication
@EnableMongoRepositories
public class TheBrcHubApplication {

	public static void main(String[] args) {
		SpringApplication.run(TheBrcHubApplication.class, args);
	}

}
