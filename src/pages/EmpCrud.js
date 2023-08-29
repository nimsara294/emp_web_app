import React, { useState, useEffect, Fragment } from "react";
import Table from "react-bootstrap/Table";
import 'bootstrap/dist/css/bootstrap.css';

const EmpCrud = () => {
  const empdata = [
    {
      emp_id: 1,
      firstname: "Alex",
      lastname: "Gordan",
      dep: "IT",
    },
    {
      emp_id: 2,
      firstname: "Jhon",
      lastname: "Doe",
      dep: "HR",
    },
    {
      emp_id: 3,
      firstname: "Jane",
      lastname: "Doe",
      dep: "Financial",
    },
    {
      emp_id: 4,
      firstname: "Rachel",
      lastname: "Green",
      dep: "IT",
    },
  ];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(empdata);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = (id) => {
    alert(id);
  }

  const handleDelete = (id) => {
    if(window.confirm("Do you want to delete this employee?") === true)
    {
      alert(id);
    }
  }

  return (
    <Fragment>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0
            ? data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.emp_id}</td>
                    <td>{item.firstname}</td>
                    <td>{item.lastname}</td>
                    <td>{item.dep}</td>
                    <td colSpan={2}>
                        <button className="btn btn-primary" onClick={() => handleEdit(item.emp_id)}>Edit</button> &nbsp;
                        <button className="btn btn-danger" onClick={() => handleDelete(item.emp_id)}>Delete</button>
                    </td>
                  </tr>
                );
              })
            : "Loading..."}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default EmpCrud;
