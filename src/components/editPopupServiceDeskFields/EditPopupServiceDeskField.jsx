import React from 'react'
import { useState, useEffect } from "react";
import Input from "../Imput/Input";
import Select from 'react-select'
import axios from "axios";
import MandatoryPopup from "../mandatoryPopup/mandatoryPopup";


const EditPopupServiceDeskField = ({ popup, editData , itemId}) => {
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
          popup(), editData(data);
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
        getTemplates(),
        console.log(itemId),
        setData(itemId[0])
      },[])
    
      return (
        <>
          {error && <MandatoryPopup errorMandatory={handleError}/>}
          <div className="h-screen w-screen bg-black opacity-100 absolute top-0 left-0 flex justify-center items-center z-10" />
          <div className="h-screen w-screen absolute top-0 left-0 flex justify-center items-center z-20">
            <div className="h-3/6 w-3/6 bg-gradient-to-b from-cyan-600 to-blue-900 flex justify-center items-center rounded-3xl flex-col">
              <div
                id="input-container"
                className="flex flex-col w-full items-center"
              >
                <p className="text-xl mb-2">Editar Campo de Service Desk</p>
                {console.log('data', data)}

                <Select options={templates} className='w-3/6 text-sky-900 px-10'  onChange={(e) => updateVal(e.value,'idTemplate')} />
                <Input
                  type="user"
                  dataKey="Name"
                  holder="Nombre"
                  func={updateVal}
                  addClass="w-3/5"
                  value={data.Name}
                />
                <Input
                  type="user"
                  dataKey="CodeName"
                  holder="Código"
                  func={updateVal}
                  addClass="w-3/5"
                  value={data.CodeName}
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
                  Editar
                </button>
              </div>
            </div>
          </div>
        </>
      );
}

export default EditPopupServiceDeskField