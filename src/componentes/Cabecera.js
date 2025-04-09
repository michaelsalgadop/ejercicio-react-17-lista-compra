import { Link } from "react-router-dom";

export const Cabecera = (props) => {
  return (
    <header className="cabecera espaciado bloque-superior">
      <h1>Lista de la compra</h1>
      <nav>
        <ul className="navegacion">
          <li>
            <Link to="/" className="pointer">
              Principal
            </Link>
          </li>
          <li className="actual">
            <Link to="/lista" className="pointer">
              Lista
            </Link>
          </li>
          <li>
            <Link to="/about" className="pointer">
              Acerca de
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
