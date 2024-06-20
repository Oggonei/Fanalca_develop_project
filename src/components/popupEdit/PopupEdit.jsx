import React, { useEffect } from 'react'
import { useState } from "react";
import Input from "../Imput/Input";
import MandatoryPopup from "../mandatoryPopup/mandatoryPopup";

const PopupEdit = ({ popup, editData, edit, input1, input2, itemId }) => {
    
      const [data, setData] = useState({
        id: "",
        Name: "",
        CodeName: "",
      });
      const [error, setError] = useState(false)

    
      const updateVal = (val, key) => {
        setData({
          ...data,
          [key]: val,
        });
      };

      const handleError = () => {
        setError(!error)
      }
    
      const functionsOnClickAdd = () => {
        if(data.Name && data.CodeName){
          popup(), editData(data);
        }else {
           handleError()
        }
      };

      useEffect(() => {
        setData(itemId[0])
      },[])
    
      return (
        <>
          {error && <MandatoryPopup errorMandatory={handleError}/>}
          <div className="h-screen w-screen bg-black opacity-100 absolute top-0 left-0 flex justify-center items-center" />
          <div className="h-screen w-screen absolute top-0 left-0 flex justify-center items-center">
            <div className="h-3/6 w-3/6 bg-gradient-to-b from-cyan-600 to-blue-900 flex justify-center items-center rounded-3xl flex-col">
              <div
                id="input-container"
                className="flex flex-col w-full items-center"
              >
                <p className="text-xl mb-2">Editar {edit}</p>
                <Input
                  type="user"
                  dataKey="Name"
                  holder={input1}
                  func={updateVal}
                  addClass="w-3/5"
                  value={data.Name}
                  />
                <Input
                  type="user"
                  dataKey="CodeName"
                  holder={input2}
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

export default PopupEdit
