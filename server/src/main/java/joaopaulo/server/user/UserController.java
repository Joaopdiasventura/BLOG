package joaopaulo.server.user;

import joaopaulo.server.jwt.JwtUtil;
import joaopaulo.server.user.dtos.CreateUser;
import joaopaulo.server.user.dtos.LoginUser;
import joaopaulo.server.user.entities.User;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Value;
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

    @Autowired
    private JwtUtil jwt;

    @GetMapping()
    public ResponseEntity<User> findByEmail(){
        return ResponseEntity.ok(service.findUser("jojo@gmail.com"));
    }

    @PostMapping("/register")
    public ResponseEntity<String> create(@RequestBody @NonNull CreateUser dto){
        dto.setPassword(passwordEncoder.encode(dto.getPassword()));
        User user = service.create(dto);
        return ResponseEntity.status(201).body(jwt.generateToken(user.getEmail()));
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody @NonNull LoginUser dto){
        User user = service.login(dto);
        if (!(passwordEncoder.matches(dto.getPassword(), user.getPassword()))) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Senha incorreta");
        }
        return ResponseEntity.ok(jwt.generateToken(user.getEmail()));
    }

    @GetMapping("/{token}")
    public ResponseEntity<User> getUser(@PathVariable String token){
        String email = jwt.extractUserEmail(token);
        System.out.println(email);
        User user = service.findUser(email);
        if (user == null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Token inválido");
        }
        return ResponseEntity.ok(user);
    }
}
