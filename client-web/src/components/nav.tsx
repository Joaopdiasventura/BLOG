import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/user";
import icon from "../assets/icon.jpg";

export function NavComponent() {
  const { user } = useUserContext();

  return (
    <nav className="flex bg-zinc-700 w-screen items-center gap-5 p-2 text-white absolute top-0 flex-wrap break-words">
      <Link to="/" className="rounded transition-all">
        <img src={icon} alt="Logo" className="rounded w-12" />
      </Link>
      {user && (
        <>
          <Link to="/posts" className="transition-all hover:text-gray-300">
            Posts
          </Link>
          <Link to="/categories" className="transition-all hover:text-gray-300">
            Categorias
          </Link>
          {user.isAdm && (
            <>
              <Link
                to="/addPost"
                className="transition-all hover:text-gray-300"
              >
                Adicionar Post
              </Link>
              <Link
                to="/addCategory"
                className="transition-all hover:text-gray-300"
              >
                Adicionar Categoria
              </Link>
            </>
          )}
        </>
      )}
      <>
        <Link to="/login" className="transition-all hover:text-gray-300">
          Entrar
        </Link>
        <Link to="/register" className="transition-all hover:text-gray-300">
          Registrar
        </Link>
      </>
    </nav>
  );
}
