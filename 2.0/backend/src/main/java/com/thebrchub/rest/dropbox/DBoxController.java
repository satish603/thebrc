package com.thebrchub.rest.dropbox;

import java.io.InputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.thebrchub.rest.entities.RegisterRequest;

/**
 * 
 * @author shivanand
 */
@RestController
public class DBoxController {

	@Autowired
	private DboxService dboxService;

	@GetMapping(value = "/dbox/test", produces = MediaType.APPLICATION_JSON_VALUE)
	private ResponseEntity<?> testConnection() {

		try {
			String out = dboxService.testDboxConnection();
			return new ResponseEntity<>("dbox connection is live!", HttpStatus.OK);
		} catch (Exception e) {
			// e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping(value = "/dbox/upload", produces = MediaType.APPLICATION_JSON_VALUE)
	private ResponseEntity<?> uploadFile(InputStream reqInputStream) {

		try {
			dboxService.uploadFile(reqInputStream);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			// e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
