import { useEffect, useState } from "react";
import { app, useUserContext } from "../contexts/user";
import { TailSpin } from "react-loader-spinner";
import icon from "../assets/icon.jpg";

export function Start() {
  const { user, setUser } = useUserContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  return isLoading && user == undefined ? (
    <div className="flex w-full justify-center">
      <TailSpin color="#505050" height={80} width={80} />
    </div>
  ) : (
    <div className="flex bg-blue-300 h-1/3 w-1/2 p-5 rounded-md flex-wrap break-words">
      <div className="flex flex-row w-full justify-center gap-2">
        <h2>Bem vindo ao Blog {user?.isAdm && "Ademiro"}</h2>
        <img className="w-8 h-8 rounded" src={icon} />
      </div>
      <p className="w-full text-center">
        {user
          ? !user?.isAdm
            ? `Este blog é projetado para entusiastas de tecnologia, desenvolvedores e estudantes que buscam aprofundar seus conhecimentos e habilidades nessas poderosas ferramentas. É desenhado para ser eficiente e escalável, fornecendo uma arquitetura pronta que ajuda a criar aplicações do lado do servidor confiáveis e fáceis de manter. Oferecemos tutoriais sobre como estruturar suas APIs, integrar com MongoDB e usar o poder do TypeScript para melhorar a qualidade do código e a produtividade do desenvolvedor.`
            : `Você é adm então eu não preciso te falar nada`
          : "Entre para ver os posts e as categorias"}
      </p>
    </div>
  );
}
