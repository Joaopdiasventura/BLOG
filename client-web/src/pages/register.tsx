import { ChangeEvent, FormEvent, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { InputComponent } from "../components/input";
import { OkButton } from "../components/okButton";
import { app, useUserContext } from "../contexts/user";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Register() {
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  const [erro, setErro] = useState<String>();

  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [password2, setPassword2] = useState<String>("");

  const [code, setCode] = useState<number>();
  const [test, setTest] = useState<number>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emailSend, setEmailSend] = useState<boolean>(false);

  const requestCode = async (event: FormEvent) => {
    event.preventDefault();
    setErro(undefined);
    if (password != password2) {
      setErro("Senhas devem ser iguais");
      return;
    }
    setEmailSend(true);
    setIsLoading(true);
    const content = Math.floor(Math.random() * 999) + 1;
    setTest(content);
    try {
      await axios.post("https://email-4ocx.onrender.com", {
        to: email,
        title: "Código de verificação",
        content,
      });
    } catch (error) {
      setErro(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (event: FormEvent) => {
    event.preventDefault();
    if (code != test) {
      setErro("Código inválido");
      return;
    }
    setEmailSend(false);
    setIsLoading(true);
    try {
      const result = await app
        .post("/user/register", { email, password })
        .then((result) => result.data);

      const { token } = result;

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
      ) : emailSend ? (
        <>
          {erro && (
            <div className="bg-red-200 text-red-700 font-bold p-2 rounded">
              <p>{erro}</p>
            </div>
          )}
          <form
            className="border p-2 rounded flex gap-2 flex-col"
            onSubmit={register}
          >
            <label htmlFor="code">Código de verificação:</label>
            <InputComponent
              type="number"
              id="code"
              required
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setCode(parseInt(e.target.value));
              }}
            />
            <OkButton value="CRIAR CONTA" />
            <p
              className="text-blue-500 w-full flex justify-center cursor-pointer"
              onClick={requestCode}
            >
              Reenviar email
            </p>
            <p
              className="text-blue-500 w-full flex justify-center cursor-pointer"
              onClick={() => {
                setEmailSend(false);
              }}
            >
              Mudar email
            </p>
          </form>
        </>
      ) : (
        <>
          {erro && (
            <div className="bg-red-200 text-red-700 font-bold p-2 rounded">
              <p>{erro}</p>
            </div>
          )}
          <h1 className="text-4xl">Bem Vindo</h1>
          <form
            className="border p-2 rounded flex gap-2 flex-col"
            onSubmit={requestCode}
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
            <label htmlFor="password2">Repita sua senha:</label>
            <InputComponent
              type="password"
              id="password2"
              required
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setPassword2(e.target.value);
              }}
            />
            <OkButton value="ENVIAR EMAIL" />
          </form>
        </>
      )}
      <a href="/login" className="text-blue-500 w-full flex justify-center">
        <p>Já possui uma conta?</p>
      </a>
    </div>
  );
}
