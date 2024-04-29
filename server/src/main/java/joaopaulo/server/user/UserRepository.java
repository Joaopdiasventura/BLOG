package joaopaulo.server.user;

import joaopaulo.server.user.entitys.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String>{
    User findByEmail(String email);
}
