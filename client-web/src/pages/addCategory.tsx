import { useState, ChangeEvent, useEffect, FormEvent } from "react";
import { TailSpin } from "react-loader-spinner";
import { InputComponent } from "../components/input";
import { OkButton } from "../components/okButton";
import { app, useUserContext } from "../contexts/user";
import { useNavigate } from "react-router-dom";

export function AddCategory() {
  const navigate = useNavigate();
  const [erro, setErro] = useState<String>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [slug, setSlug] = useState<string>("");

  const { user, setUser } = useUserContext();

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
  }, []);

  const doPost = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await app.post("/category", {
        title,
        slug,
        fk_user_email: user.email,
      });
      navigate("/addPost");
    } catch (error) {
      setErro(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user.isAdm) {
    return (
      <div className="w-full flex justify-center">
        <h1>Somente Administradores podem criar categorias</h1>
      </div>
    );
  }

  return (
    <div className="w-2/5 flex flex-col gap-1.5">
      {isLoading ? (
        <div className="flex w-full justify-center">
          <TailSpin color="#505050" height={80} width={80} />
        </div>
      ) : (
        <>
          {erro && (
            <div className="bg-red-200 text-red-700 font-bold p-2 rounded">
              <p>{erro}</p>
            </div>
          )}
          <h1 className="text-4xl">Crie uma categoria:</h1>
          <form
            className="border p-2 rounded flex gap-2 flex-col"
            onSubmit={doPost}
          >
            <label htmlFor="title">Titulo:</label>
            <InputComponent
              type="text"
              id="title"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              required
            />
            <label htmlFor="slug">Slug:</label>
            <InputComponent
              type="text"
              id="slug"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSlug(e.target.value)
              }
              required
            />
            <OkButton value="CRIAR" />
          </form>
        </>
      )}
    </div>
  );
}
