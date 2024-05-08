import { useNavigate } from "react-router-dom";
import { DangerButton } from "./dangerButton";
import { OkButton } from "./okButton";
import { app } from "../contexts/user";

export interface Category {
  slug: string;
  title: string;
  fk_user_email: string;
  created_at?: Date;
}

interface Props {
  isAdm: boolean;
  category: Category;
}

export function CategoryComponent(props: Props) {
  const navigate = useNavigate();
  const { category, isAdm } = props;

  const seePosts = async (slug: string) => {
    navigate(`/posts/${slug}`);
  };

  const deleteCategory = async () => {
    await app.delete(`/category/${category.slug}`);
    window.location.reload();
  };

  return (
    <div className="w-1/3 border rounded-md p-4 flex flex-col gap-2">
      <h1 className="text-4xl text-black">{category.title}</h1>

      <p>Criado por: {category.fk_user_email}</p>
      <hr />
      <div className="flex justify-around">
        <OkButton
          onClick={() => {
            seePosts(category.slug);
          }}
          value="VER POSTS"
        />
        {isAdm && (
          <>
            <DangerButton
              value="DELETAR"
              onClick={() => {
                deleteCategory();
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
