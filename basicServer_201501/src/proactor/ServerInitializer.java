package proactor;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.channels.AsynchronousChannelGroup;
import java.nio.channels.AsynchronousServerSocketChannel;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ServerInitializer {
	
	private static int PORT = 5000;
	private static int THREADPOOLSIZE = 100;
	private static int INITIALSIZE = 100;
	private static int BACKLOG = 1024;

	public void startServer() {
		System.out.println("SERVER START!");
		
		NioHandleMap handleMap = new NioHandleMap();
		
		NioEventHandler sayHelloHandler = new NioSayHelloEventHandler();
		NioEventHandler updateProfileHandler = new NioUpdateProfileEventHandler();
		
		handleMap.put(sayHelloHandler.gethandler(), sayHelloHandler);
		handleMap.put(updateProfileHandler.gethandler(), updateProfileHandler);
		
		ExecutorService executor = Executors.newFixedThreadPool(THREADPOOLSIZE);
		
		try {
			AsynchronousChannelGroup group = AsynchronousChannelGroup.withCachedThreadPool(executor, INITIALSIZE);
			
			AsynchronousServerSocketChannel listener = AsynchronousServerSocketChannel.open(group);
			listener.bind(new InetSocketAddress(PORT), BACKLOG);
			
			listener.accept(listener, new Dispatcher(handleMap));
			
		} catch (IOException e){
			e.printStackTrace();
		}
		
	}

}
