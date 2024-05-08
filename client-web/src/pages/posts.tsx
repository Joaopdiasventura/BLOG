import { PostComponent, Post } from "../components/postComponents";
import { app, useUserContext } from "../contexts/user";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";

export function Posts() {
  const { user, setUser } = useUserContext();

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getPosts = async () => {
    setIsLoading(true);
    const result = await app.get("/post").then((result) => result.data);
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
      <h1 className="text-left w-1/3 text-4xl text-black">Posts:</h1>
      {posts.map((post) => (
        <PostComponent key={post.slug} post={post} isAdm={user.isAdm} />
      ))}
    </div>
  );
}
