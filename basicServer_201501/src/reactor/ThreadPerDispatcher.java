package reactor;

import java.io.IOException;
import java.io.InputStream;
import java.net.ServerSocket;
import java.net.Socket;

public class ThreadPerDispatcher implements Dispatcher {

	private final int HEADER_SIZE = 6;
	
	public void dispatch(ServerSocket serverSocket, HandleMap handleMap) {
		while(true) {
			try {
				Socket socket = serverSocket.accept();
				
				Runnable demultiplexer = new Demultiplexer(socket, handleMap);
				Thread thread = new Thread(demultiplexer);
				thread.start();
			} catch (IOException e){
				e.printStackTrace();
			}
		}
	}
	
	public void demultiplex(Socket socket, HandleMap handleMap) {
		try {
			InputStream inputStream = socket.getInputStream();
			
			byte[] buffer = new byte[HEADER_SIZE];
			inputStream.read(buffer);
			String header = new String(buffer);
			
			handleMap.get(header).handleEvent(inputStream);
		
			socket.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
	
}
