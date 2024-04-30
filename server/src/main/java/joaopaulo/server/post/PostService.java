package joaopaulo.server.post;

import joaopaulo.server.category.CategoryRepository;
import joaopaulo.server.category.entities.Category;
import joaopaulo.server.post.dto.CreatePost;
import joaopaulo.server.post.entities.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@Validated
public class PostService {
    @Autowired
    PostRepository repository;
    @Autowired
    CategoryRepository categoryRepository;

    public Post create(CreatePost dto){
        Category category = categoryRepository.findBySlug(dto.getFkCategorySlug());

        if (category == null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Essa categoria não existe");
        }

        Post existPost = repository.findBySlug(dto.getSlug());
        if (existPost != null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Já existe um post com esse slug");
        }
        return repository.insert(dto.toPost());
    }

    public void delete(String slug){
        Post post = repository.findBySlug(slug);
        if (post == null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Esse post não existe");
        }
        repository.delete(post);
    }

    public Post find(String slug){
        Post post = repository.findBySlug(slug);
        if (post == null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Esse post não existe");
        }
        return post;
    }

    public List<Post> findAll(){
        return repository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    public List<Post> findByCategory(String slug){
        return repository.findByFkCategorySlug(slug, Sort.by(Sort.Direction.DESC, "createdAt"));
    }
}
