package proactor;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.AsynchronousSocketChannel;
import java.util.StringTokenizer;

public class NioUpdateProfileEventHandler implements NioEventHandler {
	private static final int TOKEN_NUM = 5;
	
	private AsynchronousSocketChannel channel;
	private ByteBuffer buffer;
	
	@Override
	public String gethandler() {
		return "0x6001";
	}

	@Override
	public int getDataSize() {
		return 1024;
	}

	@Override
	public void initialize(AsynchronousSocketChannel channel, ByteBuffer buffer) {
		this.channel = channel;
		this.buffer = buffer;
	}	
	
	@Override
	public void completed(Integer result, ByteBuffer attachment) {
		if (result == -1) {
			try {
				channel.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		} else if (result > 0) {
			buffer.flip();
			String msg = new String(buffer.array());
			
			String[] param = new String[TOKEN_NUM];
			StringTokenizer token = new StringTokenizer(msg, "|");
			int i = 0;
			while (token.hasMoreTokens()) {
				param[i] = token.nextToken();
				i++;
			}
			
			updateProfile(param);
			
			try {
				buffer.clear();
				channel.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

	}

	public void updateProfile(String[] params) {
		System.out.println("UpdateProfile ->" + 
				" id : " + params[0] +
				" password : " + params[1] + 
				" name : " + params[2] + 
				" age : " + params[3] + 
				" gender : " + params[4]);
	}
	
	@Override
	public void failed(Throwable exc, ByteBuffer attachment) {
		
	}


	
}
