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
    public ResponseEntity<List<Post>> findAll(){
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<Post> find(@PathVariable String slug){
        return ResponseEntity.ok(service.find(slug));
    }

    @DeleteMapping("/{slug}")
    public ResponseEntity<Message> delete(@PathVariable String slug){
        service.delete(slug);
        return ResponseEntity.ok(new Message("Post deletado com sucesso"));
    }

    @GetMapping("/category/{slug}")
    public ResponseEntity<List<Post>> findByCategory(@PathVariable String slug){
        return ResponseEntity.ok(service.findByCategory(slug));
    }
}
