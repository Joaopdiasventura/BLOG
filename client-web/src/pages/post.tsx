import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUserContext, app } from "../contexts/user";
import { Post as postType } from "../components/postComponents";
import { TailSpin } from "react-loader-spinner";

export function Post() {
  const { slug } = useParams();
  const { user, setUser } = useUserContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [post, setPost] = useState<postType>();

  const getData = async () => {
    setIsLoading(true);
    if (user == undefined) {
      if (localStorage.getItem("token") != null) {
        const token = localStorage.getItem("token");
        setUser(
          await app.get(`/user/decode/${token}`).then((result) => result.data)
        );
      }
    }
    setIsLoading(false);
  };

  const getPost = async () => {
    setIsLoading(true);
    try {
      const result: postType = await app
        .get(`/post/${slug}`)
        .then((result) => result.data);
      const { created_at } = result;

      result.created_at = Intl.DateTimeFormat("pt-BR").format(
        new Date(created_at)
      );
      setPost(result);
    } catch (error) {
      console.log(error);

      setPost(undefined);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
    getPost();
  }, []);

  if (isLoading) {
    return (
      <div className="flex w-full justify-center">
        <TailSpin color="#505050" height={80} width={80} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full flex justify-center">
        <h1>Faça login ou entre para ver os posts</h1>
      </div>
    );
  }
  if (!post) {
    return (
      <div className="w-full flex justify-center">
        <h1>Não existe um post com esse slug</h1>
      </div>
    );
  }

  return (
    <div className="w-1/3 border rounded-md p-3 flex flex-col gap-3">
      <h1 className="text-3xl text-black">{post.title}</h1>
      <hr />
      <p>{post.content}</p>
      <div className="flex flex-col">
        <small>Criado por: {post.fk_user_email}</small>
        <small>Pertence a categoria : {post.fk_category_slug}</small>
        <small>Postado em: {`${post.created_at}`}</small>
      </div>
    </div>
  );
}
