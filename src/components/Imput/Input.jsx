import PropTypes from "prop-types";
import { FaUser } from "react-icons/fa";
import { PiKeyFill } from "react-icons/pi";

const Input = (props) => {
  const { type, icon, holder, func, dataKey, addClass, value } = props;

  return (
    <div className={`flex justify-center items-center m-2 md:h-8 ${addClass}`}>
      {type === "user" ? <FaUser /> : <PiKeyFill />}

      <input
        className="ml-2 w-2/3 rounded shadow-2xl h-full p-1 pl-2 font-thin text-sky-800 outline-sky-700"
        type={type == "user" ? "text" : "password"}
        placeholder={holder}
        onChange={(e) => func(e.target.value, dataKey)}
        value={value}
      />
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Input;
