import Header from "../../components/header/Header";
import Menu_cards from "../../components/menu_cards/Menu_cards";

const Menu = () => {
  return (
    <div className="w-full h-full bg-gradient-to-b from-cyan-600 to-blue-900 lg:h-screen">
      <Header />
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 content-center gap-4 px-6 text-lg lg:h-5/6 last:pb-3">
        <Menu_cards name="Plantillas SDP" url="/templates"></Menu_cards>
        <Menu_cards name="Campos Plantillas SDP" url="/servicedeskfields"></Menu_cards>
        <Menu_cards name="Conectores" url="/connectors"></Menu_cards>
        <Menu_cards name="Campos Conectores" url="/connectorfields"></Menu_cards>
        <Menu_cards name="Mapeo" url="/mapeo"></Menu_cards>
        <Menu_cards name="Impuestos Repuestos Autos" url="/autopartstaxes"></Menu_cards>
        <Menu_cards name="Impuestos Motos" url="/motorcycletaxes"></Menu_cards>
      </div>
    </div>
  );
};

export default Menu;
