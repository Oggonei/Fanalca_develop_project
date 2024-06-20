import Header from "../../components/header/Header";
import PopupEdit from "../../components/popupEdit/PopupEdit.jsx";
import { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import Popup from "../../components/popup/Popup";
import { useNavigate } from 'react-router-dom';
import EditPopupMotorcycleTaxes from "../../components/editPopupMotorcycleTaxes/EditPopupMotorcycleTaxes.jsx";
import PopupMotorcycleTaxes from "../../components/popupMotorcycleTaxes/PopupMotorcycleTaxes.jsx";

const MotorcycleTaxes = () => {
  let host = window.location.hostname

    const url = `http://${host}:3000/motorcycletaxes`;
    const [data, setData] = useState([]);
    const [popup, setPopup] = useState(false);
    const [editPopup, setEditPopup] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
    const [itemId, setItemId] = useState('');
  
    let navigate = useNavigate();
  
    const goMenu = () => {
    navigate('/menu');
    }
  
    const handlePopup = () => {
      setPopup(!popup);
    };
  
    const fetchData = async () => {
      return axios.get(url).then((res) => {
        setData(res.data);
      });
    };
  
    const addData = (value) => {
      setData([...data, value]);
      addTemplate(value)
      fetchData();
    };
  
    const editData = (value) => {
      setData([...data, value]);
      editTemplate(itemId,value)
      fetchData();
    };
  
    const deleteItem = (id) => {
      const newData = data.filter((item) => item.id !== id);
      setData(newData);
    };
  
    
    const addTemplate = (value) => {
      axios.post(`http://${host}:3000/motorcycletaxes`, value)
      .then(function (response) {
        console.log(response);
        fetchData();
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    
    const editTemplate = (itemId,value) => {
      const newValue = {
        "id": itemId,
        "tax": value.tax,
        "tipo_iva_iva": value.tipo_iva_iva,
        "clase_iva_iva":value.clase_iva_iva ,
        "valor_iva_iva": value.valor_iva_iva ,
        "tipo_rta_rta": value.tipo_rta_rta,
        "clase_rta_rta": value.clase_rta_rta,
        "valor_rta_rta": value.valor_rta_rta ,
        "tipo_rta_rta_2_5": value.tipo_rta_rta_2_5 ,
        "clase_rta_rta_2_5": value.clase_rta_rta_2_5 ,
        "valor_rta_rta_2_5": value.valor_rta_rta_2_5 ,
        "tipo_rta_iva_15": value.tipo_rta_iva_15 ,
        "clase_rta_iva_15": value.clase_rta_iva_15 ,
        "valor_rta_iva_15": value.valor_rta_iva_15 ,
        "tipo_iva_rta_ser_4": value.tipo_iva_rta_ser_4 ,
        "clase_iva_rta_ser_4": value.clase_iva_rta_ser_4 ,
        "valor_iva_rta_ser_4": value.valor_iva_rta_ser_4,
        "tipo_auto_rta": value.tipo_auto_rta ,
        "clase_auto_rta": value.clase_auto_rta ,
        "valor_auto_rta": value.valor_auto_rta 
      }
      axios.patch(`http://${host}:3000/motorcycletaxes`, newValue)
      .then(function (response) {
        console.log(response);
        fetchData();
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  
    const handleDeletePopup = () => {
      setDeletePopup(!deletePopup)
    }
  
    const handleEditPopup = () => {
      setEditPopup(!editPopup)
    }
  
    const updateItemId = (id) => {
      setItemId(id)
      handleDeletePopup()
    }
  
    const updateDBItemId = (id) => {
      setItemId(id)
      handleEditPopup()
    }
  
    
    const popupDeleteItem = () => {
      axios.delete(`http://${host}:3000/motorcycletaxes/${itemId}`)
      .then(function (response) {
        setTimeout(() => {
          fetchData();
        }, 50);
      })
      .catch(function (error) {
        console.log(error);
      });
      setDeletePopup(!deletePopup)
      fetchData()
    }
  
    useEffect(() => {
      fetchData();
    }, []);
  
    return (
      <div className="w-full h-full bg-gradient-to-b from-cyan-600 to-blue-900 lg:h-screen md:h-screen  text-white portrait:h-screen max-w-800px overflow-auto">
        {popup && <PopupMotorcycleTaxes popup={handlePopup} addData={addData} />}
        {editPopup && <EditPopupMotorcycleTaxes popup={handleEditPopup} editData={editData} />}
        <Header />
        <div id="buttons-container" className="flex mb-2 ml-3 w-1/5">
          <button
            className="border rounded-lg m-2 shadow-2xl text-base max-w-32 md:h-10 md:max-w-40 md:mt-2 md:hover:text-sky-700 md:hover:bg-white md:hover:border-sky-800
              transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-75 px-8"
            onClick={handlePopup}
          >
            Crear
          </button>
          <button 
            className="border rounded-lg m-2 shadow-2xl text-base max-w-32 md:h-10 md:max-w-40 md:mt-2 md:hover:text-sky-700 md:hover:bg-white md:hover:border-sky-800
            transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-75 px-8"
            onClick={goMenu}> 
              Menu
          </button>
        </div>
  
        {deletePopup &&
        <div id="deletePopup" className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-100 bg-black z-20">
          <div className=" bg-gradient-to-b from-cyan-600 to-blue-900 h-2/6 w-2/6 rounded-2xl flex justify-center items-center flex-col text-lg z-30 opacity-100">
            <p>¿Esta seguro que desea eliminar la plantilla?</p>
            <div className="mt-10 flex gap-5">
              <button className="border rounded-lg shadow-2xl text-base max-w-32 md:h-10 md:max-w-40 hover:text-red-600 hover:bg-white hover:border-red-600
          transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-75 px-8 bg-red-600" onClick={popupDeleteItem}>Si</button>
              <button className="border rounded-lg shadow-2xl text-base max-w-32 md:h-10 md:max-w-40 hover:text-sky-700 hover:bg-white hover:border-sky-800
          transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-75 px-8" onClick={handleDeletePopup}>Cancelar</button>
            </div>
          </div>
        </div>
        }
  
        <div className="h-auto flex flex-col justify-start mx-6 overflow-x-scroll">
          <table className="shadow-2xl bg-sky-800 mb-4">
            <thead className="border-none border-2 text-left">
              <tr className="bg-sky-900 text-center">
                <th className="p-2 " colSpan="2"></th>
                <th className="p-2 border border-sky-800" colSpan="3">IVA</th>
                <th className="p-2 border border-sky-800" colSpan="3">Rta</th>
                <th className="p-2 border border-sky-800" colSpan="3">Rta 2.5</th>
                <th className="p-2 border border-sky-800" colSpan="3">Renta IVA 15%</th>
                <th className="p-2 border border-sky-800" colSpan="3">Rtser4%</th>
                <th className="p-2 border border-sky-800" colSpan="3">AutoRTA</th>
                <th className="p-2" colSpan="2"></th>
              </tr>
              <tr className="bg-sky-900 text-center">
                <th className="p-2 border border-sky-800">ID</th>
                <th className="p-2 border border-sky-800">Impuesto</th>
                <th className="p-2 border border-sky-800">Tipo (IVA)</th>
                <th className="p-2 border border-sky-800">Clase  (IVA)</th>
                <th className="p-2 border border-sky-800">Valor (IVA)</th>
                <th className="p-2 border border-sky-800">Tipo  (RTA)</th>
                <th className="p-2 border border-sky-800">Clase  (Rta)</th>
                <th className="p-2 border border-sky-800">Valor  (Rta)</th>
                <th className="p-2 border border-sky-800">Tipo  (Rta)</th>
                <th className="p-2 border border-sky-800">Clase  (Rta)</th>
                <th className="p-2 border border-sky-800">Valor  (Rta)</th>
                <th className="p-2 border border-sky-800">Tipo IVA (15%)</th>
                <th className="p-2 border border-sky-800">Clase IVA (15%)</th>
                <th className="p-2 border border-sky-800">Valor  (Rta)</th>
                <th className="p-2 border border-sky-800">Tipo IVA (15%)</th>
                <th className="p-2 border border-sky-800">Clase IVA (15%)</th>
                <th className="p-2 border border-sky-800">Valor  (Rta)</th>
                <th className="p-2 border border-sky-800">Tipo IVA (15%)</th>
                <th className="p-2 border border-sky-800">clase IVA(15%)</th>
                <th className="p-2 border border-sky-800">Valor  (Rta)</th>
                <th className="p-2" colSpan={2}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map((data) => {
                return (
                  <tr key={data.id} className="text-sm text-center">
                    <td className="border border-sky-900 p-3 conten">{data.id}</td>
                    <td className="border border-sky-900 ">{data.tax}</td>
                    <td className="border border-sky-900">{data.tipo_iva_iva}</td>
                    <td className="border border-sky-900">{data.clase_iva_iva}</td>
                    <td className="border border-sky-900">{data.valor_iva_iva}</td>
                    <td className="border border-sky-900">{data.tipo_rta_rta}</td>
                    <td className="border border-sky-900">{data.clase_rta_rta}</td>
                    <td className="border border-sky-900">{data.valor_rta_rta}</td>
                    <td className="border border-sky-900">{data.tipo_rta_rta_2_5}</td>
                    <td className="border border-sky-900">{data.clase_rta_rta_2_5}</td>
                    <td className="border border-sky-900">{data.valor_rta_rta_2_5}</td>
                    <td className="border border-sky-900">{data.tipo_rta_iva_15}</td>
                    <td className="border border-sky-900">{data.clase_rta_iva_15}</td>
                    <td className="border border-sky-900">{data.valor_rta_iva_15}</td>
                    <td className="border border-sky-900">{data.tipo_iva_rta_ser_4}</td>
                    <td className="border border-sky-900">{data.clase_iva_rta_ser_4}</td>
                    <td className="border border-sky-900">{data.valor_iva_rta_ser_4}</td>
                    <td className="border border-sky-900">{data.tipo_auto_rta}</td>
                    <td className="border border-sky-900">{data.clase_auto_rta}</td>
                    <td className="border border-sky-900">{data.valor_auto_rta}</td>
                    <td className="border border-sky-900 text-center">
                      <button
                        className="cursor-pointer hover:text-sky-900"
                        onClick={() => updateDBItemId(data.id)}
                      >
                        <MdEdit />
                      </button>
                    </td>
                    <td className="border border-sky-900 text-center">
                      <button
                        className="cursor-pointer hover:text-red-600"
                        onClick={() => updateItemId(data.id)}
                      >
                        <MdDelete className="pointer-events-none" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default MotorcycleTaxes