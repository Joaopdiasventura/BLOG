package joaopaulo.server.post.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Document(collection = "post")
@Getter
@Setter
@Builder
public class Post {
    @Id
    private String id;
    private String name;
    private String content;
    @Indexed(unique = true)
    private String slug;
    private Date createdAt;
    private String fkCategorySlug;

    public Post(String id, String name, String content, String slug, Date createdAt, String fkCategorySlug){
        this.id=id;
        this.name = name;
        this.content = content;
        this.slug = slug;
        this.createdAt = createdAt;
        this.fkCategorySlug = fkCategorySlug;
    }
}
