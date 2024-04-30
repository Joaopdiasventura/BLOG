package joaopaulo.server.category.dtos;

import jakarta.validation.constraints.NotBlank;
import joaopaulo.server.category.entities.Category;
import lombok.*;
import org.bson.types.ObjectId;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateCategory {
    @NotBlank(message = "Nome não pode ficar em branco")
    String name;
    @NotBlank(message = "Slug não pode ficar em branco")
    String slug;

    public Category toCategory() {
        return new Category(this.name, this.slug, (new ObjectId()).toString(), new Date());
    }
}
