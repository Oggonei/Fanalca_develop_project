import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import MandatoryPopup from '../mandatoryPopup/mandatoryPopup'


const Popup_mapeo = ({handlePopup,fetchData}) => {

  let host = window.location.hostname
    
    const [templates,setTemplates] = useState([])
    const [selectValue,setSelectValue] = useState([])
    const [inputValue,setInputValue] = useState()
    const [conector,setConector] = useState([])
    const [newConnector,setNewConnector] = useState(false)
    const [newInfoConnector,setNewInfoConnector] = useState(false)
    const [newInfoConnectorData,setNewInfoConnectorData] = useState([])
    const [selectedTemplate,setSelectedTemplate] = useState([])
    const [defaultValue,setDefaultValue] = useState([])
    const [addTotalValues, setAddTotalValues] = useState({
      'idMapp': '',
      'idConnector': '',
      'idTemplate': '',
      'Seqs': ''
    })
    const [templateConnFields, setTemplateConnFields] = useState([])
    const [error, setError] = useState(false)
 
    const url = `http://${host}:3000/mapeo/templates`;
    const urlConnectors = `http://${host}:3000/mapeo/connectors`;
    const urlMax = `http://${host}:3000/mapeo/templates/max`;
    const fetchTemplates = async () => {
        await axios.get(url).then((res) => {
            setTemplates(res.data);
        });
      };

    const fetchConnectors = async () => {
      if(inputValue && selectValue.length != 0 ){
        await fetchConnectorsConnector()
        await fetchConnectorsMax()
        setNewConnector(true)
      } else {
        hundleError()
      }
    };
    
    const fetchConnectorsConnector = async () => {
      await axios.get(urlConnectors).then((res) => {
        setConector(res.data)
      });
    }
    
    const fetchConnectorsMax = async () => {
      await axios.get(urlMax).then((res) => {
        console.log('max',res.data.lastId)
        setAddTotalValues({...addTotalValues,'idMapp':res.data.urlMax})
      });
    }

    const hundleError = () => {
      setError(!error)
    }


    useEffect(() => {
    fetchTemplates();
    }, []);

    const selectValues = ({value}) => {
        setSelectValue(value)
        setAddTotalValues({...addTotalValues,'idTemplate': value})
    }

    const inputValues = (e) => {
        setInputValue(e.target.value)
    }


      
      const handleInfoConnector = async (e) => {
        setNewInfoConnector(true)
        axios.get(`http://${host}:3000/mapeo/newinfoconnector/${e.value}`)
        .then(function (response) {
          setNewInfoConnectorData(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
        handleSelectedTemplate()
        console.log('idConnector',e.value)
        setAddTotalValues({...addTotalValues,'idConnector': e.value})
      }
      
      const handleSelectedTemplate = (e) => {
        setNewInfoConnector(true)
        axios.get(`http://${host}:3000/mapeo/idtemplate/${selectValue}`)
        .then(function (response) {
          setSelectedTemplate(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
      }

      const handleDefaultValue = (value,index,idConnFields, idTemplateFields ) => {
        let newValue = [...defaultValue]
        newValue[index] = value
        setDefaultValue(newValue)
        let newObject = {
          'id': '',
          'idTemplateFields': '',
          'idConnFields': '',
          'DefaultValue': ''
        }
        newObject.id = index 
        newObject.idTemplateFields = idTemplateFields 
        newObject.idConnFields = idConnFields 
        setTemplateConnFields([...templateConnFields,newObject])
        console.log(templateConnFields)
      }
      
      const handleInput = (e,index) => {
        let newValue = [...templateConnFields]
        newValue[index].DefaultValue = e.target.value
        setTemplateConnFields(newValue)
      }

      const sendInfo = (e) => {
        e.preventDefault()
        axios.post(`http://${host}:3000/mapeo/templates`, {
          'idTemplate': addTotalValues.idTemplate,
          'Description': inputValue
        })
        .then(function (response) {
          //Llenado info 
          console.log('templateConnFields',templateConnFields)
          templateConnFields.map(element => {
            axios.post(`http://${host}:3000/mapeo/templates/mappdef`, {
              "idMapp": response.data.lastId,
              "idConnector": addTotalValues.idConnector,
              "idConnFields": element.idConnFields,
              "idTemplate": addTotalValues.idTemplate, 
              "idTemplateFields": element.idTemplateFields, 
              "DefaultValue": element.DefaultValue
            })
            .then(function (response) {
              console.log(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
          })
        })
        .catch(function (error) {
          console.log(error);
        });
        handlePopup()
        fetchData()
        setAddTotalValues({
          'idMapp': '',
          'idConnector': '',
          'idTemplate': '',
          'Seqs': ''
        })
        setTemplateConnFields([])
      }

  return (
    <>
      {error && <MandatoryPopup errorMandatory={hundleError}/>}
      <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center bg-black opacity-50' />
      <div className='w-full h-full flex justify-center items-center absolute top-0 left-0'>
        <div className='w-5/6 h-5/6 bg-gradient-to-b from-cyan-600 to-blue-900 px-4 rounded-2xl'>
            <div className='flex justify-evenly items-center mt-10 w-full flex-col'>
              <p className='text-xl font-bold'>AGREGAR RELACIÓN</p>
              {/*selector y descripción mappHeader*/}
              <div className='flex w-full justify-between gap-2 mt-4'>
                <Select options={templates} className='w-2/6 text-sky-900' onChange={selectValues}/>
                <input type="text" placeholder='Descripción' className='w-2/6 p-2 rounded-md text-sky-900'onChange={inputValues}/>
                <div className='flex gap-2 w-2/6'>
                  <button className='border text-white bg-sky-900 border-white hover:text-sky-900 hover:bg-white hover:border-sky-900 px-6 w-2/6 rounded-md transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-75 text-2xl font-bold' onClick={fetchConnectors}>+</button>
                  <button className='border text-white bg-green-600 border-white hover:text-green-600 hover:bg-white hover:border-green-600 px-6 text-lg w-2/6 rounded-md transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-75' onClick={sendInfo}>Guardar</button> 
                  <button className='border text-white bg-red-500 border-white hover:text-red-500 hover:bg-white hover:border-red-500 px-6 text-lg w-2/6 rounded-md transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-75' onClick={handlePopup}>Cancelar</button>
                </div>
              </div>
            </div>
            {/*selector y descripción mappDeff*/}
            {newConnector &&
              <div className='w-full flex justify-center items-center my-4'>
                <p className='text-lg'> Selecciona conector: </p>
                <Select options={conector} className='w-2/5 text-sky-900 ml-4' onChange={handleInfoConnector} />
              </div>
            }
            {newInfoConnector &&
            <div className="h-3/5 flex flex-col justify-start px-6 overflow-y-scroll ">
              <table className="shadow-2xl bg-sky-800 mb-4">
                <thead className="border-none text-left">
                  <tr className="bg-sky-900">
                    <th className="p-2 w-1/5">Nombre</th>
                    <th className="p-2 w-3/5">Selector</th>
                    <th className="p-2 w-1/5">Valor por defecto</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    newInfoConnectorData.map((data,index) => {
                      //{console.log('3er Conector', newInfoConnectorData)}
                      return (
                        <tr key={data.id} className="text-sm">
                          <td className="border border-sky-900 p-3 conten">{data.FieldName}</td>
                          <td className="border border-sky-900 px-2 text-center">
                            <Select options={selectedTemplate} className='w-full text-sky-900 px-10' onChange={(e) => handleDefaultValue(e.label, index, data.id, e.value,)} />
                          </td>
                          <td className="border border-sky-900 text-center text-black">
                            {defaultValue[index] === 'Valor por defecto del conector' ? <input type="text" placeholder='valor'  className='p-2 w-full rounded' onChange={(e) => handleInput(e,index)}/> : <input type="text" placeholder='valor' className='p-2 w-full' hidden />}
                          </td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
            }
        </div>

      </div>
        </>
  )
}

export default Popup_mapeo