import Input from "../../components/Imput/Input";
import Button from "../../components/button/Button";
import image from "../../images/logo-fanalca.png";
import image_complete from "../../images/logo-fanalca-completo.png";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';



const Login = () => {

  let host = window.location.hostname


  let navigate = useNavigate();
  function loginSuccess() {
    navigate('/menu');
  }

  const [loginData, setLoginData] = useState({
    'user' : '',
    'password' : ''
  })

  const [usuarioEncontrado, setUsuarioEncontrado] = useState(false)
  const [contraseñaEncontrada, setContraseñaEncontrada] = useState(false)
  const [vacios, setVacios] = useState(false)


  const verifyUser = async () => {

    if(loginData.user != "" && loginData.password != ""){
      axios.post(`http://${host}:3000`, loginData)
      .then(function (response) {
        console.log(response.data)
        if(response.data === 'Login Exitoso'){
          loginSuccess()
        }else if(response.data === 'Usuario no existe'){
          setUsuarioEncontrado(true)
          setTimeout(() => {
            setUsuarioEncontrado(false)
          }, 1200);
        }else if(response.data === 'Contraseña incorrecta'){
          setContraseñaEncontrada(true)
          setTimeout(() => {
            setContraseñaEncontrada(false)
          }, 1200);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    } else {
      setVacios(true)
      setTimeout(() => {
        setVacios(false)
      }, 1200);
    }

  }


  const updateVal = (val, key) => {
    setLoginData({
      ...loginData,
      [key]: val,
    });
  }
  
  return (
    <div className="w-screen h-screen bg-gradient-to-b from-cyan-600 to-blue-900 flex justify-center items-center md:justify-end">
      <div className="md:w-3/6 md:flex md:justify-center md:items-center">
        <img
          src={image}
          alt="logo fanalca"
          className="hidden md:block md:w-3/6 md:max-w-52"
        />
      </div>
      <div className="w-2/4 h-1/3 bg-sky-700  min-h-56 rounded-2xl flex justify-center items-center text-white flex-col shadow-2xl max-w-56 md:h-full md:w-3/6 md:max-w-full md:rounded-none md:rounded-l-3xl">
        <div>
          <img src={image} alt="logo fanalca" className="h-10 mb-2 md:hidden" />
        </div>
        <img
          src={image_complete}
          alt="logo fanalca"
          className="hidden md:block md:w-2/6 md:max-w-52 md:mb-5 xl:w-3/6"
        />
        <Input type="user" icon="FaUser" holder="Usuario" dataKey="user" func={updateVal} addClass="w-3/5"/>
        <Input type="PiKeyFill" icon="PiKeyFill" holder="Contraseña" dataKey="password" func={updateVal} addClass="w-3/5"/>
        {usuarioEncontrado && <p className="text-white text-center bg-red-600 p-1 rounded-md mb-1 ml-6 w-2/6 text-sm">Usuario no encontrado</p>}
        {contraseñaEncontrada && <p className="text-white text-center bg-red-600 p-1 rounded-md mb-1 ml-6 w-2/6 text-sm">Contraseña incorrecta</p>}
        {vacios && <p className="text-white text-center bg-red-600 p-1 rounded-md mb-1 ml-6 w-2/6 text-sm">Usuario y contraseña no deben estar vacios</p>}
        <Button name="Ingreso" verify={verifyUser}/>
      </div>
    </div>
  );
};

export default Login;
