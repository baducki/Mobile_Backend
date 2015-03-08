package basicServer_201501;

import java.io.InputStream;

public interface EventHandler {

	public String getHandler();
	
	public void handleEvent(InputStream inputStream);
}
