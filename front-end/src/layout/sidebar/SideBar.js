import React from "react";
import {Nav, NavDropdown, NavItem} from "react-bootstrap";
import './SideBar.css'

function SideBar() {
    return (
        <div>
            <Nav id="b" className="col-md-12 d-none d-md-block bg-light sidebar"
            activeKey="/home"
            onSelect={selectedKey => alert(`selected ${selectedKey}`)}
            >
                
            
                <NavDropdown title="Sắp xếp theo" id="navbarSortDropdown">
                  <NavDropdown title="A-Z" id="navbarSortA-ZDropdown">
                    <NavDropdown.Item href="#">A-&gt;Z</NavDropdown.Item>
                    <NavDropdown.Item href="#">Z-&gt;A</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Date" id="navbarSortDateDropdown">
                    <NavDropdown.Item href="#">new</NavDropdown.Item>
                    <NavDropdown.Item href="#">old</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Quantity" id="navbarSortA-ZDropdown">
                    <NavDropdown.Item href="#">Low to High</NavDropdown.Item>
                    <NavDropdown.Item href="#">High to Low</NavDropdown.Item>
                  </NavDropdown>
                </NavDropdown>
                <NavItem title="thêm sản phẩm" ></NavItem>
            
              
            </Nav>
          
        </div>
        );
}

export default SideBar;