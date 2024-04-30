package joaopaulo.server.category;

import joaopaulo.server.category.dtos.CreateCategory;
import joaopaulo.server.category.entities.Category;
import joaopaulo.server.post.PostRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@Validated
public class CategoryService {
    @Autowired
    private CategoryRepository repository;
    @Autowired
    private PostRepository postRepository;

    public Category create(@NotNull CreateCategory dto){
        Category existCategory = repository.findBySlug(dto.getSlug());
        if (existCategory != null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Já existe uma categoria com esse slug");
        }

        return repository.insert(dto.toCategory());
    }

    public List<Category> find(){
        return repository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    public void delete(String slug){
        Category category = repository.findBySlug(slug);
        if (category == null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Não existe uma categoria com esse slug");
        }
        postRepository.deleteByFkCategorySlug(category.getSlug());
        repository.delete(category);
    }
}
