import MUIDataTable from "mui-datatables"
import Button from "../button/Button"

const columns = ["nombre", "Estado", "Component"]
const data = [
    ["Cristhian", "On", <Button name="casa" url="menu"/>],
    ["David", "On"],
    ["Carlos", "Off"],
    ["Ivan", "Off"],
    ["Cristhian", "On"],
    ["David", "On"],
    ["Carlos", "Off"],
    ["Ivan", "Off"],
    ["Cristhian", "On"],
    ["David", "On"],
    ["Carlos", "Off"],
    ["Ivan", "Off"],
]
const options = {
    download: false,
    print: false,
    filter: false,
    selectableRows: false
}

const Table = () => {
  return (
    <MUIDataTable
        title={"lista"}
        data={data}
        columns={columns}
        options={options}
    />
  )
}

export default Table