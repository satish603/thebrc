package com.thebrchub.rest.dropbox;

import java.io.IOException;
import java.io.InputStream;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.dropbox.core.DbxApiException;
import com.dropbox.core.DbxException;
import com.dropbox.core.DbxRequestConfig;
import com.dropbox.core.v2.DbxClientV2;
import com.dropbox.core.v2.files.FileMetadata;
import com.dropbox.core.v2.users.FullAccount;

/**
 * 
 * @author shivanand
 */
@Service
public class DboxServiceImpl implements DboxService {

	@Value("${dropbox.access-token}")
	private String dboxAccessToken;

	@Value("${dropbox.client-identifier}")
	private String dboxclientIdentifier;

	@Override
	public void uploadFile(InputStream reqInputStream) throws DbxApiException, DbxException, IOException {

		// Create Dropbox client
		DbxRequestConfig config = DbxRequestConfig.newBuilder(dboxclientIdentifier).build();
		DbxClientV2 client = new DbxClientV2(config, dboxAccessToken);

		client.files().uploadBuilder("/test").uploadAndFinish(reqInputStream);

	}

	@Override
	public String testDboxConnection() throws DbxApiException, DbxException {

		// Create Dropbox client
		DbxRequestConfig config = DbxRequestConfig.newBuilder(dboxclientIdentifier).build();
		DbxClientV2 client = new DbxClientV2(config, dboxAccessToken);

		// Get current account info
		FullAccount account = client.users().getCurrentAccount();
		return account.getName().getDisplayName();
	}

}
