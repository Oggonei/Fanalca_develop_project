import React from 'react'
import { useState } from "react";
import Input from "../Imput/Input";
import MandatoryPopup from "../mandatoryPopup/mandatoryPopup";


const PopupMotorcycleTaxes = ({ popup, addData }) => {
    const [data, setData] = useState({
        id: "",
        tax: "",
        tipo_iva_iva: "",
        clase_iva_iva: "",
        valor_iva_iva: "",
        tipo_rta_rta: "",
        clase_rta_rta: "",
        valor_rta_rta: "",
        tipo_rta_rta_2_5: "",
        clase_rta_rta_2_5: "",
        valor_rta_rta_2_5: "",
        tipo_rta_iva_15: "",
        clase_rta_iva_15: "",
        valor_rta_iva_15: "",
        tipo_iva_rta_ser_4: "",
        clase_iva_rta_ser_4: "",
        valor_iva_rta_ser_4: "",
        tipo_auto_rta: "",
        clase_auto_rta: "",
        valor_auto_rta: ""
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
        if(data.clase_auto_rta && data.clase_iva_iva && data.clase_iva_rta_ser_4 && data.clase_rta_iva_15 && data.clase_rta_rta && data.clase_rta_rta_2_5 && data.tax && data.tipo_auto_rta && data.tipo_iva_iva && data.tipo_iva_rta_ser_4 && data.tipo_rta_iva_15 && data.tipo_rta_rta && data.tipo_rta_rta_2_5 && data.valor_auto_rta && data.valor_iva_iva && data.valor_iva_rta_ser_4 && data.valor_rta_iva_15 && data.valor_rta_rta && data.valor_rta_rta_2_5){
          popup(), addData(data);
        } else {
          handleError()
        }

      };
    
      return (
        <>
          {error && <MandatoryPopup errorMandatory={handleError}/>}
          <div className="h-screen w-screen bg-black opacity-100 absolute top-0 left-0 flex justify-center items-center" />
            <div className="h-screen w-screen absolute top-0 left-0 flex justify-center items-center">
                <div className="h-4/6 w-4/6 bg-gradient-to-b from-cyan-600 to-blue-900 flex justify-center items-center rounded-3xl flex-col">
                <div
                    id="input-container"
                    className="flex flex-col flex-wrap w-full items-center"
                >
                    <p className="text-xl mb-2">Crear impuestos motocicletas</p>
                    <div className='w-full flex flex-wrap flex-row'>
                        <Input
                        type="user"
                        dataKey="tax"
                        holder="Impuesto"
                        func={updateVal}
                        />
                        <Input
                        type="user"
                        dataKey="tipo_iva_iva"
                        holder="tipo_iva_iva"
                        func={updateVal}
                        />
                        <Input
                        type="user"
                        dataKey="clase_iva_iva"
                        holder="clase_iva_iva"
                        func={updateVal}
                        />
                        <Input
                        type="user"
                        dataKey="valor_iva_iva"
                        holder="valor_iva_iva"
                        func={updateVal}
                        />
                        <Input
                        type="user"
                        dataKey="tipo_rta_rta"
                        holder="tipo_rta_rta"
                        func={updateVal}
                        />
                        <Input
                        type="user"
                        dataKey="clase_rta_rta"
                        holder="clase_rta_rta"
                        func={updateVal}
                        />
                        <Input
                        type="user"
                        dataKey="valor_rta_rta"
                        holder="valor_rta_rta"
                        func={updateVal}
                        />
                        <Input
                        type="user"
                        dataKey="tipo_rta_rta_2_5"
                        holder="tipo_rta_rta_2_5"
                        func={updateVal}
                        />
                        <Input
                        type="user"
                        dataKey="clase_rta_rta_2_5"
                        holder="clase_rta_rta_2_5"
                        func={updateVal}
                        />
                        <Input
                        type="user"
                        dataKey="valor_rta_rta_2_5"
                        holder="valor_rta_rta_2_5"
                        func={updateVal}
                        />
                        <Input
                        type="user"
                        dataKey="tipo_rta_iva_15"
                        holder="tipo_rta_iva_15"
                        func={updateVal}
                        />
                        <Input
                        type="user"
                        dataKey="clase_rta_iva_15"
                        holder="clase_rta_iva_15"
                        func={updateVal}
                        />
                        <Input
                        type="user"
                        dataKey="valor_rta_iva_15"
                        holder="valor_rta_iva_15"
                        func={updateVal}
                        />
                        <Input
                        type="user"
                        dataKey="tipo_iva_rta_ser_4"
                        holder="tipo_iva_rta_ser_4"
                        func={updateVal}
                        />
                        <Input
                        type="user"
                        dataKey="clase_iva_rta_ser_4"
                        holder="clase_iva_rta_ser_4"
                        func={updateVal}
                        />
                        <Input
                        type="user"
                        dataKey="valor_iva_rta_ser_4"
                        holder="valor_iva_rta_ser_4"
                        func={updateVal}
                        />
                        <Input
                        type="user"
                        dataKey="tipo_auto_rta"
                        holder="tipo_auto_rta"
                        func={updateVal}
                        />
                        <Input
                        type="user"
                        dataKey="clase_auto_rta"
                        holder="clase_auto_rta"
                        func={updateVal}
                        />
                        <Input
                        type="user"
                        dataKey="valor_auto_rta"
                        holder="valor_auto_rta"
                        func={updateVal}
                        />

                    </div>
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

export default PopupMotorcycleTaxes