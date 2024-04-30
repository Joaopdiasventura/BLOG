package joaopaulo.server.user;

import joaopaulo.server.user.dtos.CreateUser;
import joaopaulo.server.user.dtos.LoginUser;
import joaopaulo.server.user.entities.User;
import lombok.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
@Validated
public class UserController {

    @Autowired
    private UserService service;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping()
    public ResponseEntity<User> findByEmail(){
        return ResponseEntity.ok(service.findUser("jojo@gmail.com"));
    }

    @PostMapping("/register")
    public ResponseEntity<User> create(@RequestBody @NonNull CreateUser dto){
        dto.setPassword(passwordEncoder.encode(dto.getPassword()));
        User user = service.create(dto);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody @NonNull LoginUser dto){
        User user = service.login(dto);
        if (!(passwordEncoder.matches(dto.getPassword(), user.getPassword()))) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Senha incorreta");
        }
        return ResponseEntity.ok(user);
    }
}
