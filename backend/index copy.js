import { pool } from "./conectionDB.js";
import express from "express"
import cors from "cors"
const port = 3000
let lastId = "a"

const app = express()

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
app.post('/',  async (req, res) => {
    const data =  await getUsers()
    const {user, password} = req.body
    const autenticatedUser = data.filter(element => {
        return element.UserName === user
    })
    console.log(autenticatedUser)
    console.log(password)
    if(autenticatedUser.length){
        if(autenticatedUser[0].Pass === password){
            console.log('Login Exitoso')
            res.send('Login Exitoso')
        }
        else{
            console.log('Contraseña erronea')
            res.send('Contraseña incorrecta')
        }
    }
    else{
        console.log('Usuario no existe')
        res.send('Usuario no existe')
    }
})

//TEMPLATES

app.get('/templates', async (req, res) => {
    const tables = await geSDTables()
    res.send(tables)
})

app.post('/templates', async (req, res) => {
    const{Name,CodeName}=req.body
    addSDTables(Name,CodeName)
    res.send('Got it!')
})

app.delete('/templates/:id', async (req, res) => {
    const {id} = req.params
    let x = await deleteSDTables(id)
    res.json({'error': x})
})

app.patch('/templates', async (req, res) => {
    const {id,Name,CodeName} = req.body
    updateSDTables(id,Name,CodeName)
    res.send('Updated')
})

//SERVICEDESKFIELDS

app.get('/servicedeskfields', async (req, res) => {
    const tables = await getservicedeskfields()
    res.send(tables)
})

app.get('/servicedeskfields/template', async (req, res) => {
    const tables = await getservicedeskfieldsTemplates()
    res.send(tables)
})

const getservicedeskfieldsTemplates = async () => {
    try {
        const result = await pool.query('SELECT sdf."id", sdpt."Name" as "templateName" ,sdf."idTemplate", sdf."Name", sdf."CodeName" FROM public."ServiceDeskFields" sdf left join "ServiceDeskPlusTemplates" sdpt on sdf."idTemplate" = sdpt.id')
        return result.rows
    } catch (error) {
        console.log(error)
    }
}



app.post('/servicedeskfields', async (req, res) => {
    const{idTemplate, Name,CodeName}=req.body
    addServiceDeskField(idTemplate,Name,CodeName)
    res.send('Got it!')
})

app.patch('/servicedeskfields', async (req, res) => {
    const {id,idTemplate,Name,CodeName} = req.body
    updateServiceDeskField(id,idTemplate,Name,CodeName)
    res.send('Updated')
})

app.delete('/servicedeskfields/:id', async (req, res) => {
    const {id} = req.params
    deleteServiceDeskField(id)
    res.send('Deleted')
})


//**Functions

const getservicedeskfields = async () => {
    try {
        const result = await pool.query('SELECT * from "ServiceDeskFields"')
        return result.rows
    } catch (error) {
        console.log(error)
    }
}

const addServiceDeskField = async (idTemplate,Nombre,CodeName) => {
    try {
      //  const result = await pool.query('INSERT INTO public."IntegrationMappHeader" ( "idTemplate", "Description") VALUES('+idTemplate+',\''+Description+'\')')
      var queryText = 'INSERT INTO public."ServiceDeskFields" ( "idTemplate","Name", "CodeName") VALUES($1, $2, $3) RETURNING id'
      pool.query(queryText, [idTemplate,Nombre, CodeName], function(err, result) {
        if (err){
            console.log(err)
        } //handle error
        else {
          var newlyCreatedUserId = result.rows[0].id;
          console.log(newlyCreatedUserId)
        }
      });
        //return result.rows
    } catch (error) {
        console.log(error)
    }
}

const deleteServiceDeskField = async (id) => {
    console.log(id)
    try {
        const result = await pool.query(`DELETE FROM public."ServiceDeskFields" WHERE id=${id}`)
        return result.rows
    } catch (error) {
        console.log(error)
    }
}

const updateServiceDeskField = async (id,idTemplate, Name,CodeName) => {
    console.log(id,Name,CodeName)
    try {
        const result = await pool.query(`UPDATE public."ServiceDeskFields" SET "idTemplate"='${idTemplate}', "Name"='${Name}', "CodeName"='${CodeName}' WHERE id=${id}`)
        return result.rows
    } catch (error) {
        console.log(error)
    }
}


//CONECTORES

app.get('/connectors', async (req, res) => {
    const tables = await getconectors()
    res.send(tables)
})

app.get('/connectors/select', async (req, res) => {
    const tables = await getconectorsSelect()
    res.send(tables)
})

app.post('/connectors', async (req, res) => {
    const{Name,CodeName}=req.body
    addConnector(Name,CodeName)
    res.send('Got it!')
})

app.patch('/connectors', async (req, res) => {
    const {id,Name,CodeName} = req.body
    updateConnector(id,Name,CodeName)
    res.send('Updated')
})

app.delete('/connectors/:id', async (req, res) => {
    const {id} = req.params
    deleteConnector(id)
    res.send('Deleted')
})

//**Functions

const getconectors = async () => {
    try {
        const result = await pool.query('SELECT * from "Connectors" order by "id"')
        return result.rows
    } catch (error) {
        console.log(error)
    }
}

const getconectorsSelect = async () => {
    try {
        const result = pool.query('SELECT "id" as "value", CONCAT("Nombre",' - ',con."CodeName" ) as "label" from "Connectors" order by "id"')
        return result.rows
    } catch (error) {
        console.log(error)
    }
}

const addConnector = async (Nombre,CodeName) => {
    try {
      //  const result = await pool.query('INSERT INTO public."IntegrationMappHeader" ( "idTemplate", "Description") VALUES('+idTemplate+',\''+Description+'\')')
      var queryText = 'INSERT INTO public."Connectors" ( "Nombre", "CodeName") VALUES($1, $2) RETURNING id'
      pool.query(queryText, [Nombre, CodeName], function(err, result) {
        if (err){
            console.log(err)
        } //handle error
        else {
          var newlyCreatedUserId = result.rows[0].id;
          console.log(newlyCreatedUserId)
        }
      });
        //return result.rows
    } catch (error) {
        console.log(error)
    }
}


const updateConnector = async (id,Name,CodeName) => {
    console.log(id,Name,CodeName)
    try {
        const result = await pool.query(`UPDATE public."Connectors" SET "Nombre"='${Name}', "CodeName"='${CodeName}' WHERE id=${id}`)
        return result.rows
    } catch (error) {
        console.log(error)
    }
}


const deleteConnector = async (id) => {
    console.log(id)
    try {
        const result = await pool.query(`DELETE FROM public."Connectors" WHERE id=${id}`)
        return result.rows
    } catch (error) {
        console.log(error)
    }
}

//CONECTORES CAMPOS

app.get('/connectorfields', async (req, res) => {
    const tables = await getconectorsFields()
    res.send(tables)
})


app.post('/connectorfields', async (req, res) => {
    const{idConnector,FieldName}=req.body
    addConectorsField(idConnector,FieldName)
    res.send('Got it!')
})

app.patch('/connectorfields', async (req, res) => {
    const {id,idConnector,FieldName} = req.body
    updateConectorsField(id,idConnector,FieldName)
    res.send('Updated')
})

app.delete('/connectorfields/:id', async (req, res) => {
    const {id} = req.params
    deleteConectorsField(id)
    res.send('Deleted')
})

//**Functions

const getconectorsFields = async () => {
    try {
        //const result = await pool.query('SELECT * from "ConnectorsFields"')
        const result = await pool.query(`SELECT "Cf".id, "Con"."Nombre" AS "idConnector", "Cf"."FieldName" 
        FROM public."ConnectorsFields" "Cf"
        LEFT JOIN "Connectors" "Con"
        ON "Con".id = "Cf"."idConnector"
        ORDER BY "Con"."Nombre", "Cf".id`)
        return result.rows
    } catch (error) {
        console.log(error)
    }
}


const addConectorsField = async (idConnector,FieldName) => {
    try {
      //  const result = await pool.query('INSERT INTO public."IntegrationMappHeader" ( "idTemplate", "Description") VALUES('+idTemplate+',\''+Description+'\')')
      var queryText = 'INSERT INTO public."ConnectorsFields" ( "idConnector", "FieldName") VALUES($1, $2) RETURNING id'
      pool.query(queryText, [idConnector, FieldName], function(err, result) {
        if (err){
            console.log(err)
        } //handle error
        else {
          var newlyCreatedUserId = result.rows[0].id;
          console.log(newlyCreatedUserId)
        }
      });
        //return result.rows
    } catch (error) {
        console.log(error)
    }
}

const updateConectorsField = async (id,idConnector,FieldName) => {
    try {
        const result = await pool.query(`UPDATE public."ConnectorsFields" SET "idConnector"='${idConnector}', "FieldName"='${FieldName}' WHERE id=${id}`)
        return result.rows
    } catch (error) {
        console.log(error)
    }
}

const deleteConectorsField = async (id) => {
    console.log(id)
    try {
        const result = await pool.query(`DELETE FROM public."ConnectorsFields" WHERE id=${id}`)
        return result.rows
    } catch (error) {
        console.log(error)
    }
}



//Mapeo
app.get('/mapeo', async (req, res) => {
    const mapeo = await getMapeo()
    res.send(mapeo)
})

app.get('/mapeo/templates', async (req, res) => {
    const mapeo = await getTemplateList()
    res.send(mapeo)
})

app.get('/mapeo/connectors', async (req, res) => {
    const mapeo = await getConnectorsList()
    res.send(mapeo)
})

app.get('/mapeo/conectores', async (req, res) => {
    const mapeo = await getconnectorList()
    res.send(mapeo)
})

app.post('/mapeo/templates', async (req, res) => {
    const{idTemplate,Description}=req.body
    await addMapHeader(idTemplate,Description)
    setTimeout(() => {
        res.json({'lastId':lastId})
    }, 1000);
})

app.post('/mapeo/changenames', async (req, res) => {
    const{id,idTemplate,Description}=req.body
    await addEditMappHeader(id,idTemplate,Description)
    res.send('edited')
})

const addEditMappHeader = async (id,idTemplate,Description) => {
    try {
        const result = await pool.query(`UPDATE public."IntegrationMappHeader" SET "idTemplate"='${idTemplate}', "Description"='${Description}' WHERE id=${id}`)
        return result.rows
    } catch (error) {
        console.log(error)
    }
}



app.post('/mapeo/templates/mappdef', async (req, res) => {
    const{idMapp,idConnector,idConnFields,idTemplate,idTemplateFields,DefaultValue}=req.body
    console.log('idConnFields',idConnFields)
    console.log('idTemplateFields',idTemplateFields)
    await addMapDef(idMapp,idConnector,idTemplateFields,idTemplate,idConnFields,DefaultValue)
    setTimeout(() => {
        res.json({'lastId':lastId})
    }, 1000);
})

app.get('/mapeo/templates/max', async (req, res) => {
    try {
        const result = await pool.query('SELECT MAX("id") FROM public."IntegrationMappHeader"')
        res.json({'lastId':lastId})
        return result.rows
    } catch (error) {
        console.log(error)
    }
})


app.get('/mapeo/newinfoconnector/:id', async (req, res) => {
    const mapeo = await getNewInfoConnector(req.params.id)
    res.send(mapeo)
})

app.get('/mapeo/getallmappdef/:id', async (req, res) => {
    const mapeo = await getAllMappDeff(req.params.id)
    res.send(mapeo)
})

const getAllMappDeff = async (id) => {
    try {
        const result = await pool.query(`select
        imd."idMapp",
        c."Nombre", 
        c."id" as "idConector",
        imd."idConnFields" ,
        cf."FieldName",
        cf."id" as "idNombreCampo",
        sdf."Name" as "NombreCampoServiceDesk",
        sdf."id" as "idNombreCampoServiceDesk",
        imd."DefaultValue"  
    from
        "IntegrationMappDef" imd
    left join "ConnectorsFields" cf on
        imd."idConnFields" = cf.id 
    left join "ServiceDeskFields" sdf on
        imd."idTemplateFields" = sdf.id 
    left join "Connectors" c ON 
        imd."idConnector" = c.id 
    where imd."idMapp" = ${id}`)
        return result.rows
    } catch (error) {
        console.log(error)
    }
}

const getNewInfoConnector = async (id) => {
    try {
        const result = await pool.query(`SELECT * from "ConnectorsFields" WHERE "idConnector"=${id}`)
        return result.rows
    } catch (error) {
        console.log(error)
    }
}

app.get('/mapeo/selectedtemplate/:id', async (req, res) => {
    const mapeo = await getSelectedtemplate(req.params.id)
    res.send(mapeo)
})

const getSelectedtemplate = async (id) => {
    try {
        const result = await pool.query(`SELECT sdf.id as "value", sdf."Name" as "label" from "ServiceDeskFields" sdf WHERE "idTemplate"=${id}`)
        return result.rows
    } catch (error) {
        console.log(error)
    }
}


app.delete('/mapeo/mapheader/:id', async (req, res) => {
    const {id} = req.params
    await deleteMapDef(id)
    await deleteMapHeader(id)
    res.send('Deleted')
})

//**Funciones

const addMapDef = async (idMapp,idConnector,idTemplateFields,idTemplate,idConnFields,DefaultValue) => { 
    try {
      //  const result = await pool.query('INSERT INTO public."IntegrationMappHeader" ( "idTemplate", "Description") VALUES('+idTemplate+',\''+Description+'\')')
        console.log('idConnFields',idConnFields)
        console.log('idTemplateFields',idTemplateFields)
      var queryText = 'INSERT INTO public."IntegrationMappDef" ( "idMapp","idConnector","idConnFields","idTemplate","idTemplateFields","DefaultValue") VALUES($1, $2, $3, $4, $5, $6) RETURNING id'
      pool.query(queryText, [idMapp,idConnector,idConnFields,idTemplate,idTemplateFields,DefaultValue], function(err, result) {
        if (err){
            console.log(err)
        } //handle error
        else {
          var newlyCreatedUserId = result.rows[0].id;
          lastId = newlyCreatedUserId
          console.log(lastId)
        }
    });
    //return result.rows
    } catch (error) {
        console.log(error)
    }
}

const deleteMapDef = async (id) => {
    console.log(id)
    try {
        const result = await pool.query(`DELETE FROM public."IntegrationMappDef" WHERE "idMapp"=${id}`)
        return result.rows
    } catch (error) {
        console.log(error)
    } 
}

const deleteMapHeader = async (id) => {
    console.log(id)
    try {
        const result = await pool.query(`DELETE FROM public."IntegrationMappHeader" WHERE "id"=${id}`)
        return result.rows
    } catch (error) {
        console.log(error)
    } 
}

// Login

const getUsers = async () => {
    try {
        const result = await pool.query('SELECT * from "Users"')
        return result.rows
    } catch (error) {
        console.log(error)
    }
}

//Impuestos Repuestos Autos

app.get('/autopartstaxes', async (req, res) => {
    const tables = await getAutoPartsTaxes()
    res.send(tables)
})


app.post('/autopartstaxes', async (req, res) => {
    const {tax,tipo_iva_iva,clase_iva_iva,valor_iva_iva,tipo_rta_rta,clase_rta_rta,valor_rta_rta,tipo_rta_rta_2_5,clase_rta_rta_2_5,valor_rta_rta_2_5,tipo_rta_iva_15,clase_rta_iva_15,valor_rta_iva_15,tipo_iva_rta_ser_4,clase_iva_rta_ser_4,valor_iva_rta_ser_4,tipo_auto_rta,clase_auto_rta,valor_auto_rta} = req.body
    addAutoPartsTaxes(tax,tipo_iva_iva,clase_iva_iva,valor_iva_iva,tipo_rta_rta,clase_rta_rta,valor_rta_rta,tipo_rta_rta_2_5,clase_rta_rta_2_5,valor_rta_rta_2_5,tipo_rta_iva_15,clase_rta_iva_15,valor_rta_iva_15,tipo_iva_rta_ser_4,clase_iva_rta_ser_4,valor_iva_rta_ser_4,tipo_auto_rta,clase_auto_rta,valor_auto_rta)
    res.send('Got it!')
})

app.patch('/autopartstaxes', async (req, res) => {

    const {id,tax,tipo_iva_iva,clase_iva_iva,valor_iva_iva,tipo_rta_rta,clase_rta_rta,valor_rta_rta,tipo_rta_rta_2_5,clase_rta_rta_2_5,valor_rta_rta_2_5,tipo_rta_iva_15,clase_rta_iva_15,valor_rta_iva_15,tipo_iva_rta_ser_4,clase_iva_rta_ser_4,valor_iva_rta_ser_4,tipo_auto_rta,clase_auto_rta,valor_auto_rta} = req.body
    updateAutoPartsTaxes(id,tax,tipo_iva_iva,clase_iva_iva,valor_iva_iva,tipo_rta_rta,clase_rta_rta,valor_rta_rta,tipo_rta_rta_2_5,clase_rta_rta_2_5,valor_rta_rta_2_5,tipo_rta_iva_15,clase_rta_iva_15,valor_rta_iva_15,tipo_iva_rta_ser_4,clase_iva_rta_ser_4,valor_iva_rta_ser_4,tipo_auto_rta,clase_auto_rta,valor_auto_rta)
    res.send('Updated')
})

app.delete('/autopartstaxes/:id', async (req, res) => {
    const {id} = req.params
    deleteAutoPartsTaxes(id)
    res.send('Deleted')
})

//**Functions

const getAutoPartsTaxes = async () => {
    try {
        const result = await pool.query('SELECT * from "taxes_1"')
        return result.rows
    } catch (error) {
        console.log(error)
    }
}

const updateAutoPartsTaxes = async (id,tax,tipo_iva_iva,clase_iva_iva,valor_iva_iva,tipo_rta_rta,clase_rta_rta,valor_rta_rta,tipo_rta_rta_2_5,clase_rta_rta_2_5,valor_rta_rta_2_5,tipo_rta_iva_15,clase_rta_iva_15,valor_rta_iva_15,tipo_iva_rta_ser_4,clase_iva_rta_ser_4,valor_iva_rta_ser_4,tipo_auto_rta,clase_auto_rta,valor_auto_rta) => {
    try {
        const result = await pool.query(`UPDATE public."taxes_1" SET "id"='${id}', "tax"='${tax}', "tipo_iva_iva"='${tipo_iva_iva}',"clase_iva_iva"='${clase_iva_iva}',"valor_iva_iva"='${valor_iva_iva}',"tipo_rta_rta"='${tipo_rta_rta}',"clase_rta_rta"='${clase_rta_rta}',"valor_rta_rta"='${valor_rta_rta}',"tipo_rta_rta_2_5"='${tipo_rta_rta_2_5}',"clase_rta_rta_2_5"='${clase_rta_rta_2_5}',"valor_rta_rta_2_5"='${valor_rta_rta_2_5}',"tipo_rta_iva_15"='${tipo_rta_iva_15}',"clase_rta_iva_15"='${clase_rta_iva_15}',"valor_rta_iva_15"='${valor_rta_iva_15}',"tipo_iva_rta_ser_4"='${tipo_iva_rta_ser_4}',"clase_iva_rta_ser_4"='${clase_iva_rta_ser_4}',"valor_iva_rta_ser_4"='${valor_iva_rta_ser_4}',"tipo_auto_rta"='${tipo_auto_rta}',"clase_auto_rta"='${clase_auto_rta}',"valor_auto_rta"='${valor_auto_rta}' WHERE id=${id}`)
        return result.rows
    } catch (error) {
        console.log(error)
    }
}

const addAutoPartsTaxes = async (tax,tipo_iva_iva,clase_iva_iva,valor_iva_iva,tipo_rta_rta,clase_rta_rta,valor_rta_rta,tipo_rta_rta_2_5,clase_rta_rta_2_5,valor_rta_rta_2_5,tipo_rta_iva_15,clase_rta_iva_15,valor_rta_iva_15,tipo_iva_rta_ser_4,clase_iva_rta_ser_4,valor_iva_rta_ser_4,tipo_auto_rta,clase_auto_rta,valor_auto_rta) => {
    try {
      //  const result = await pool.query('INSERT INTO public."IntegrationMappHeader" ( "idTemplate", "Description") VALUES('+idTemplate+',\''+Description+'\')')
      var queryText = 'INSERT INTO public."taxes_1" ( "tax", "tipo_iva_iva","clase_iva_iva","valor_iva_iva","tipo_rta_rta","clase_rta_rta","valor_rta_rta","tipo_rta_rta_2_5","clase_rta_rta_2_5","valor_rta_rta_2_5","tipo_rta_iva_15","clase_rta_iva_15","valor_rta_iva_15","tipo_iva_rta_ser_4","clase_iva_rta_ser_4","valor_iva_rta_ser_4","tipo_auto_rta","clase_auto_rta","valor_auto_rta") VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19) RETURNING id'
      pool.query(queryText, [tax,tipo_iva_iva,clase_iva_iva,valor_iva_iva,tipo_rta_rta,clase_rta_rta,valor_rta_rta,tipo_rta_rta_2_5,clase_rta_rta_2_5,valor_rta_rta_2_5,tipo_rta_iva_15,clase_rta_iva_15,valor_rta_iva_15,tipo_iva_rta_ser_4,clase_iva_rta_ser_4,valor_iva_rta_ser_4,tipo_auto_rta,clase_auto_rta,valor_auto_rta], function(err, result) {
        if (err){
            console.log(err)
        } //handle error
        else {
          var newlyCreatedUserId = result.rows[0].id;
          console.log(newlyCreatedUserId)
        }
      });
        //return result.rows
    } catch (error) {
        console.log(error)
    }
}

const deleteAutoPartsTaxes = async (id) => {
    console.log(id)
    try {
        const result = await pool.query(`DELETE FROM public."taxes_1" WHERE id=${id}`)
        return result.rows
    } catch (error) {
        console.log(error)
    }
}

//Impuestos Motos

app.get('/motorcycletaxes', async (req, res) => {
    const tables = await getMotorcycleTaxes()
    res.send(tables)
})

app.post('/motorcycletaxes', async (req, res) => {
    const {tax,tipo_iva_iva,clase_iva_iva,valor_iva_iva,tipo_rta_rta,clase_rta_rta,valor_rta_rta,tipo_rta_rta_2_5,clase_rta_rta_2_5,valor_rta_rta_2_5,tipo_rta_iva_15,clase_rta_iva_15,valor_rta_iva_15,tipo_iva_rta_ser_4,clase_iva_rta_ser_4,valor_iva_rta_ser_4,tipo_auto_rta,clase_auto_rta,valor_auto_rta} = req.body
    addMotorcycleTaxes(tax,tipo_iva_iva,clase_iva_iva,valor_iva_iva,tipo_rta_rta,clase_rta_rta,valor_rta_rta,tipo_rta_rta_2_5,clase_rta_rta_2_5,valor_rta_rta_2_5,tipo_rta_iva_15,clase_rta_iva_15,valor_rta_iva_15,tipo_iva_rta_ser_4,clase_iva_rta_ser_4,valor_iva_rta_ser_4,tipo_auto_rta,clase_auto_rta,valor_auto_rta)
    res.send('Got it!')
})

app.patch('/motorcycletaxes', async (req, res) => {

    const {id,tax,tipo_iva_iva,clase_iva_iva,valor_iva_iva,tipo_rta_rta,clase_rta_rta,valor_rta_rta,tipo_rta_rta_2_5,clase_rta_rta_2_5,valor_rta_rta_2_5,tipo_rta_iva_15,clase_rta_iva_15,valor_rta_iva_15,tipo_iva_rta_ser_4,clase_iva_rta_ser_4,valor_iva_rta_ser_4,tipo_auto_rta,clase_auto_rta,valor_auto_rta} = req.body
    updateMotorcycleTaxes(id,tax,tipo_iva_iva,clase_iva_iva,valor_iva_iva,tipo_rta_rta,clase_rta_rta,valor_rta_rta,tipo_rta_rta_2_5,clase_rta_rta_2_5,valor_rta_rta_2_5,tipo_rta_iva_15,clase_rta_iva_15,valor_rta_iva_15,tipo_iva_rta_ser_4,clase_iva_rta_ser_4,valor_iva_rta_ser_4,tipo_auto_rta,clase_auto_rta,valor_auto_rta)
    res.send('Updated')
})

app.delete('/motorcycletaxes/:id', async (req, res) => {
    const {id} = req.params
    deleteMotorcycleTaxes(id)
    res.send('Deleted')
})

//**Functions

const getMotorcycleTaxes = async () => {
    try {
        const result = await pool.query('SELECT * from "taxes"')
        return result.rows
    } catch (error) {
        console.log(error)
    }
}

const updateMotorcycleTaxes = async (id,tax,tipo_iva_iva,clase_iva_iva,valor_iva_iva,tipo_rta_rta,clase_rta_rta,valor_rta_rta,tipo_rta_rta_2_5,clase_rta_rta_2_5,valor_rta_rta_2_5,tipo_rta_iva_15,clase_rta_iva_15,valor_rta_iva_15,tipo_iva_rta_ser_4,clase_iva_rta_ser_4,valor_iva_rta_ser_4,tipo_auto_rta,clase_auto_rta,valor_auto_rta) => {
    try {
        const result = await pool.query(`UPDATE public."taxes" SET "id"='${id}', "tax"='${tax}', "tipo_iva_iva"='${tipo_iva_iva}',"clase_iva_iva"='${clase_iva_iva}',"valor_iva_iva"='${valor_iva_iva}',"tipo_rta_rta"='${tipo_rta_rta}',"clase_rta_rta"='${clase_rta_rta}',"valor_rta_rta"='${valor_rta_rta}',"tipo_rta_rta_2_5"='${tipo_rta_rta_2_5}',"clase_rta_rta_2_5"='${clase_rta_rta_2_5}',"valor_rta_rta_2_5"='${valor_rta_rta_2_5}',"tipo_rta_iva_15"='${tipo_rta_iva_15}',"clase_rta_iva_15"='${clase_rta_iva_15}',"valor_rta_iva_15"='${valor_rta_iva_15}',"tipo_iva_rta_ser_4"='${tipo_iva_rta_ser_4}',"clase_iva_rta_ser_4"='${clase_iva_rta_ser_4}',"valor_iva_rta_ser_4"='${valor_iva_rta_ser_4}',"tipo_auto_rta"='${tipo_auto_rta}',"clase_auto_rta"='${clase_auto_rta}',"valor_auto_rta"='${valor_auto_rta}' WHERE id=${id}`)
        return result.rows
    } catch (error) {
        console.log(error)
    }
}

const addMotorcycleTaxes = async (tax,tipo_iva_iva,clase_iva_iva,valor_iva_iva,tipo_rta_rta,clase_rta_rta,valor_rta_rta,tipo_rta_rta_2_5,clase_rta_rta_2_5,valor_rta_rta_2_5,tipo_rta_iva_15,clase_rta_iva_15,valor_rta_iva_15,tipo_iva_rta_ser_4,clase_iva_rta_ser_4,valor_iva_rta_ser_4,tipo_auto_rta,clase_auto_rta,valor_auto_rta) => {
    try {
      //  const result = await pool.query('INSERT INTO public."IntegrationMappHeader" ( "idTemplate", "Description") VALUES('+idTemplate+',\''+Description+'\')')
      var queryText = 'INSERT INTO public."taxes" ( "tax", "tipo_iva_iva","clase_iva_iva","valor_iva_iva","tipo_rta_rta","clase_rta_rta","valor_rta_rta","tipo_rta_rta_2_5","clase_rta_rta_2_5","valor_rta_rta_2_5","tipo_rta_iva_15","clase_rta_iva_15","valor_rta_iva_15","tipo_iva_rta_ser_4","clase_iva_rta_ser_4","valor_iva_rta_ser_4","tipo_auto_rta","clase_auto_rta","valor_auto_rta") VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19) RETURNING id'
      pool.query(queryText, [tax,tipo_iva_iva,clase_iva_iva,valor_iva_iva,tipo_rta_rta,clase_rta_rta,valor_rta_rta,tipo_rta_rta_2_5,clase_rta_rta_2_5,valor_rta_rta_2_5,tipo_rta_iva_15,clase_rta_iva_15,valor_rta_iva_15,tipo_iva_rta_ser_4,clase_iva_rta_ser_4,valor_iva_rta_ser_4,tipo_auto_rta,clase_auto_rta,valor_auto_rta], function(err, result) {
        if (err){
            console.log(err)
        } //handle error
        else {
          var newlyCreatedUserId = result.rows[0].id;
          console.log(newlyCreatedUserId)
        }
      });
        //return result.rows
    } catch (error) {
        console.log(error)
    }
}

const deleteMotorcycleTaxes = async (id) => {
    console.log(id)
    try {
        const result = await pool.query(`DELETE FROM public."taxes" WHERE id=${id}`)
        return result.rows
    } catch (error) {
        console.log(error)
    }
}


// FUnciones Generales

const geSDTables = async () => {
    try {
        const result = await pool.query('SELECT * from "ServiceDeskPlusTemplates"')
        return result.rows
    } catch (error) {
        console.log(error)
    }
}

const addSDTables = async (Name,CodeName) => {
    try {
      //  const result = await pool.query('INSERT INTO public."IntegrationMappHeader" ( "idTemplate", "Description") VALUES('+idTemplate+',\''+Description+'\')')
      var queryText = 'INSERT INTO public."ServiceDeskPlusTemplates" ( "Name", "CodeName") VALUES($1, $2) RETURNING id'
      pool.query(queryText, [Name, CodeName], function(err, result) {
        if (err){
            console.log(err)
        } //handle error
        else {
          var newlyCreatedUserId = result.rows[0].id;
          console.log(newlyCreatedUserId)
        }
      });
        //return result.rows
    } catch (error) {
        console.log(error)
    }
}



const getMapeo = async () => {
    try {
        const result = await pool.query('select imh.id, sdpt."Name",  imh."Description"  from "IntegrationMappHeader" imh left join "ServiceDeskPlusTemplates" sdpt on imh."idTemplate" = sdpt.id')
        return result.rows
    } catch (error) {
        console.log(error)
    }
}

const getTemplateList = async () => {
    try {
        const result = await pool.query('select sdpt.id as "value", sdpt."Name" as "label" from "ServiceDeskPlusTemplates" sdpt')
        return result.rows
    } catch (error) {
        console.log(error)
    }
}

const getConnectorsList = async () => {
    try {
        const result = await pool.query(`SELECT con.id as "value", CONCAT(con."Nombre",' - ',con."CodeName" ) as "label" FROM "Connectors" con`)
        return result.rows
    } catch (error) {
        console.log(error)
    }
}

const getconnectorList = async () => {
    try {
        const result = await pool.query('SELECT "Nombre" FROM public."Connectors"')
        return result.rows
    } catch (error) {
        console.log(error)
    }
}

const addMapHeader = async (idTemplate,Description) => {
    try {
      //  const result = await pool.query('INSERT INTO public."IntegrationMappHeader" ( "idTemplate", "Description") VALUES('+idTemplate+',\''+Description+'\')')

      var queryText = 'INSERT INTO public."IntegrationMappHeader" ( "idTemplate", "Description") VALUES($1, $2) RETURNING id'
      pool.query(queryText, [idTemplate, Description], function(err, result) {
        if (err){
            console.log(err)
        } //handle error
        else {
          var newlyCreatedUserId = result.rows[0].id;
          lastId = newlyCreatedUserId
          console.log(lastId)
        }
    });
    //return result.rows
    } catch (error) {
        console.log(error)
    }
}

const deleteSDTables = async (id) => {
    console.log(id)
    try {
        const result = await pool.query(`DELETE FROM public."ServiceDeskPlusTemplates" WHERE id=${id}`)
        return result.rows
    } catch (error) {
        console.log(error.detail)
        return error.detail
    }
}

const updateSDTables = async (id,Name,CodeName) => {
    console.log(id,Name,CodeName)
    try {
        const result = await pool.query(`UPDATE public."ServiceDeskPlusTemplates" SET "Name"='${Name}', "CodeName"='${CodeName}' WHERE id=${id}`)
        return result.rows
    } catch (error) {
        console.log(error)
    }
}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })


export { getUsers };
