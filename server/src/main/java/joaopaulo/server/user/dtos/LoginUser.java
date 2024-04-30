package joaopaulo.server.user.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@Builder
public class LoginUser {
    @NotBlank(message = "Email não pode ficar em branco")
    private String email;

    @NotBlank(message = "Senha não pode ficar em branco")
    private String password;

}
