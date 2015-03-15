package main;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.channels.AsynchronousChannelGroup;
import java.nio.channels.AsynchronousServerSocketChannel;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ServerInitializer {
	
	private static int PORT = 5000;
	private static int threadPoolSize = 8;
	private static int initialSize = 4;
	private static int backlog = 50;

	public static void main(String[] args) {
		
		// reactor.ServerInitializer reactorServer = new reactor.ServerInitializer();
		// reactorServer.startServer();
		
		proactor.ServerInitializer proactorServer = new proactor.ServerInitializer();
		proactorServer.startServer();
	}

}
