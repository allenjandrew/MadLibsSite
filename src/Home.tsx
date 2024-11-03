import { Link, useNavigate } from "react-router-dom";
import { MadLib } from "./scripts/interfaces";

interface HomeProps {
  data: MadLib[];
  handleGenerateNew: () => void;
}

const Home = ({ data, handleGenerateNew }: HomeProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    handleGenerateNew();
    navigate(`/madlib/${data.length.toString()}`); // data.length, not data.length - 1, because the new MadLib has been added but doesn't show up here yet
  };
  return (
    <div className="text-center">
      <h1 className="display-1">MadLibs</h1>
      <img
        className="rounded img-fluid w-25"
        src="/src/assets/madliblogo.jpeg"
        alt="placeholder"
      />
      <nav>
        {data.length === 0 && (
          <div className="alert alert-info mt-5" role="alert">
            No MadLibs yet. Click the button below to generate a new one!
          </div>
        )}
        <ul className="list-group my-4 w-50 mx-auto">
          {data.map(({ title }, id) => (
            <li className="list-group-item" key={id}>
              <Link to={`madlib/${id}`}>{title}</Link>
            </li>
          ))}
        </ul>
        <button className="btn btn-primary btn-lg" onClick={handleClick}>
          Generate new MadLib
        </button>
      </nav>
    </div>
  );
};

export default Home;
