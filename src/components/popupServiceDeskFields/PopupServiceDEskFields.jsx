import { useEffect, useState } from "react";
import Input from "../Imput/Input";
import Select from 'react-select'
import axios from "axios";
import MandatoryPopup from "../mandatoryPopup/mandatoryPopup";



const PopupServiceDEskFields = ({ popup, addData }) => {
  let host = window.location.hostname

    const [data, setData] = useState({
        id: "",
        idTemplate: "",
        Name: "",
        CodeName: "",
      });
      const [templates, setTemplates] = useState()
      const [error, setError] = useState(false)
    
      const updateVal = (val, key) => {
        setData({
          ...data,
          [key]: val,
        });
      };
    
      const functionsOnClickAdd = () => {
        if(data.idTemplate && data.Name && data.CodeName){
          popup(), addData(data);
        } else {
          handleError()
        }
      };

      const handleError = () => {
        setError(!error)
      }

      const getTemplates = () => {
        axios.get(`http://${host}:3000/mapeo/templates`)
        .then(function (response) {
          //console.log(response)
          setTemplates(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      }

      useEffect(() => {
        getTemplates()
      },[])
    
      return (
        <>
          {error && <MandatoryPopup errorMandatory={handleError}/>}
          <div className="h-screen w-screen bg-black opacity-50 absolute top-0 left-0 flex justify-center items-center" />
          <div className="h-screen w-screen absolute top-0 left-0 flex justify-center items-center">
            <div className="h-3/6 w-3/6 bg-gradient-to-b from-cyan-600 to-blue-900 flex justify-center items-center rounded-3xl flex-col">
              <div
                id="input-container"
                className="flex flex-col w-full items-center"
              >
                <p className="text-xl mb-2">Agregar Campo Service Desk</p>
                <div className="w-3/5 flex justify-center">
                  <Select options={templates} className='w-full max-w-sm text-sky-900 px-10' defaultValue={{'label':'Seleccione plantilla', 'value': '0'}} onChange={(e) => updateVal(e.value,'idTemplate')}/>
                </div>
                <Input
                  type="user"
                  dataKey="Name"
                  holder="Nombre"
                  func={updateVal}
                  addClass="w-3/5"
                />
                <Input
                  type="user"
                  dataKey="CodeName"
                  holder="Código"
                  func={updateVal}
                  addClass="w-3/5"
                />
              </div>
              <div id="buton-container" className="w-full flex justify-center">
                <button
                  className="border bg-red-500 border-white rounded-lg m-2 shadow-2xl text-base max-w-32 md:h-10 md:max-w-40 md:mt-2 md:hover:text-red-500 md:hover:bg-white md:hover:border-red-500
                                transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-75 px-8"
                  onClick={popup}
                >
                  Cancelar
                </button>
                <button
                  className="border rounded-lg m-2 shadow-2xl text-base max-w-32 md:h-10 md:max-w-40 bg-green-600 md:mt-2 md:hover:text-green-600 md:hover:bg-white md:hover:border-green-600
                                transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-75 px-8"
                  onClick={functionsOnClickAdd}
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>
        </>
      );
}

export default PopupServiceDEskFields