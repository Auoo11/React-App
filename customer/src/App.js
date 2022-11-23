import Axios from 'axios'
import { useState } from 'react'

function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [newWage, setNewWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const getEmployees = () => {
    Axios.get('http://localhost:3001/employees').then((response) => {
      setEmployeeList(response.data);
    });
  };

  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        },
      ]);
    });
  };

  const updateEmployeeWage = (id) => {
    Axios.put("http://localhost:3001/update", { wage: newWage, id: id }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id == id
              ? {
                  id: val.id,
                  name: val.name,
                  country: val.country,
                  age: val.age,
                  position: val.position,
                  wage: newWage,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };


  return (
    <div className="App container">
      <br/>
      <h1>ข้อมูลพนักงาน</h1>
      <div className="information">
        <form action="">
          <div className="mb-3">
            <label className="form-label" htmlFor="name">
            ชื่อ:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder=""
              onChange={(event) => {
                setName(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age">อายุ:</label>
            <input
              type="number"
              className="form-control"
              placeholder=""
              onChange={(event) => {
                setAge(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="country">ประเทศ:</label>
            <input
              type="text"
              className="form-control"
              placeholder=""
              onChange={(event) => {
                setCountry(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Position">ตำแหน่ง:</label>
            <input
              type="text"
              className="form-control"
              placeholder=""
              onChange={(event) => {
                setPosition(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Wage">ค่าจ้าง
:</label>
            <input
              type="number"
              className="form-control"
              placeholder=""
              onChange={(event) => {
                setWage(event.target.value)
              }}
            />
          </div>
          <button onClick={addEmployee} class="btn btn-success">
          เพิ่มพนักงาน
          </button>
        </form>
      </div>
      <hr />
      <div className="employees">
        <button class="btn btn-primary" onClick={getEmployees}>
        แสดงพนักงาน
        </button>
        <br />
        <br />
        {employeeList.map((val, key) => {
          return (
            <div className="employee card">
              <div className="card-body text-left">
                <p className="card-text">ชื่อ: {val.name}</p>
                <p className="card-text">อายุ: {val.age}</p>
                <p className="card-text">ประเทศ: {val.country}</p>
                <p className="card-text">ตำแหน่ง: {val.position}</p>
                <p className="card-text">ค่าจ้าง: {val.wage}</p>
                <div className="d-flex">
                  <input
                    className="form-control"
                    style={{ width: "300px" }}
                    type="number"
                    placeholder="15000..."
                    onChange={(event) => {
                      setNewWage(event.target.value)
                    }}
                  />
                  <button className="btn btn-warning" onClick={() => {updateEmployeeWage(val.id)}}>อัปเดต</button>

                  <button className="btn btn-danger" onClick={() => {deleteEmployee(val.id)}}>ลบ</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
