/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { Container, Modal, Nav, NavDropdown, NavItem } from "react-bootstrap";
import "./SideBar.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { IoRefresh } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import { BiMenu } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { getAllProductLine, createProduct } from "../../API/productApi";
import Select from "react-select";
import Notification from "../../components/notification/notification";
import { MDBInput } from "mdb-react-ui-kit";
import { useSettingContext } from "../../state/hook/hooks";
import { DSP, SP } from "../../state/constants";
const SideBar = () => {
  const [show, setShow] = useState(false);
  const [productLines, handle] = useState([]);
  const [plShow, setPlShow] = useState(false);
  const [selectId, setId] = useState(-1);
  const [settingState, updateSettingState] = useSettingContext();

  const [validate, setValidate] = useState(false);

  const handleGetProductLine = async () => {
    let response = await getAllProductLine();
    console.log(response.data);
    if (response.success) {
      let res = [];
      response.data.map((item, index) => {
        // console.log(item.name)
        // console.log(item.productLineId)
        let tg = {
          label: item.name,
          value: item.productLineId,
        };
        res.push(tg);
      });

      handle(res);
    }
  };

  const handleShow = () => {
    console.log(settingState);
    switch (settingState.create) {
      case SP:
        handleGetProductLine();
        setShow(true);
        break;
      case DSP:
        handlePlShow();
        break;
      default:
        return;
    }
  };

  const handleClose = () => {
    switch (settingState.create) {
      case SP:
        // handleGetProductLine();
        setShow(false);
        break;
      case DSP:
        handlePlClose();
        break;
      default:
        return;
    }
  };
  const handlePlClose = () => setPlShow(false);

  const handlePlShow = () => {
    setPlShow(true);
  };

  const handleChange = (e) => {
    setId(e.value);
  };

  const vald = (e) => {
    const error = e.target.parentNode.parentNode.childNodes[1];
    // console.log(e.target.parentNode.parentNode.childNodes[1]);
    if (!e.target.value) {
      error.innerHTML = "*Không được để trống " + e.target.placeholder;
      setValidate(false);
    } else {
      error.innerHTML = "";
      setValidate(true);
    }
  };

  const handleSendCreatePL = async (e) => {
    // Notification("error", "chuwa ddien ca truong can thiets");
    const info = {
      color: document.getElementById("color").value,
      mass: document.getElementById("khoiLuong").value,
      ramRom: document.getElementById("RAM/ROM").value,
      display: document.getElementById("manHinh").value,
    };
    const data = {
      name: document.getElementById("name").value,
      info: info,
    };

    if (document.getElementById("PLImg").files[0]) {
      data.img = document.getElementById("PLImg").files[0];
    }
    console.log(data.info);
    console.log(data);
    let response;
  };

  const handleSend = async () => {
    console.log("id: " + selectId);
    console.log("sl: " + document.getElementById("numOfProduct").value);
    let data = {
      idProductLine: selectId,
      name: document.getElementById("nameOfProduct").value,
      num: document.getElementById("numOfProduct").value,
    };
    let response = await createProduct(data);
    if (response.success) {
      Notification("success", "Tạo sản phẩm thành công");
    } else {
      Notification("error", "tạo sản phẩm thất bại");
    }
    handleClose();
  };

  return (
    <div>
      <Nav
        style={{ borderRight: "2px solid rgb(98, 69, 69)" }}
        id="b"
        className="col-md-12 d-none d-md-block bg-dark sidebar"
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <div style={{ display: "block" }}>
          <Button variant="outline-success" className="bt" onClick={handleShow}>
            {" "}
            <IoAdd />{" "}
          </Button>
          
        </div>
        {/* )} */}

        {/* {visible && ( */}
        <div style={{ display: "block" }}>
          <ul className="list-group list-group-flush">
            {" "}
            &ensp;Search by:
            <li className="list-group-item">
              {" "}
              {/* ID: */}
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="ID"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success" className="btns">
                  <IoAdd />
                </Button>
              </Form>
            </li>
            <li className="list-group-item">
              {/* Date: */}
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Date"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success" className="btns">
                  <IoAdd />
                </Button>
              </Form>
            </li>
            <li className="list-group-item">
              {/* Kho: */}
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Kho"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success" className="btns">
                  <IoAdd />
                </Button>
              </Form>
            </li>
            <li className="list-group-item">
              {/* Time: */}
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Time"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success" className="btns">
                  <IoAdd />
                </Button>
              </Form>
            </li>
          </ul>

          <ul className="list-group list-group-flush sort" id="sortList">
            {" "}
            &ensp;Sort by:
            <li className="list-group-item sortBy" id="SortA-Z">
              A-Z
              <span className="arrow"></span>
            </li>
            <li className="list-group-item sortBy" id="SortDate">
              Date
              <span class="arrow"></span>
            </li>
            <li className="list-group-item sortBy" id="SortQ">
              Quantity
              <span class="arrow"></span>
            </li>
          </ul>
        </div>
      </Nav>

      <Modal show={show} onHide={handleClose} className="modal-custom">
        <Modal.Header closeButton>
          <Modal.Title>Tạo sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label>Dòng sản phẩm</label>
            <Select
              options={productLines}
              id="idProductLineSelect"
              onChange={handleChange}
              isSearchable={true}
            />
            <span style={{ color: "red" }}></span>
          </div>
          <div>
            <label>Tên sản phẩm</label>
            <br />
            <input type="text" id="nameOfProduct"></input>
          </div>
          <div>
            <label>Số lượng Sản phẩm</label>
            <br />
            <input type="number" id="numOfProduct" max={1234}></input>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Huỷ
          </Button>
          <Button variant="primary" onClick={handleSend}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={plShow} onHide={handleClose} className="modal-custom">
        <Modal.Header closeButton>
          <Modal.Title>Tạo dòng sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <MDBInput
              // wrapperClass="mb-2"
              id="name"
              type="text"
              required
              size="lg"
              placeholder="Name"
              name="name"
              onBlur={vald}
            />
            <div
              style={{ color: "red", height: "1.5rem", paddingLeft: "2rem" }}
            ></div>
          </div>
          <div>
            <MDBInput
              // wrapperClass="mb-4"
              id="color"
              type="text"
              required
              size="lg"
              onBlur={vald}
              placeholder="Màu"
            />
            <div
              style={{ color: "red", height: "1.5rem", paddingLeft: "2rem" }}
            ></div>
          </div>
          <div>
            <MDBInput
              // wrapperClass="mb-4"
              id="khoiLuong"
              type="text"
              required
              size="lg"
              onBlur={vald}
              placeholder="Khối lượng"
              // label="kg"
            />
            <div
              style={{ color: "red", height: "1.5rem", paddingLeft: "2rem" }}
            ></div>
          </div>
          <div>
            <MDBInput
              // wrapperClass="mb-4"
              id="RAM/ROM"
              type="text"
              required
              onBlur={vald}
              size="lg"
              placeholder="RAM/ROM"
            />
            <div
              style={{ color: "red", height: "1.5rem", paddingLeft: "2rem" }}
            ></div>
          </div>
          <div>
            <MDBInput
              // wrapperClass="mb-4"
              id="manHinh"
              type="text"
              onBlur={vald}
              required
              size="lg"
              placeholder="Màn hình"
            />
            <div
              style={{ color: "red", height: "1.5rem", paddingLeft: "2rem" }}
            ></div>
          </div>
          <div>
            <MDBInput
              // wrapperClass="mb-4"
              id="mota"
              type="textarea"
              size="lg"
              rows="5"
              onBlur={vald}
              placeholder="Mô tả"
              // formNoValidate={}
            />
            <div
              style={{ color: "red", height: "1.5rem", paddingLeft: "2rem" }}
            ></div>
          </div>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Control type="file" id="PLImg" accept=".jpg, .jpeg, .png" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="mb-3 ">
            cancel
          </Button>
          <Button
            variant="primary"
            className="mb-3 "
            onClick={handleSendCreatePL}
            // disabled={!validate}
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SideBar;
