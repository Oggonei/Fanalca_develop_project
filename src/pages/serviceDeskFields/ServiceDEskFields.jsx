import Header from "../../components/header/Header";
import PopupEdit from "../../components/popupEdit/PopupEdit.jsx";
import { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import PopupServiceDEskFields from "../../components/popupServiceDeskFields/PopupServiceDEskFields.jsx";
import EditPopupServiceDeskField from "../../components/editPopupServiceDeskFields/EditPopupServiceDeskField.jsx";
import { FaFilter } from "react-icons/fa";




const ServiceDEskFields = () => {
  let host = window.location.hostname
    const url = `http://${host}:3000/servicedeskfields`;
    const urlTemplates = `http://${host}:3000/servicedeskfields/template`;
    const templatesUrl = `http://${host}:3000/templates`;
    const [data, setData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [idTemplatesData, setIdTemplatesData] = useState([]);
    const [popup, setPopup] = useState(false);
    const [editPopup, setEditPopup] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
    const [itemId, setItemId] = useState('');
    const [showTemplatesId, setShowTemplatesId] = useState(false);



  
    let navigate = useNavigate();
  
    const goMenu = () => {
    navigate('/menu');
    }
  
    const handlePopup = () => {
      setPopup(!popup);
    };

    const filterTemplate = (id) => {
      let newData = data;
      setTableData(newData.filter(item => item.templateName === id))
      setShowTemplatesId(!showTemplatesId);
    }
  
    const fetchData = async () => {
      return axios.get(urlTemplates).then((res) => {
        setTableData(res.data);
        setData(res.data);
      });
    };

    const toggleTemplatesId = () => {
      setShowTemplatesId(!showTemplatesId);
    }
    
    const fetchTemplatesData = async () => {
      return axios.get(templatesUrl).then((res) => {
        const data = res.data;
        const ids = data.map((template => template.Name));
        setIdTemplatesData(ids);
      });
    };
  
    const addData = (value) => {
      setData([...data, value]);
      addTemplate(value)
    };
  /*
    const editData = (value) => {
      setData([...data, value]);
      editTemplate(itemId,value)
    };
    */

    const editData = (value) => {
      const newData = data;
      newData.forEach(item => {
        if(item.id === value.id) {
          item.idTemplate = value.idTemplate;
          item.Name = value.Name;
          item.CodeName = value.CodeName
        }
        console.log(newData)
      })
      setData(newData);
      editTemplate(itemId,value)
    };
  
    const deleteItem = (id) => {
      const newData = data.filter((item) => item.id !== id);
      setData(newData);
    };
  
    
    const addTemplate = (value) => {
      axios.post(`http://${host}:3000/servicedeskfields`, value)
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
        "idTemplate": value.idTemplate,
        "Name": value.Name,
        "CodeName": value.CodeName
      }
      console.log(value)
      axios.patch(`http://${host}:3000/servicedeskfields`, newValue)
      .then(function (response) {
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
      axios.delete(`http://${host}:3000/servicedeskfields/${itemId}`)
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
      fetchTemplatesData();
    }, []);
  
    return (
      <div className="w-full h-full bg-gradient-to-b from-cyan-600 to-blue-900 lg:h-screen md:h-screen  text-white portrait:h-screen max-h-800px overflow-auto">
        {popup && <PopupServiceDEskFields popup={handlePopup} addData={addData}/>}
        {editPopup && <EditPopupServiceDeskField popup={handleEditPopup} editData={editData} itemId={data.filter(element => element.id === itemId)}/>}
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
        <div id="deletePopup" className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-100 bg-black z-50">
          <div className=" bg-gradient-to-b from-cyan-600 to-blue-900 h-2/6 w-2/6 rounded-2xl flex justify-center items-center flex-col text-lg z-10 opacity-100">
            <p>¿Esta seguro que desea eliminar el campo de Service Desk?</p>
            <div className="mt-10 flex gap-5">
              <button className="border rounded-lg shadow-2xl text-base max-w-32 md:h-10 md:max-w-40 hover:text-red-600 hover:bg-white hover:border-red-600
          transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-75 px-8 bg-red-600" onClick={popupDeleteItem}>Si</button>
              <button className="border rounded-lg shadow-2xl text-base max-w-32 md:h-10 md:max-w-40 hover:text-sky-700 hover:bg-white hover:border-sky-800
          transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-75 px-8" onClick={handleDeletePopup}>Cancelar</button>
            </div>
          </div>
        </div>
        }
  
        <div className="h-4/6 flex flex-col justify-start px-6 overflow-y-scroll">
          <table className="shadow-2xl bg-sky-800 mb-4">
            <thead className="border-none border-2 text-left">
              <tr className="bg-sky-900">
                <th className="p-2">ID</th>
                <th className="p-2 relative flex items-center">
                  Plantilla
                  <span onClick={toggleTemplatesId} className="ml-2 cursor-pointer hover:text-sky-600">
                    <FaFilter />
                  </span>
                  {
                    showTemplatesId &&
                      <div className="absolute w-full left-0 top-full bg-sky-900 text-center">
                        {
                          idTemplatesData.map(id => <p onClick={() => filterTemplate(id)} key={`temp-${id}`} className="cursor-pointer hover:bg-white hover:text-sky-900">{id}</p>)
                        }
                      </div>
                  }
                </th>
                <th className="p-2 ">Nombre</th>
                <th className="p-2 ">Código</th>
                <th className="p-2">Editar</th>
                <th className="p-2">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((data) => {
                return (
                  <tr key={data.id} className="text-sm">
                    <td className="border border-sky-900 p-3 conten">{data.id}</td>
                    <td className="border border-sky-900 p-3 conten">{data.templateName}</td>
                    <td className="border border-sky-900 pl-4 ">{data.Name}</td>
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

export default ServiceDEskFields