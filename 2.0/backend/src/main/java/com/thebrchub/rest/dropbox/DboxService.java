package com.thebrchub.rest.dropbox;

import java.io.IOException;
import java.io.InputStream;

import com.dropbox.core.DbxApiException;
import com.dropbox.core.DbxException;

/**
 * 
 * @author shivanand
 */
public interface DboxService {

	void uploadFile(InputStream reqInputStream) throws DbxApiException, DbxException, IOException;

	String testDboxConnection() throws DbxApiException, DbxException;

}
