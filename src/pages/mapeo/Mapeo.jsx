import { useState, useEffect } from "react";
import Header from "../../components/header/Header"
import axios from "axios";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Popup_mapeo from "../../components/popup_mapeo/Popup_mapeo";
import { useNavigate } from 'react-router-dom';
import Select from 'react-select'
import { FaPlus } from "react-icons/fa";


const Mapeo = () => {
  let host = window.location.hostname
  let newAllMappDeff


    const url = `http://${host}:3000/mapeo`;
    const defaultValueString = "Valor por defecto del conector"
    const [data, setData] = useState([]);
    const [popupMapeo, setPopupMapeo] = useState(false);
    const [popupDelete, setPopupDelete] = useState(false)
    const [popupEdit, setPopupEdit] = useState(false)
    const [idDelete, setIdDelete] = useState('')
    const [idEdit, setIdEdit] = useState('')
    const [getTemplates, setGetTemplates] = useState([])
    const [editTemplateNames,setEditTemplateNames] = useState({
      'id': '',
      "idTemplate": '',
      'Description': ''
    })
    const [allMapDef, setAllMapDef] = useState([])
    const [error, setError] = useState(false)
    const [values, setValues] = useState([])
    const [popupNewMap, setPopupNewMap] = useState(false)
    const [table, setTable] = useState(false)
    const [newMapValues,setNewMapValues] = useState({
      'idMapp': '',
      "idConnector": '',
      'idConnFields': '',
      'idTemplate': '',
      'idTemplateFields': '',
      'DefaultValue': ''
    })
    const [newMapArr, setNewMapArr] = useState([])
    const [getConectors, setGetConectors] = useState()
    const [conectorFields, setConectorFields] = useState()
    const [templatesValues, setTemplatesValues] = useState()
    const [idMapp, setIdMapp] = useState()
    const [idTemplate, setIdTemplate] = useState()
    const urlConnectors = `http://${host}:3000/mapeo/connectors`;
    let navigate = useNavigate();

    const updateNewMapTemplate = e => {
      setNewMapValues({
        ...newMapValues,
        'idTemplateFields': e.value
      })
    }

    const updateSelector = (e, index) => {
      const arr = newMapArr.slice()
      arr[index] = {
        ...arr[index],
        idTemplateFields: e.value,
        idTemplateFieldsName: e.label,
        DefaultValue: ''
      }
      setNewMapArr(arr)
    }

    const handleNewMapInput = (e, index) => {
      const arr = newMapArr.slice()
      arr[index] = {
        ...arr[index],
        DefaultValue: e.target.value
      }
      setNewMapArr(arr)
    }

    const addNewMap = () => {
      newMapArr.forEach(element => {
        axios.post(`http://${host}:3000/mapeo/addnewmap`, element)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      })
      fetchData();
      setNewMapArr([])
      setPopupNewMap(!popupNewMap)
    }

    const updateNewMapConector = e => {
      setNewMapValues({
        ...newMapValues,
        "idConnector": e.value
      })
      axios.get(`http://${host}:3000/mapeo/newinfoconnector/${e.value}`)
      .then(function (response) {
        setConectorFields(response.data)
        setTable(true)

        const mapArr = []
        response.data.forEach(item => {
          const {idConnector, id} = item
          mapArr.push({
            idConnector,
            idConnFields: id,
            idMapp,
            idTemplate
          })
        })
        setNewMapArr(mapArr)
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    const getConectorslist = async () => {
      await axios.get(urlConnectors).then((res) => {
        setGetConectors(res.data)
      });
    }

    const handlePopupNewMap = id => {
      setIdMapp(id)
      setPopupNewMap(!popupNewMap)
      axios.get(`http://${host}:3000/mapeo/selectedtemplate/${id}`)
      .then(function (response) {
        const idTemplate = response.data[0].idTemplate
        setIdTemplate(idTemplate)
        setNewMapValues({
          ...newMapValues,
          'idTemplate': idTemplate
        })
        axios.get(`http://${host}:3000/mapeo/idtemplate/${id}`)
        .then(function (response) {
          //console.log(response)
          setTemplatesValues(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    
    const cancelPopupNewMap = () => {
      setPopupNewMap(!popupNewMap)
      setNewMapValues({
        'idMapp': '',
        "idConnector": '',
        'idConnFields': '',
        'idTemplate': '',
        'idTemplateFields': '',
        'DefaultValue': ''
      })
      setTable(false)
      setConectorFields([])
    }

    const goMenu = () => {
      navigate('/menu');
      }

    const fetchData = async () => {
        return axios.get(url).then((res) => {
          setData(res.data);
        });
      };

      const handlePopup = () => {
        setPopupMapeo(!popupMapeo)
      }

      const handleEditPopup = () => {
        setPopupEdit(!popupEdit)
        setValues([])
      }
      
      const handleEdit = async (id) => {
        await getAllMappDef(id)
        setIdEdit(id)
        getTemplatesNames()
        handleEditPopup()
    }

    const handleDeleteId = (id) => {
      setIdDelete(id)
      handlePopupDelete()
    }

    const  handlePopupDelete = () => {
      setPopupDelete(!popupDelete)
    }

    const handleEditTemplateNames = ({value}) => {
      setEditTemplateNames({...editTemplateNames, 'idTemplate': value, 'id': idEdit })
    }
    
    const handleChangeDescription = (value) => {
      setEditTemplateNames({...editTemplateNames, 'Description': value})
      console.log(editTemplateNames)
    }

    const deleteItem = () => {
      console.log(idDelete)
      axios.delete(`http://${host}:3000/mapeo/mapheader/${idDelete}`)
      .then(function (response) {
        handlePopupDelete()
        fetchData()
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    const getAllMappDef = async (id) => {
      axios.get(`http://${host}:3000/mapeo/getallmappdef/${id}`)
      .then(function (response) {
        setAllMapDef(response.data)
        console.log(response.data)
        // const newValueArr = []
        // allMapDef.forEach(item => {
        //   const newVal = {
        //     "value": item.idNombreCampoServiceDesk, 
        //     "label": `${item.NombreCampoServiceDesk} - ${item.Nombre}`
        //   }
        //   const pos = newValueArr.map(e => e.label).indexOf(newVal.label);
        //   pos === -1 && newValueArr.push(newVal)
        //   newValueArr.push(newVal)
        // })
        // console.log("vals", newValueArr)
        // setValues(newValueArr)
        axios.get(`http://${host}:3000/mapeo/selectedtemplate/${id}`)
        .then(function (response) {
          //console.log(response)
          setValues(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    const getTemplatesNames = async () => {
      axios.get(`http://${host}:3000/mapeo/templates`)
      .then(function (response) {
        //console.log(response)
        setGetTemplates(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    const editNames = () => {
      axios.post(`http://${host}:3000/mapeo/changenames`, editTemplateNames)
      .then(function (response) {
        console.log(response);
        fetchData();
        
      })
      .catch(function (error) {
        console.log(error);
      });
      handleEditPopup()
    }

    const updateSelect = (e, index) => {
      const newAllMappDeff = allMapDef.slice()
      newAllMappDeff[index].idNombreCampoServiceDesk = e.value
      newAllMappDeff[index].NombreCampoServiceDesk = e.label
      !e.label.includes(defaultValueString) && (newAllMappDeff[index].DefaultValue = '')
      setAllMapDef(newAllMappDeff)
    }

    const handleInput = (e, index) => {
      console.log(e.target.value)
      const newAllMappDeff = allMapDef.slice()
      newAllMappDeff[index].DefaultValue = e.target.value
      setAllMapDef(newAllMappDeff)
    }


      useEffect(() => {
        fetchData();
        getTemplatesNames()
        getConectorslist()
      }, []);

  return (
    <> 
      <div className="w-full h-full bg-gradient-to-b from-cyan-600 to-blue-900 lg:h-screen md:h-screen  text-white portrait:h-screen max-h-800px overflow-auto">
      <Header />
      {
        popupMapeo && <Popup_mapeo handlePopup={handlePopup} fetchData={fetchData}/>
      }
      {
        popupDelete && 
        <>
          <div className="h-screen w-screen bg-black opacity-100 absolute top-0 left-0 flex justify-center items-center" />
          <div className="h-screen w-screen absolute top-0 left-0 flex justify-center items-center flex-col">
            <div className="h-2/6 w-3/6 bg-gradient-to-b from-cyan-600 to-blue-900 flex justify-center items-center rounded-3xl flex-col font-bold text-lg">
              <p>¿Esta seguro que desea eliminar la relación de mapeo?</p>
              <div className="flex mt-4">
                <button className="border bg-red-500 border-white rounded-lg m-2 shadow-2xl text-base max-w-32 md:h-10 md:max-w-40 md:mt-2 md:hover:text-red-500 md:hover:bg-white md:hover:border-red-500
                                      transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-75 px-8" onClick={handlePopupDelete}>Cancelar</button>
                <button className="border rounded-lg m-2 shadow-2xl text-base max-w-32 md:h-10 md:max-w-40 bg-green-600 md:mt-2 md:hover:text-green-600 md:hover:bg-white md:hover:border-green-600
                                      transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-75 px-8" onClick={deleteItem}>Eliminar</button>
              </div>
            </div>
          </div>
        </>
      }
      {
        popupEdit &&
        <>
          <div className="h-screen w-screen bg-black opacity-100 absolute top-0 left-0 flex justify-center items-center" />
          <div className="h-screen w-screen absolute top-0 left-0 flex justify-center items-center flex-col">
            <div className="h-5/6 w-4/6 bg-gradient-to-b from-cyan-600 to-blue-900 flex justify-center items-center rounded-3xl flex-col font-bold text-lg">
              <p className="text-2xl mt-4">Editar relación de mapeo</p>
              {
                /*
                <div className="flex mt-8 gap-4 w-5/6 items-center">
                  <div className="w-5/6 flex justify-center items-center">
                    <label htmlFor="template">Plantilla:</label>
                    <Select options={getTemplates} className='w-full text-sky-900 ml-4 font-normal text-md' onChange={handleEditTemplateNames} ></Select>
                  </div>
                  <div className="w-5/6 flex justify-center items-center">
                    <label htmlFor="template">Descripción:</label>
                    <input type="text" id="template" className="text-sky-900 font-normal ml-4 rounded shadow-2xl p-1 outline-sky-900 w-4/6" onChange={(e) => handleChangeDescription(e.target.value)}/>
                  </div>
                  <button className="border rounded-lg m-2 shadow-2xl text-base max-w-32 md:h-10 md:max-w-40 bg-green-600 md:mt-2 md:hover:text-green-600 md:hover:bg-white md:hover:border-green-600
                                        transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-75 px-8" onClick={editNames}>Editar</button>
                </div>
                
                */
              }
              {
                /*
                <div className="flex gap-4">
                  <div className="w-3/5 flex items-center">
                    <p>Plantilla: </p>
                    <Select options={[{'value': '1', 'label': 'plantilla' }]} className='w-full text-sky-900 ml-4 font-normal text-md' ></Select>
                  </div>
                  <div className="w-3/5 flex items-center">
                    <p>Conector: </p>
                    <Select options={[{'value': '1', 'label': 'conector' }]} className='w-full text-sky-900 ml-4 font-normal text-md' ></Select>
                  </div>
                </div>
                
                */
              }
              <div className="w-5/6 h-1 bg-sky-900 mt-4 rounded"></div>
              <div className="w-full flex mt-4 px-4  flex-col overflow-y-scroll">

                <div className="h-3/5 flex flex-col justify-start px-6 rounded">
                <table className="shadow-2xl bg-sky-800 mb-4 rounded">
                  <thead className="border-none text-left">
                    <tr className="bg-sky-900">
                      <th className="p-2 w-1/5">Conector</th>
                      <th className="p-2 w-1/5">Nombre</th>
                      <th className="p-2 w-3/5">Selector</th>
                      <th className="p-2 w-1/5">Valor por defecto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      allMapDef.map((dataMapp, index) => {
                        return (
                          <tr key={dataMapp.id} className="text-sm">
                            <td className="border border-sky-900 p-3 conten disabled w-1/6">{dataMapp.Nombre}</td>
                            <td className="border border-sky-900 p-3 conten w-1/6"> {dataMapp.FieldName}</td>
                            <td className="border border-sky-900 px-2 text-center w-2/6">
                              <Select options={values} className='w-full text-sky-900 px-10' defaultValue={{'label':dataMapp.NombreCampoServiceDesk, 'value': dataMapp.idNombreCampoServiceDesk}} onChange={(e) => updateSelect(e, index)} />
                            </td>
                            <td className="border border-sky-900 text-center text-black w-2/6">
                              {dataMapp.NombreCampoServiceDesk.includes(defaultValueString) && <input type="text" placeholder='valor'  className='p-2 l rounded text-sky-900' onChange={(e) => handleInput(e, index)} />}
                            </td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </table>
              </div>
              </div>
              <div>
                <button className="border bg-red-500 border-white rounded-lg m-2 shadow-2xl text-base max-w-32 md:h-10 md:max-w-40 md:mt-2 md:hover:text-red-500 md:hover:bg-white md:hover:border-red-500
                                      transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-75 px-8" onClick={handleEditPopup}>Cancelar</button>
                <button className="border rounded-lg m-2 shadow-2xl text-base max-w-32 md:h-10 md:max-w-40 bg-green-600 md:mt-2 md:hover:text-green-600 md:hover:bg-white md:hover:border-green-600
                                      transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-75 px-8" onClick={handleEditPopup} >Editar</button>
              </div>
            </div>
          </div>
        </>
      }
      {
        popupNewMap &&
        <>
        <div className="h-screen w-screen bg-black opacity-100 absolute top-0 left-0 flex justify-center items-center" />
        <div className="h-screen w-screen absolute top-0 left-0 flex justify-center items-center flex-col">
          <div className="h-5/6 w-4/6 bg-gradient-to-b from-cyan-600 to-blue-900 flex justify-center items-center rounded-3xl flex-col font-bold text-lg">
            <p className="text-2xl mt-4">Agregar nueva relación de mapeo</p>
            {/* <div className="flex mt-10 w-5/6 items-center">
              <label className="w-1/6">Plantilla: </label>
              <Select options={getTemplates} className='w-full text-sky-900 px-10 font-normal text-md' defaultValue={{'label':'Selecciona Plantilla', 'value': '0'}} onChange={(e) => updateNewMapTemplate(e)} />
            </div> */}
            <div className="flex w-5/6 mt-4 items-center ">
              <label className="w-1/6">Conector: </label>
              <Select options={getConectors} className='w-full text-sky-900 px-10 font-normal text-md' defaultValue={{'label':'Selecciona Conector', 'value': '0'}} onChange={(e) => updateNewMapConector(e)} />
            </div>
            {table &&
              <div className="flex w-5/6 mt-4 items-center overflow-y-scroll">
                <table className="shadow-2xl bg-sky-800 mb-4 w-full">
                  <thead className="border-none text-left">
                    <tr className="bg-sky-900">
                      <th className="p-2 w-1/5">Nombre</th>
                      <th className="p-2 w-3/5">Selector</th>
                      <th className="p-2 w-1/5">Valor por defecto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      conectorFields.map((data,index) => {
                        //{console.log('3er Conector', newInfoConnectorData)}
                        return (
                          <tr key={data.id} className="text-sm">
                            <td className="border border-sky-900 p-3 conten">{data.FieldName}</td>
                            <td className="border border-sky-900 px-2 text-center">
                              <Select options={templatesValues} className='w-full text-sky-900 px-10' onChange={(e) => updateSelector(e, index)} />
                            </td>
                            <td className="border border-sky-900 text-center text-black">
                              {newMapArr[index]?.idTemplateFieldsName?.includes(defaultValueString) && <input type="text" placeholder='valor'  className='p-2 w-full rounded' onChange={(e) => handleNewMapInput(e,index)} value={newMapArr[index]?.DefaultValue}/>}
                            </td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </table>
              </div>

            }
            <div className="flex mb-4 mt-2">
                <button className="border bg-red-500 border-white rounded-lg m-2 shadow-2xl text-base max-w-32 md:h-10 md:max-w-40 md:mt-2 md:hover:text-red-500 md:hover:bg-white md:hover:border-red-500
                                      transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-75 px-8" onClick={cancelPopupNewMap}>Cancelar</button>
                <button className="border rounded-lg m-2 shadow-2xl text-base max-w-32 md:h-10 md:max-w-40 bg-green-600 md:mt-2 md:hover:text-green-600 md:hover:bg-white md:hover:border-green-600
                                      transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-75 px-8" onClick={addNewMap}>Agregar</button>
              </div>
          </div>
        </div>
        </>
      }

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
      <div className="h-auto flex flex-col justify-start px-6 ">
          <table className="shadow-2xl bg-sky-800 mb-4">
            <thead className="border-none border-2 text-left">
              <tr className="bg-sky-900">
                <th className="p-2">ID</th>
                <th className="p-2 ">Plantilla</th>
                <th className="p-2 ">Descripción</th>
                <th className="p-2 ">Agregar</th>
                <th className="p-2">Editar</th>
                <th className="p-2">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {data.map((data) => {
                return (
                  <tr key={data.id} className="text-sm">
                    <td className="border border-sky-900 p-3">{data.id}</td>
                    <td className="border border-sky-900 pl-4">{data.Name}</td>
                    <td className="border border-sky-900 pl-4">{data.Description}</td>
                    <td className="border border-sky-900 pr-2 text-right">
                      <button
                        className="cursor-pointer hover:text-sky-900"
                        onClick={() => handlePopupNewMap(data.id)}
                      >
                        <FaPlus />
                      </button>
                    </td>
                    <td className="border border-sky-900 pr-2 text-right">
                      <button
                        className="cursor-pointer hover:text-sky-900"
                        onClick={() => handleEdit(data.id)}
                      >
                        <MdEdit />
                      </button>
                    </td>
                    <td className="border border-sky-900 pr-2 text-right">
                      <button
                        className="cursor-pointer hover:text-red-600"
                        onClick={() => handleDeleteId(data.id)}
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
    </>
  )
}

export default Mapeo