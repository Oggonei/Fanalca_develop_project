import Header from "../../components/header/Header";
import PopupEdit from "../../components/popupEdit/PopupEdit.jsx";
import { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import Popup from "../../components/popup/Popup";
import { useNavigate } from 'react-router-dom';
import { FaFilter } from "react-icons/fa";
import Select from 'react-select'
import Input from "../../components/Imput/Input.jsx";
import MandatoryPopup from "../../components/mandatoryPopup/mandatoryPopup.jsx";



const ConnectorFields = () => {
  let host = window.location.hostname
    const url = `http://${host}:3000/connectorfields`;
    const urlConenectors = `http://${host}:3000/connectors`;
    const [data, setData] = useState([]);
    const [popup, setPopup] = useState(false);
    const [editPopup, setEditPopup] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [itemId, setItemId] = useState('');
    const [showTemplatesId, setShowTemplatesId] = useState(false);
    const [idTemplatesData, setIdTemplatesData] = useState([]);
    const [connectors, setConnectors] = useState()
    const [newEditValue, setNewEditValue] = useState()
    const [error, setError] = useState(false)




    let navigate = useNavigate();
  
    const goMenu = () => {
    navigate('/menu');
    }

    const handleError = () => {
      setError(!error)
    }

    const getTemplates = () => {
      axios.get(`http://${host}:3000/mapeo/connectors`)
      .then(function (response) {
        //console.log(response)
        setConnectors(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    const updateVal = (val, key) => {
      setNewEditValue({
        ...newEditValue,
        [key]: val,
      });
    };
  
    const handlePopup = async () => {
      setPopup(!popup);
    };

    const toggleTemplatesId = () => {
      setShowTemplatesId(!showTemplatesId);
    }
  
    const fetchData = async () => {
      return axios.get(url).then((res) => {
        setData(res.data);
        setTableData(res.data);
      });
    };

    const filterTemplate = (id) => {
      let newData = data;
      setTableData(newData.filter(item => item.idConnector === id))
      setShowTemplatesId(!showTemplatesId);
    }
  
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

    const fetchTemplatesData = async () => {
      return axios.get(urlConenectors).then((res) => {
        const data = res.data;
        const ids = data.map((template => template.Nombre));
        setIdTemplatesData(ids);
      });
    };
  
    
    const addTemplate = (value) => {
      axios.post(`http://${host}:3000/connectorfields`, value)
      .then(function (response) {
        console.log(response);
        fetchData()
        setNewEditValue({
          'idConnector':'',
          'FieldName':''
        })
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    const handleAddConnector = () => {
      if(newEditValue.idConnector && newEditValue.FieldName){
        addTemplate(newEditValue)
        handlePopup()
      } else {
        handleError()
      }
    }
    
    const editTemplate = (itemId,value) => {
      console.log("itemId",itemId)
      console.log("value",value)
      const newValue = {
        "id": itemId,
        "idConnector": value.idConnector,
        "FieldName": value.FieldName
      }
      axios.patch(`http://${host}:3000/connectorfields`, newValue)
      .then(function (response) {
        console.log(response);
        fetchData()
        setNewEditValue({
          'idConnector':'',
          'FieldName':''
        })
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  
    const handleDeletePopup = () => {
      setDeletePopup(!deletePopup)
    }
  
    const handleEditPopup = () => {
      if(newEditValue.idConnector && newEditValue.FieldName) {
        editTemplate(itemId,newEditValue)
        setEditPopup(!editPopup)
      } else {
        handleError()
      }
    }
  
    const updateItemId = (id) => {
      setItemId(id)
      handleDeletePopup()
    }
  
    const updateDBItemId = (id) => {
      console.log("id", id)
      let x = data.filter(element => element.id === id)
      console.log("x", x)
      setNewEditValue(x[0])
      setItemId(id)
      setEditPopup(!editPopup)
      console.log("newEditValue", newEditValue)
    }
  
    
    const popupDeleteItem = () => {
      axios.delete(`http://${host}:3000/connectorfields/${itemId}`)
      .then(function (response) {
        console.log(response);
        fetchData()
      })
      .catch(function (error) {
        console.log(error);
      });
      setDeletePopup(!deletePopup)
    }
  
    useEffect(() => {
      fetchData();
      fetchTemplatesData()
      getTemplates()
    }, []);
  
    return (
      <div className="w-full h-full bg-gradient-to-b from-cyan-600 to-blue-900 lg:h-screen md:h-screen  text-white portrait:h-screen max-h-800px overflow-auto">
        {error && <MandatoryPopup errorMandatory={handleError}/>}
        {popup && 
              <>
              <div className="h-screen w-screen bg-black opacity-50 absolute top-0 left-0 flex justify-center items-center" />
              <div className="h-screen w-screen absolute top-0 left-0 flex justify-center items-center">
                <div className="h-3/6 w-3/6 bg-gradient-to-b from-cyan-600 to-blue-900 flex justify-center items-center rounded-3xl flex-col">
                  <div
                    id="input-container"
                    className="flex flex-col w-full items-center"
                  >
                    <p className="text-xl mb-2">Agregar campo de conector</p>
                    <Select options={connectors} className='w-3/6 text-sky-900 px-10' defaultValue={{'label':'Seleccione Conector', 'value': '0'}} onChange={(e) => updateVal(e.value,'idConnector')}/>
                    <Input
                      type="user"
                      dataKey="FieldName"
                      holder="Nombre del campo"
                      func={updateVal}
                      addClass="w-3/5"
                    />
                  </div>
                  <div id="buton-container" className="w-full flex justify-center">
                    <button
                      className="border bg-red-500 border-white rounded-lg m-2 shadow-2xl text-base max-w-32 md:h-10 md:max-w-40 md:mt-2 md:hover:text-red-500 md:hover:bg-white md:hover:border-red-500
                                    transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-75 px-8"
                      onClick={handlePopup}
                    >
                      Cancelar
                    </button>
                    <button
                      className="border rounded-lg m-2 shadow-2xl text-base max-w-32 md:h-10 md:max-w-40 bg-green-600 md:mt-2 md:hover:text-green-600 md:hover:bg-white md:hover:border-green-600
                                    transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-75 px-8"
                      onClick={handleAddConnector}
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            </>
        }
        {editPopup && 
        <>
        <div className="h-screen w-screen bg-black opacity-50 absolute top-0 left-0 flex justify-center items-center" />
        <div className="h-screen w-screen absolute top-0 left-0 flex justify-center items-center">
          <div className="h-3/6 w-3/6 bg-gradient-to-b from-cyan-600 to-blue-900 flex justify-center items-center rounded-3xl flex-col">
            <div
              id="input-container"
              className="flex flex-col w-full items-center"
            >
              <p className="text-xl mb-2">Agregar campo de conector</p>
              <Select options={connectors} className='w-3/6 text-sky-900 px-10' defaultValue={{'label': newEditValue.idConnector, 'value': newEditValue.id}} onChange={(e) => updateVal(e.value,'idConnector')} />
              <Input
                type="user"
                dataKey="FieldName"
                holder="Nombre del campo"
                func={updateVal}
                addClass="w-3/5"
                value={newEditValue.FieldName}
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
                onClick={handleEditPopup}
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
            <p>¿Esta seguro que desea eliminar el campo del conector?</p>
            <div className="mt-10 flex gap-5">
              <button className="border rounded-lg shadow-2xl text-base max-w-32 md:h-10 md:max-w-40 hover:text-red-600 hover:bg-white hover:border-red-600
          transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-75 px-8 bg-red-600" onClick={popupDeleteItem}>Si</button>
              <button className="border rounded-lg shadow-2xl text-base max-w-32 md:h-10 md:max-w-40 hover:text-sky-700 hover:bg-white hover:border-sky-800
          transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-75 px-8" onClick={handleDeletePopup}>Cancelar</button>
            </div>
          </div>
        </div>
        }
  
        <div className="h-auto flex flex-col justify-start px-6 ">
          <table className="shadow-2xl bg-sky-800 mb-4">
            <thead className="border-none border-2 text-left">
              <tr className="bg-sky-900">
                <th className="p-2">ID</th>
                <th className="p-2 relative flex items-center">
                  ID Conector
                  <span onClick={toggleTemplatesId} className="ml-2 cursor-pointer hover:text-sky-600">
                    <FaFilter />
                  </span>
                  {
                    showTemplatesId &&
                      <div className="absolute w-full left-0 top-full bg-sky-900 text-center">
                        {
                          idTemplatesData.map(id => <p onClick={() => filterTemplate(id)} key={`ConField-${id}`} className="cursor-pointer hover:bg-white hover:text-sky-900">{id}</p>)
                        }
                      </div>
                  }
                </th>
                <th className="p-2 ">Nombre del campo</th>
                <th className="p-2">Editar</th>
                <th className="p-2">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((data) => {
                return (
                  <tr key={data.id} className="text-sm">
                    <td className="border border-sky-900 p-3 conten">{data.id}</td>
                    <td className="border border-sky-900 pl-4 ">{data.idConnector}</td>
                    <td className="border border-sky-900 pl-4">{data.FieldName}</td>
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

export default ConnectorFields