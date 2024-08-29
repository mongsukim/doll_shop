/* eslint-disable */
import React, { useState, useContext, lazy, Suspense } from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import './App.css';
import Data from './data.js';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
// import Detail from './Detail.js';
let Detail = lazy(() => import('./Detail.js'));
import axios from 'axios';
import Cart from './Cart.js';

let Stockcontext = React.createContext();

function App() {
    let [shoes, setShoes] = useState(Data);
    let [Stock, setStock] = useState([10, 11, 12]);

    return (
        <div className="App">
            <Navbar bg="light" expand="lg" className="">
                <Navbar.Brand href="#home">shop</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/">
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/detail">
                            Detail
                        </Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="background">
                <h1>코코아 인형몰입니다!</h1>
                <p>마음에 드는 인형을 골라주세요!</p>
            </div>
            <div className="container">
                <Stockcontext.Provider value={Stock}>
                    <div className="row">
                        {shoes.map((a, i) => {
                            return <Card shoes={shoes[i]} i={i} key={i} />;
                        })}
                    </div>
                </Stockcontext.Provider>

                <button
                    className="btn btn-primary"
                    onClick={() => {
                        axios
                            .get('https://codingapple1.github.io/shop/data2.json')
                            .then((result) => {
                                console.log(result.data);
                                setShoes([...shoes, ...result.data]);
                            })
                            .catch(() => {
                                console.log('실패했어요');
                            });
                    }}
                >
                    더보기
                </button>
            </div>

            <Routes>
                <Route path="/" element={<Home shoes={shoes} Stock={Stock} setShoes={setShoes} />} />
                <Route path="/detail/:id" element={
                    <Stockcontext.Provider value={Stock}>
                        <Suspense fallback={<div>로딩중</div>}>
                            <Detail shoes={shoes} Stock={Stock} setStock={setStock} />
                        </Suspense>
                    </Stockcontext.Provider>
                } />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </div>
    );
}

function Home({ shoes, Stock, setShoes }) {
    return (
        <>
            <div className="background">
                <h1>코코아 인형몰입니다!</h1>
                <p>마음에 드는 인형을 골라주세요!</p>
            </div>
            <div className="container">
                <Stockcontext.Provider value={Stock}>
                    <div className="row">
                        {shoes.map((a, i) => {
                            return <Card shoes={shoes[i]} i={i} key={i} />;
                        })}
                    </div>
                </Stockcontext.Provider>
            </div>
        </>
    );
}

function Card(props) {
    let Stock = useContext(Stockcontext);
    let navigate = useNavigate();
    return (
        <div
            className="col-md-4"
            onClick={() => {
                navigate('/detail/' + props.shoes.id);
            }}
        >
            <img
                src={'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg'}
                width="100%"
            />
            <h4>{props.shoes.title}</h4>
            <p>
                {props.shoes.content} & {props.shoes.price}
            </p>
            {Stock}
        </div>
    );
}

export default App;