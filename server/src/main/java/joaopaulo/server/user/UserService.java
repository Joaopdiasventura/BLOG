package joaopaulo.server.user;

import joaopaulo.server.user.dtos.CreateUser;
import joaopaulo.server.user.dtos.LoginUser;
import joaopaulo.server.user.entitys.User;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Service
@Validated
public class UserService {

    @Autowired
    private UserRepository repository;

    public User findUser(@NonNull String email){
        return repository.findByEmail(email);
    }

    public User create(@NonNull CreateUser dto){
        User existUser = findUser(dto.getEmail());
        if (existUser != null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Já existe um usuário cadastrado nesse email");
        }
        User user = repository.insert(dto.toUser());
        return  user;
    }

    public User login(@NonNull LoginUser dto){
        User user = findUser(dto.getEmail());
        if (user == null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Não existe um usuário cadastrado nesse email");
        }
        return user;

    }
}
