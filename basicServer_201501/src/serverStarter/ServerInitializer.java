package serverStarter;

public class ServerInitializer {
	public static void main(String[] args) {
	
		// reactor.ServerInitializer reactorServer = new reactor.ServerInitializer();
		// reactorServer.startServer();
		
		proactor.ServerInitializer proactorServer = new proactor.ServerInitializer();
		proactorServer.startServer();
	}
}
