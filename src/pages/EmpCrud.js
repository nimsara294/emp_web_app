import React, { useState, useEffect, Fragment } from "react";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import "bootstrap/dist/css/bootstrap.css";

const EmpCrud = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const [editFname, setEditfname] = useState("");
  const [editLname, setEditlname] = useState("");
  
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
    setData(empdata);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
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
    // alert(id);
    handleShow();
  };

  const handleDelete = (id) => {
    if (window.confirm("Do you want to delete this employee?") === true) {
      alert(id);
    }
  };

  const handleUpdate = () => {};

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
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <button className="btn btn-primary">Add Employee</button>
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
                    <td>{item.emp_id}</td>
                    <td>{item.firstname}</td>
                    <td>{item.lastname}</td>
                    <td>{item.dep}</td>
                    <td colSpan={2}>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEdit(item.emp_id)}
                      >
                        Edit
                      </button>{" "}
                      &nbsp;
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(item.emp_id)}
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
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text}
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
