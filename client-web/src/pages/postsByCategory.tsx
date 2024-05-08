import { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { Post, PostComponent } from "../components/postComponents";
import { useUserContext, app } from "../contexts/user";
import { Category } from "../components/categoryComponent";

export function PostsByCategory() {
  const { slug } = useParams();
  const { user, setUser } = useUserContext();

  const [title, setTitle] = useState<string>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getPosts = async () => {
    setIsLoading(true);
    const category: Category = await app
      .get(`/category/${slug}`)
      .then((result) => result.data);
    setTitle(category.title);
    const result = await app
      .get(`/post/by/${slug}`)
      .then((result) => result.data);
    setPosts(result);
    setIsLoading(false);
  };

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

  useEffect(() => {
    getData();
    getPosts();
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

  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center">
      <h1 className="text-left w-1/3 text-4xl text-black">
        Posts sobre {title}:
      </h1>
      {posts.map((post) => (
        <PostComponent key={post.slug} post={post} isAdm={user.isAdm} />
      ))}
    </div>
  );
}
