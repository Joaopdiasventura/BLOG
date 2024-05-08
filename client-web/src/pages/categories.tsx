import { CategoryComponent, Category } from "../components/categoryComponent";
import { app, useUserContext } from "../contexts/user";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";

export function Categories() {
  const { user, setUser } = useUserContext();

  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getCategories = async () => {
    setIsLoading(true);
    const result = await app.get("/category").then((result) => result.data);
    setCategories(result);
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
    getCategories();
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
        <h1>Faça login ou entre para ver as categorias</h1>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-5 items-center">
      <h1 className="text-left w-1/3 text-4xl text-black">Categorias:</h1>
      {categories.map((post) => (
        <CategoryComponent key={post.slug} category={post} isAdm={user.isAdm} />
      ))}
    </div>
  );
}
