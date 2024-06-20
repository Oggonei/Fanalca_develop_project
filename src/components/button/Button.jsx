import { Link } from "react-router-dom";
const Button = (props) => {


  const { name, verify } = props 
    //<Link to='/menu' className="w-full flex items-center justify-center">
    //  </Link>  
  return (
    <button
      className="border rounded-lg m-2 shadow-2xl text-base max-w-32 md:h-10 md:max-w-40 md:mt-2 md:hover:text-sky-700 md:hover:bg-white md:hover:border-sky-800
        transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-75 px-8
        "
      onClick={verify}
      >
        {name}
    </button>
  );
};

export default Button;
