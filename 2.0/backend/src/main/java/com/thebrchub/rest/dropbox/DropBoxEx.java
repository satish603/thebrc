package com.thebrchub.rest.dropbox;

import com.dropbox.core.DbxException;
import com.dropbox.core.DbxRequestConfig;
import com.dropbox.core.v2.DbxClientV2;
import com.dropbox.core.v2.files.FileMetadata;
import com.dropbox.core.v2.files.ListFolderResult;
import com.dropbox.core.v2.files.Metadata;
import com.dropbox.core.v2.users.FullAccount;

import java.io.FileInputStream;
import java.io.InputStream;

import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class DropBoxEx {
	private static final String ACCESS_TOKEN = "sl.Bz67qukCju22uUqrfCWHQ7TWbhfZMCc_dRG3Y6lAsrHty54XwIohjrkpGlqBRn0nNU-CjkINWrirJZSZ8yI0FOLYgE8cII6hrlV1dxJQiHe4skg38X2DiKpXovdkXTuIX7G6jtwW_6li";

	public void DropBoxExample() throws DbxException, IOException {
		// Create Dropbox client
		DbxRequestConfig config = DbxRequestConfig.newBuilder("dropbox/java-tutorial").build();
		DbxClientV2 client = new DbxClientV2(config, ACCESS_TOKEN);

		// Get current account info
		FullAccount account = client.users().getCurrentAccount();
		System.out.println(account.getName().getDisplayName());

		// Get files and folder metadata from Dropbox root directory
		ListFolderResult result = client.files().listFolder("");
		while (true) {
			for (Metadata metadata : result.getEntries()) {
				System.out.println(metadata.getPathLower());
			}

			if (!result.getHasMore()) {
				break;
			}

			result = client.files().listFolderContinue(result.getCursor());
		}

		// Upload "test.txt" to Dropbox
//		try (InputStream in = new FileInputStream("test.txt")) {
//			FileMetadata metadata = client.files().uploadBuilder("/test.txt").uploadAndFinish(in);
//		}
	}
}