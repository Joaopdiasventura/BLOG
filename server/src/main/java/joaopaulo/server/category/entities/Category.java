package joaopaulo.server.category.entities;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;


@Document(collection = "category")
@Getter
@Setter
@Builder
public class Category {
    @Id
    private String id;
    private String name;
    @Indexed(unique = true)
    private String slug;
    private Date createdAt;

    public Category(String name, String slug, String id, Date createdAt){
        this.name = name;
        this.slug = slug;
        this.id = id;
        this.createdAt = createdAt;
    }
}
