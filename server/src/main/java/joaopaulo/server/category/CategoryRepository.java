package joaopaulo.server.category;

import joaopaulo.server.category.entities.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CategoryRepository extends MongoRepository<Category, String> {
    public Category findBySlug(String slug);
    public Category findAllById(String id);
}
