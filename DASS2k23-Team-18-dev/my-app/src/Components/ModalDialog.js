import { Modal, Button, Dropdown, DropdownButton } from "react-bootstrap";
import React, { useState } from "react";
import { Checkmark } from "react-checkmark";

function ModalDialog() {
  const [checkedList, setCheckedList] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const listData = [
    { id: "1", value: "No-fly zones" },
    { id: "2", value: "Weather" },
    { id: "3", value: "Battery" },
    { id: "4", value: "Drones Available" },
  ];

  const handleSelect = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      //Add checked item into checkList
      setCheckedList([checkedList, value]);
    } else {
      //Remove unchecked item from checkList
      const filteredList = checkedList.filter((item) => item !== value);
      setCheckedList(filteredList);
    }
  };

  const [isShow, invokeModal] = React.useState(false);
  const initModal = () => {
    return invokeModal(!false);
  };
  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Place Order
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delivery Creation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="card">
              {/* <div className="card-header">
                <p className="title"></p>
              </div> */}
              {/* Source */}
              <div className="card-body">
                <Dropdown style={{ zIndex: "1", top: "0" }}>
                  <Dropdown.Toggle
                    id="dropdown-button-dark-example1"
                    variant="secondary"
                  >
                    Source
                  </Dropdown.Toggle>

                  <Dropdown.Menu variant="dark" style={{ zIndex: "3" }}>
                    <Dropdown.Item href="#/action-1" active>
                      Loc1
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Loc2</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Loc3</Dropdown.Item>

                    <Dropdown.Item href="#/action-4">Loc4</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                {/* Destination */}
                <Dropdown style={{ zIndex: "1", right: "0", top: "0" }}>
                  <Dropdown.Toggle
                    id="dropdown-button-dark-example1"
                    variant="secondary"
                  >
                    Destination
                  </Dropdown.Toggle>

                  <Dropdown.Menu variant="dark" style={{ zIndex: "3" }}>
                    <Dropdown.Item href="#/action-1" active>
                      Loc1
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Loc2</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Loc3</Dropdown.Item>

                    <Dropdown.Item href="#/action-4">Loc4</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <br />
                {/* Timeslot */}
                <Dropdown style={{ zIndex: "1", top: "0", right: "37%" }}>
                  <Dropdown.Toggle
                    id="dropdown-button-dark-example1"
                    variant="secondary"
                  >
                    Timeslot
                  </Dropdown.Toggle>

                  <Dropdown.Menu variant="dark">
                    <Dropdown.Item href="#/action-1" active>
                      9:00
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">12:00</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">15:00</Dropdown.Item>

                    <Dropdown.Item href="#/action-4">18:00</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <br />
            <div className="card">
              <div className="card-header">
                <p className="title"> Checklist </p>
              </div>
              <div className="card-body">
              
                {listData.map((item) => {
                  return (
                    <div key={item} className="checkbox-container">
                      <label>{item.value}</label>
                      <Checkmark
                        size="small"
                        color='#223344'
                        style={{top:"0"}}
                      ></Checkmark>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="dark">Place Order</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalDialog;
