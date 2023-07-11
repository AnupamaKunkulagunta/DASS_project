import { Modal, Button, Offcanvas, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Checkmark } from "react-checkmark";

import DroneImage1 from "../1.png";
import DroneImage2 from "../2.png";
import DroneImage3 from "../3.png";
import DroneImage4 from "../4.png";

export default function FOD() {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [orderCount, setOrderCount] = useState(1); // starting count of orders
  const [orderData, setOrderData] = useState([]); // store order information
  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const handleShowOffcanvas = () => setShowOffcanvas(true);
  const droneImages = [DroneImage1, DroneImage2, DroneImage3, DroneImage4];

  const listData = [
    { id: "1", value: "No-fly zones" },
    { id: "2", value: "Weather" },
    { id: "3", value: "Battery" },
    { id: "4", value: "Drones Available" },
  ];

  const [isShow, invokeModal] = React.useState(false);
  const initModal = () => {
    return invokeModal(!false);
  };

  const addOrder = () => {
    const orderNumber = orderCount;
    if (orderNumber <= 9 && orderNumber >= 1) {
      const sourceLocation = document.querySelector(".Source").value;
      const destinationLocation = document.querySelector(".Destination").value;
      const timeSlot = document.querySelector(".TimeSlot").value;

      const table = document.querySelector(".fod");
      const row = table.insertRow();
      const orderNumberCell = row.insertCell();
      const sourceLocationCell = row.insertCell();
      const destinationLocationCell = row.insertCell();
      const timeSlotCell = row.insertCell();
      const imageCell = row.insertCell();

      orderNumberCell.innerHTML = `${orderNumber}`;
      sourceLocationCell.innerHTML = `${sourceLocation}`;
      destinationLocationCell.innerHTML = `${destinationLocation}`;
      timeSlotCell.innerHTML = `${timeSlot}`;

      // Select a random drone image from the array
      const randomIndex = Math.floor(Math.random() * droneImages.length);
      const image = droneImages[randomIndex];

      imageCell.innerHTML = `<img src=${image}  style="width: 9vw; height: 9vh;" alt="Drone Image" />`;

      setOrderCount(orderCount + 1);
    }
  };

  const deleteOrder = () => {
    const table = document.querySelector(".fod");
    const rowCount = table.rows.length;
    if (rowCount > 1) {
      // make sure there is at least one order row to delete
      table.deleteRow(rowCount - 1); // delete the last row (most recent order)
      setOrderCount(orderCount - 1);
      setOrderData(orderData.slice(0, -1)); // remove the last order data from state
    }
  };

  return (
    <>
      <Button
        variant="secondary"
        onClick={handleShowOffcanvas}
        className="me-2"
      >
        FOD Gallery
      </Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delivery Creation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="card">
              <div className="card-body">
                <Form.Select className="Source">
                  <option>Source Location</option>
                  <option value="SrcLoc1">SrcLoc1</option>
                  <option value="SrcLoc2">SrcLoc2</option>
                  <option value="SrcLoc3">SrcLoc3</option>
                </Form.Select>
                <br />
                <Form.Select className="Destination">
                  <option>Destination Location</option>
                  <option value="DestLoc1">DestLoc1</option>
                  <option value="DestLoc2">DestLoc2</option>
                  <option value="DestLoc3">DestLoc3</option>
                </Form.Select>
                <br />
                <Form.Select className="TimeSlot">
                  <option>Time Slot</option>
                  <option value="9:00">9:00</option>
                  <option value="12:00">12:00</option>
                  <option value="15:00">15:00</option>
                  <option value="18:00">18:00</option>
                  <option value="21:00">21:00</option>
                  <option value="1:23">21:00</option>
                </Form.Select>
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
                    <div className="checkbox-container">
                      <label>{item.value}</label>
                      <Checkmark
                        size="small"
                        color="#223344"
                        style={{ top: "0" }}
                      ></Checkmark>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button onClick={addOrder} variant="dark">
            Place Order
          </Button>
        </Modal.Footer>
      </Modal>

      {/* FOD Gallery */}
      <Offcanvas
        className="bg-dark"
        show={showOffcanvas}
        onHide={handleCloseOffcanvas}
        placement={"end"}
        scroll={true}
      >
        <Offcanvas.Header className="bg-light" closeButton>
          <div>
            <button variant="secondary" onClick={handleShowModal}>
              Add
            </button>
            <button variant="secondary" onClick={deleteOrder}>
              Delete
            </button>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <table className="fod">
            <tr>
              <th> Order Number </th>
              <th> Source Location </th>
              <th> Destination Location </th>
              <th> Time Slot </th>
              <th> Image </th>
            </tr>
            {[...Array(orderCount)].map((_, index) => (
              // render order rows dynamically based on orderCount state
              <React.Fragment className="hud-tr" key={index} />
            ))}
          </table>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
