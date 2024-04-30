package joaopaulo.server.category;

import joaopaulo.server.category.dtos.CreateCategory;
import joaopaulo.server.category.entities.Category;
import joaopaulo.server.http.Message;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
@CrossOrigin("*")
@Validated
public class CategoryController {
    @Autowired
    private CategoryService service;

    @PostMapping()
    public ResponseEntity<Category> create(@RequestBody @NonNull CreateCategory dto){
        Category category = service.create(dto);
        return  ResponseEntity.status(201).body(category);
    }

    @GetMapping()
    public ResponseEntity<List<Category>> find(){
        return ResponseEntity.ok(service.find());
    }

    @DeleteMapping("/{slug}")
    public ResponseEntity<Message> delete(@PathVariable String slug){
        service.delete(slug);
        return ResponseEntity.ok(new Message("Categoria deletada com suscesso"));
    }
}
