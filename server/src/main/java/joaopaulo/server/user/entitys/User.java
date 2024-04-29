package joaopaulo.server.user.entitys;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.*;

@Document(collection = "user")
@Getter
@Setter
@Builder
public class User {
    @Id
    private String email;
    private String name;
    private String password;
    private boolean isAdm;

    public User(String email, String name, String password, Boolean isAdm) {
        this.isAdm = isAdm;
        this.email = email;
        this.name = name;
        this.password = password;
    }
}
