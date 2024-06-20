import { Link } from "react-router-dom";

const Menu_cards = (props) => {
  const { name, url } = props;
  return (
    <Link to={url}>
      <div className="w-full bg-sky-800 p-6 rounded-2xl text-white shadow-xl cursor-pointer hover:text-sky-900 hover:bg-white hover:border-sky-900 transition ease-in-out hover:-translate-x-2 hover:-translate-y-1 duration-75 lg:h-24 flex items-center">
        <p>{name}</p>
      </div>
    </Link>
  );
};

export default Menu_cards;
