package joaopaulo.server.post;

import joaopaulo.server.post.entities.Post;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PostRepository  extends MongoRepository<Post, String> {
    public void deleteByFkCategorySlug(String id);
    public List<Post> findByFkCategorySlug(String id);
    public Post findBySlug(String slug);
}
