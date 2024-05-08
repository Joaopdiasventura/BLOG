import { ChangeEvent, FormEvent, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { InputComponent } from "../components/input";
import { OkButton } from "../components/okButton";
import { app, useUserContext } from "../contexts/user";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  const [erro, setErro] = useState<String>();

  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const result = await app
        .post("/user/login", { email, password })
        .then((result) => result.data);

      const { token } = result;
      setErro(undefined);
      localStorage.setItem("token", token);
      const User = await app
        .get(`/user/decode/${token}`)
        .then((result) => result.data);
      setUser(User);
      navigate("/");
    } catch (error) {
      setErro(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

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
          <h1 className="text-4xl">Bem Vindo de Volta</h1>
          <form
            className="border p-2 rounded flex gap-2 flex-col"
            onSubmit={login}
          >
            <label htmlFor="email">Email:</label>
            <InputComponent
              type="email"
              id="email"
              required
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
            />
            <label htmlFor="password">Senha:</label>
            <InputComponent
              type="password"
              id="password"
              required
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
            />
            <OkButton value="ENTRAR" />
          </form>
          <a
            href="/register"
            className="text-blue-500 w-full flex justify-center"
          >
            <p>Não tem uma conta?</p>
          </a>
        </>
      )}
    </div>
  );
}
