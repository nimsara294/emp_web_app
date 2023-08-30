import React, { useState, useEffect, Fragment } from "react";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import "bootstrap/dist/css/bootstrap.css";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";


const EmpCrud = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  
  const [editFname, setEditfname] = useState("");
  const [editLname, setEditlname] = useState("");
  const [editid, setEditid] = useState();
  
  const [lgShow, setLgShow] = useState(false);
  const handleClose = () => setLgShow(false);
  const handleShow = () => setLgShow(true);
  
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
    getData();
  }, []);
  
  const [deps, setDeps] = useState([]);
  
  useEffect(() => {
    getDepData();
  }, []);
  
  const getData = () => {
    axios
    .get("https://localhost:7105/api/Employee")
    .then((result) => {
      setData(result.data);
      console.log(data);
    })
      .catch((error) => {
        console.log(error);
      });
    };
    
    const getDepData = () => {
      axios
      .get("https://localhost:7105/api/Department")
      .then((result) => {
        setDeps(result.data);
        console.log(deps);
      })
      .catch((error) => {
        console.log(error);
      });
    };
    
    const options = [
      { value: "", text: "--Select Department--" },
      { value: "IT", text: "IT" },
      { value: "HR", text: "HR" },
      { value: "Financial", text: "Financial" },
    ];
    
    const [dep, setDep] = useState(options[0].value);
    const [editDep, setEditdep] = useState(options[0].value);
    
    const handleChange = (event) => {
      // console.log(event.target.value);
      setDep(event.target.value);
    };
    
  const handleEditChange = (event) => {
    // console.log(event.target.value);
    setEditdep(event.target.value);
  };
  
  const handleEdit = (id) => {
    handleShow();
    axios.get(`https://localhost:7105/api/Employee/${id}`)
    .then((result) => {
      setEditfname(result.data.fname)
      setEditlname(result.data.lname)
      setEditdep(result.data.dep)
      setEditid(id)
    })
    .catch((error) => {
      console.log(error)
    })
  };
  // console.log(editFname, editDep)
  
  const handleDelete = (id) => {
    if (window.confirm("Do you want to delete this employee?") === true) {
      axios.delete(`https://localhost:7105/api/Employee/${id}`)
      .then((result) => {
        if(result.status === 200)
        {
          window.alert("User deleted");
          getData();
        }
      })
      .catch((error) => {
        console.log(error)
      })
    }
  };
  
  const handleUpdate = () => {
    const url = `https://localhost:7105/api/Employee/${editid}`;
    const data = {
      id: editid,
      fname: editFname,
      lname: editLname,
      dep: editDep,
    };
    
    axios.put(url, data)
    .then((result) => {
      handleClose();
      getData();
      clear();
      // toast.success('Émployee has been added');
    }).catch((error) => {
      console.log(error);
    })
  };
  
  const handleSave = () => {
    const url = "https://localhost:7105/api/Employee";
    const data = {
      fname: fname,
      lname: lname,
      dep: dep,
    };
    
    axios.post(url, data)
    .then((result) => {
      getData();
      clear();
      toast.success('Émployee has been added');
    }).catch((error) => {
      console.log(error);
    })
  };
  
  const clear = () => {
    setFname('');
    setLname('');
    setDep('');
    setEditfname('');
    setEditlname('');
    setEditdep('');
  }
  
  return (
    <Fragment>
      <Container>
        <Row>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter First Name"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Last Name"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Select
              aria-label="Default select example"
              value={dep}
              onChange={handleChange}
            >
              {/* {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))} */}
              {deps.map((dep) => (
                <option key={dep.id} value={dep.dep_name}>
                  {dep.dep_name}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <button className="btn btn-primary" onClick={() => handleSave()}>
              Add Employee
            </button>
          </Col>
        </Row>
      </Container>

      <br></br>
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
                    <td>{item.id}</td>
                    <td>{item.fname}</td>
                    <td>{item.lname}</td>
                    <td>{item.dep}</td>
                    <td colSpan={2}>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEdit(item.id)}
                      >
                        Edit
                      </button>{" "}
                      &nbsp;
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            : "Loading..."}
        </tbody>
      </Table>

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Enter First Name"
                value={editFname}
                onChange={(e) => setEditfname(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Last Name"
                value={editLname}
                onChange={(e) => setEditlname(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Select
                aria-label="Default select example"
                value={editDep}
                onChange={handleEditChange}
              >
                {/* {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))} */}
                {deps.map((dep) => (
                  <option key={dep.id} value={dep.dep_name}>
                    {dep.dep_name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default EmpCrud;
