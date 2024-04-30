package joaopaulo.server.user.dtos;

import jakarta.validation.constraints.NotBlank;
import joaopaulo.server.user.entities.User;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateUser {
    @NotBlank(message = "Email não pode ficar em branco")
    private String email;

    @NotBlank(message = "Nome não pode ficar em branco")
    private String name;

    @NotBlank(message = "Senha não pode ficar em branco")
    private String password;

    private Boolean isAdm = false;

    public User toUser() {
        return new User(
                this.email,
                this.name,
                this.password,
                this.isAdm
        );
    }
}
