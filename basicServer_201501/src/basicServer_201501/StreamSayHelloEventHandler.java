package basicServer_201501;

import java.io.IOException;
import java.io.InputStream;
import java.util.StringTokenizer;

public class StreamSayHelloEventHandler implements EventHandler {

	private static final int DATA_SIZE = 512;
	private static final int TOKEN_NUM = 2;
	
	@Override
	public String getHandler() {
		return "0x5001";
	}
	
	public void handleEvent(InputStream inputStream) {
		
		try {
			byte[] buffer = new byte[DATA_SIZE];
			inputStream.read(buffer);
			String data = new String(buffer);
			
			String[] params = new String[TOKEN_NUM];
			StringTokenizer token = new StringTokenizer(data, "|");
			
			int i = 0;
			while (token.hasMoreTokens()) {
				params[i++] = token.nextToken();
			}
			
			sayHello(params);
			
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public void sayHello(String[] params) {
		System.out.println("SayHello -> name : " + params[0] + " age : " + params[1]);
	}
	
}
