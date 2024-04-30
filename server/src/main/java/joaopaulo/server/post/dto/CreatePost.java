package joaopaulo.server.post.dto;

import jakarta.validation.constraints.NotBlank;
import joaopaulo.server.post.entities.Post;
import lombok.*;
import org.bson.types.ObjectId;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreatePost {
    @NotBlank(message = "Nome não pode ficar em branco")
    String name;
    @NotBlank(message = "Conteúdo não pode ficar em branco")
    String content;
    @NotBlank(message = "Slug não pode ficar em branco")
    String slug;
    @NotBlank(message = "Slug não pode ficar em branco")
    String fkCategorySlug;

    public Post toPost() {
        return new Post((new ObjectId()).toString(), this.name, this.content, this.slug, new Date(), this.fkCategorySlug);
    }
}
