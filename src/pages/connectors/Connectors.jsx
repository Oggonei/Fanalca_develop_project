import Header from "../../components/header/Header";
import PopupEdit from "../../components/popupEdit/PopupEdit.jsx";
import { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import Popup from "../../components/popup/Popup";
import { useNavigate } from 'react-router-dom';
import MandatoryPopup from "../../components/mandatoryPopup/mandatoryPopup.jsx";
import Input from "../../components/Imput/Input.jsx";


const Connectors = () => {
  let host = window.location.hostname
    const url = `http://${host}:3000/connectors`;
    const [data, setData] = useState([]);
    const [popup, setPopup] = useState(false);
    const [editPopup, setEditPopup] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
    const [itemId, setItemId] = useState('');
    const [error, setError] = useState(false)
    const [editValues, setEditValues] = useState([]);


  
    let navigate = useNavigate();
  
    const goMenu = () => {
    navigate('/menu');
    }

    const updateVal = (val, key) => {
      setEditValues({
        ...editValues,
        [key]: val,
      });
    };

    const handleError = () => {
      setError(!error)
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
      axios.post(`http://${host}:3000/connectors`, value)
      .then(function (response) {
        console.log(response);
        fetchData()
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    
    const editTemplate = () => {
      if(editValues.Nombre && editValues.CodeName){
        const newValue = {
          "id": itemId,
          "Name": editValues.Nombre,
          "CodeName": editValues.CodeName
        }
        axios.patch(`http://${host}:3000/connectors`, newValue)
        .then(function (response) {
          //console.log(response);
          fetchData()
        })
        .catch(function (error) {
          console.log(error);
        });
        handleEditPopup()
        fetchData()
      } else {
        handleError()
      }
    }
  
    const handleDeletePopup = () => {
      setDeletePopup(!deletePopup)
    }
  
    const handleEditPopup = () => {
      // const newValue = {
      //   "id": "",
      //   "Name": "",
      //   "CodeName": ""
      // }
      // setEditValues(newValue)
      setEditPopup(!editPopup)
    }
  
    const updateItemId = (id) => {
      setItemId(id)
      handleDeletePopup()
    }
  
    const updateDBItemId = (id) => {
      let x = data.filter(element => element.id === id)
      setEditValues(x[0])
      setItemId(id)
      handleEditPopup()
      console.log('editValues',editValues)
    }
  
    
    const popupDeleteItem = () => {
      axios.delete(`http://${host}:3000/connectors/${itemId}`)
      .then(function (response) {
        console.log(response);
        fetchData()
      })
      .catch(function (error) {
        console.log(error);
      });
      setDeletePopup(!deletePopup)
      fetchData();
    }
  
    useEffect(() => {
      fetchData();
    }, []);
  
    return (
      <div className="w-full h-full bg-gradient-to-b from-cyan-600 to-blue-900 lg:h-screen md:h-screen  text-white portrait:h-screen max-h-800px overflow-auto">
        {popup && <Popup popup={handlePopup} addData={addData} create="conector" input1="Nombre" input2="Código"/>}
        {editPopup && 
          <>
          {error && <MandatoryPopup errorMandatory={handleError}/>}
          <div className="h-screen w-screen bg-black opacity-100 absolute top-0 left-0 flex justify-center items-center" />
          <div className="h-screen w-screen absolute top-0 left-0 flex justify-center items-center">
            <div className="h-3/6 w-3/6 bg-gradient-to-b from-cyan-600 to-blue-900 flex justify-center items-center rounded-3xl flex-col">
              <div
                id="input-container"
                className="flex flex-col w-full items-center"
              >
                <p className="text-xl mb-2">Editar conector</p>
                <Input
                  type="user"
                  dataKey="Nombre"
                  holder="Nombre del conector"
                  func={updateVal}
                  addClass="w-3/5"
                  value={editValues.Nombre}
                  />
                <Input
                  type="user"
                  dataKey="CodeName"
                  holder="Código del conector"
                  func={updateVal}
                  addClass="w-3/5"
                  value={editValues.CodeName}
                />
              </div>
              <div id="buton-container" className="w-full flex justify-center">
                <button
                  className="border bg-red-500 border-white rounded-lg m-2 shadow-2xl text-base max-w-32 md:h-10 md:max-w-40 md:mt-2 md:hover:text-red-500 md:hover:bg-white md:hover:border-red-500
                                transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-75 px-8"
                  onClick={handleEditPopup}
                >
                  Cancelar
                </button>
                <button
                  className="border rounded-lg m-2 shadow-2xl text-base max-w-32 md:h-10 md:max-w-40 bg-green-600 md:mt-2 md:hover:text-green-600 md:hover:bg-white md:hover:border-green-600
                                transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-75 px-8"
                  onClick={editTemplate}
                >
                  Editar
                </button>
              </div>
            </div>
          </div>
        </>
        }
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
        <div id="deletePopup" className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-100 bg-black">
          <div className=" bg-gradient-to-b from-cyan-600 to-blue-900 h-2/6 w-2/6 rounded-2xl flex justify-center items-center flex-col text-lg z-10 opacity-100">
            <p>¿Esta seguro que desea eliminar el conector?</p>
            <div className="mt-10 flex gap-5">
              <button className="border rounded-lg shadow-2xl text-base max-w-32 md:h-10 md:max-w-40 hover:text-red-600 hover:bg-white hover:border-red-600
          transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-75 px-8 bg-red-600" onClick={popupDeleteItem}>Si</button>
              <button className="border rounded-lg shadow-2xl text-base max-w-32 md:h-10 md:max-w-40 hover:text-sky-700 hover:bg-white hover:border-sky-800
          transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-75 px-8" onClick={handleDeletePopup}>Cancelar</button>
            </div>
          </div>
        </div>
        }
  
        <div className="flex flex-col justify-start px-6 ">
          <table className="shadow-2xl bg-sky-800 mb-4">
            <thead className="border-none border-2 text-left">
              <tr className="bg-sky-900">
                <th className="p-2">ID</th>
                <th className="p-2 ">Nombre</th>
                <th className="p-2 ">Código</th>
                <th className="p-2">Editar</th>
                <th className="p-2">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {data.map((data) => {
                return (
                  <tr key={data.id} className="text-sm">
                    <td className="border border-sky-900 p-3 conten">{data.id}</td>
                    <td className="border border-sky-900 pl-4 ">{data.Nombre}</td>
                    <td className="border border-sky-900 pl-4">{data.CodeName}</td>
                    <td className="border border-sky-900 pr-2 text-right">
                      <button
                        className="cursor-pointer hover:text-sky-900"
                        onClick={() => updateDBItemId(data.id)}
                      >
                        <MdEdit />
                      </button>
                    </td>
                    <td className="border border-sky-900 pr-2 text-right">
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

export default Connectors