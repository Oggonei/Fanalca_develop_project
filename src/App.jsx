import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Menu from "./pages/menu/Menu";
import Templates from "./pages/templates/Templates";
import Mapeo from "./pages/mapeo/Mapeo";
import ServiceDEskFields from "./pages/serviceDeskFields/ServiceDEskFields";
import Table from "./components/tables/Table";
import Connectors from "./pages/connectors/Connectors";
import ConnectorFields from "./pages/connectorFields/ConnectorFields";
import AutoPartsTaxes from "./pages/autopartstaxes/AutoPartsTaxes";
import MotorcycleTaxes from "./pages/motorcycletaxes/MotorcycleTaxes";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
          <Route path="menu" element={<Menu />}></Route>
          <Route path="templates" element={<Templates />}></Route>
          <Route path="table" element={<Table />}></Route>
          <Route path="servicedeskfields" element={<ServiceDEskFields />}></Route>
          <Route path="connectors" element={<Connectors />}></Route>
          <Route path="connectorfields" element={<ConnectorFields />}></Route>
          <Route path="autopartstaxes" element={<AutoPartsTaxes />}></Route>
          <Route path="motorcycletaxes" element={<MotorcycleTaxes />}></Route>
          <Route path="mapeo" element={<Mapeo/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
