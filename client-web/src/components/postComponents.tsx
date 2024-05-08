import { useNavigate } from "react-router-dom";
import { DangerButton } from "./dangerButton";
import { app } from "../contexts/user";
import { OkButton } from "./okButton";

export interface Post {
  slug: string;
  title: string;
  content?: string;
  fk_user_email: string;
  fk_category_slug: string;
  created_at?: Date | string;
}

interface Props {
  isAdm: boolean;
  post: Post;
}

export function PostComponent(props: Props) {
  const navigate = useNavigate();
  const { post, isAdm } = props;

  const seePost = () => {
    navigate(`/post/${post.slug}`);
  };

  const deletePost = async () => {
    await app.delete(`/post/${post.slug}`);
    window.location.reload();
  };

  return (
    <div className="w-1/3 border rounded-md p-4 flex flex-col gap-2">
      <h1 className="text-4xl text-black">{post.title}</h1>

      <p>Criado por: {post.fk_user_email}</p>
      <small>Pertence a categoria: {post.fk_category_slug}</small>
      <hr />
      <div className="flex justify-around">
        <OkButton
          onClick={() => {
            seePost();
          }}
          value="VER POST"
        />
        {isAdm && (
          <>
            <DangerButton
              value="DELETAR"
              onClick={() => {
                deletePost();
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
