package joaopaulo.server.post;

import joaopaulo.server.http.Message;
import joaopaulo.server.post.dto.CreatePost;
import joaopaulo.server.post.entities.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/post")
@CrossOrigin("*")
@Validated
public class PostController {

    @Autowired
    PostService service;

    @PostMapping()
    public ResponseEntity<Post> create(@RequestBody CreatePost dto){
        return ResponseEntity.status(201).body(service.create(dto));
    }

    @GetMapping()
    public ResponseEntity<List<Post>> find(){
        return ResponseEntity.ok(service.find());
    }

    @DeleteMapping("/{slug}")
    public ResponseEntity<Message> delete(@PathVariable String slug){
        service.delete(slug);
        return ResponseEntity.ok(new Message("Post deletado com sucesso"));
    }
}
