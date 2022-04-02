import { Button, EditableText, InputGroup } from "@blueprintjs/core";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [newName, setNewName] = useState("");
  const [newDepartment, setNewDepartment] = useState("");
  const [newAddress, setNewAddress] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8001/").then((response) => {
      const { data } = response;
      setEmployees(data.result);
    });

    axios.get("http://localhost:8001/departments").then((response) => {
      const { data } = response;
      setDepartments(data.result);
    });
  }, []);

  const addEmployee = () => {
    const name = newName.trim();
    const department = newDepartment;
    const address = newAddress.trim();
    if (name && department && address) {
      axios
        .post("http://localhost:8001/", {
          name,
          department,
          address,
        })
        .then((response) => {
          const { data } = response;
          setEmployees([...employees, data.result]);
          setNewName("");
          setNewAddress("");
          setNewDepartment("");
        });
    }
  };

  return (
    <div className="App">
      <table className="bp4-html-table .modifier">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => {
            const { id, name, address, department } = employee;
            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{department}</td>
                <td>
                  <EditableText value={address} />
                </td>
                <td>
                  <Button intent="primary">Update</Button>
                  &nbsp;
                  <Button intent="danger">Delete</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td>
              <InputGroup
                placeholder="Add name here..."
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </td>
            <td>
              <div class="bp4-html-select .modifier">
                <select
                  onChange={(e) => setNewDepartment(e.target.value)}
                  value={newDepartment}
                >
                  <option selected value="">
                    Select department
                  </option>
                  {departments.map((department) => {
                    const { id, name } = department;
                    return (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    );
                  })}
                </select>
                <span class="bp4-icon bp4-icon-double-caret-vertical"></span>
              </div>
            </td>
            <td>
              <InputGroup
                placeholder="Add address here..."
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
              />
            </td>
            <td>
              <Button intent="success" onClick={addEmployee}>
                Add Employee
              </Button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default App;
