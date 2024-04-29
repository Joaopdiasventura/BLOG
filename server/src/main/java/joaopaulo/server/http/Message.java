package joaopaulo.server.http;

public class Message {
    public String msg;

    public Message(String m){
        this.msg = m;
    }

    @Override
    public String toString() {
        return "{\"msg\": \"" + this.msg + "\"}";
    }
}
