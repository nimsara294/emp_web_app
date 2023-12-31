import React, { useState, useEffect, Fragment } from "react";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "bootstrap/dist/css/bootstrap.css";

import axios from "axios";

const DepCrud = () => {
  const [depname, setDepName] = useState("");

  const [editDepName, setEditDepName] = useState("");
  const [editid, setEditid] = useState();

  const [lgShow, setLgShow] = useState(false);
  const handleClose = () => setLgShow(false);
  const handleShow = () => setLgShow(true);

  const depData = [
    {
      dep_id: 1,
      name: "IT",
    },
    {
      dep_id: 2,
      name: "Hr",
    },
    {
      dep_id: 3,
      name: "Financial",
    },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = () => {
    axios
      .get("https://localhost:7105/api/Department")
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (id) => {
    handleShow();
    axios.get(`https://localhost:7105/api/Department/${id}`)
    .then((result) => {
      setEditDepName(result.data.dep_name)
      setEditid(id)
    })
    .catch((error) => {
      console.log(error)
    })
  };

  const handleDelete = (id) => {
    if (window.confirm("Do you want to delete this department?") === true) {
      axios.delete(`https://localhost:7105/api/Department/${id}`)
      .then((result) => {
        if(result.status === 200)
        {
          window.alert("Department deleted");
          getData();
        }
      })
      .catch((error) => {
        console.log(error)
      })
    }
  };

  const handleUpdate = () => {
    const url = `https://localhost:7105/api/Department/${editid}`;
    const data = {
      id: editid,
      dep_name: editDepName,
    };
    
    axios.put(url, data)
    .then((result) => {
      handleClose();
      getData();
      clear();
    }).catch((error) => {
      console.log(error);
    })
  };

  const handleSave = () => {
    const url = "https://localhost:7105/api/Department";
    const data = {
      dep_name: depname,
    };

    axios.post(url, data).then((result) => {
      getData();
      clear();
    }).catch((error) => {
      console.log(error)
    })
  };

  const clear = () => {
    setDepName("");
  };

  return (
    <div>
      <Fragment>
        <Container>
          <Row>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Department Name"
                value={depname}
                onChange={(e) => setDepName(e.target.value)}
              />
            </Col>
            <Col>
              <button className="btn btn-primary" onClick={() => handleSave()}>Add Department</button>
            </Col>
          </Row>
        </Container>
        <br></br>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Department Name</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0
              ? data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.dep_name}</td>
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
            <Modal.Title>Update Department Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Depatment Name"
                  value={editDepName}
                  onChange={(e) => setEditDepName(e.target.value)}
                />
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
    </div>
  );
};

export default DepCrud;
