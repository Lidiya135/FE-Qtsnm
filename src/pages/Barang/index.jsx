import { useEffect, useState } from "react";
import swal from "sweetalert";
import axios from "axios";
// import styles from "./barang.module.css";
import InsertData from "../../components/ModalAdd";
import Edit from "../../components/ModalEdit";
// import DeleteData from "../../components/ModalDelete";
// import Nav from "../../components/Navbar";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Barang() {

    const [data, setData] = useState([]);
    const [inputData, setInputData] = useState({
        search: "",
    });
    const [sortBy, setSortBy] = useState("");
    const [sort, setSort] = useState("");

    useEffect(() => {
        getData()
    }, [inputData.search, sortBy, sort])

    const handleChange = (e) => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value,
        });
    };

    const getData = () => {
        axios
            .get(`http://localhost:3999/barang?search=${inputData.search}&sortby=${sortBy}&sort=${sort}`)
            .then((res) => {
                console.log("get data succes");
                console.log(res.data);
                res.data && setData(res.data.data);
            })
            .catch((err) => {
                console.log("get data fail");
                console.log(err);
            });
    }
    useEffect(() => {
        getData()
    }, [])

    const deleteData = (id) => {
        axios.delete(`http://localhost:3999/barang/${id}`,)
            .then((res) => {
                console.log("delete barang success")
                console.log(res)
                swal("Success", "Delete barang success", "success");
                getData();
                window.location.reload(false);
            })
            .catch((err) => {
                console.log("delete barang fail")
                console.log(err)
                swal("Warning", "Delete barang failed", "error");
            })
    }

    return (
        <div className="bg-secondary " >
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">
                        <h3>Penjualan Barang</h3>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <div
                                className={`btn ${sortBy === "nama_barang" ? "btn-success" : "btn-outline-success"
                                    } ms-1`}
                                onClick={() => setSortBy("nama_barang")}
                                style={{ width: "100px", borderRadius: "10px" }}
                            >
                                <h6 className=" mt-1">Nama Barang</h6>
                            </div>
                            <div
                                className={`btn ${sortBy === "jumlah_terjual" ? "btn-success" : "btn-outline-success"
                                    } ms-3`}
                                onClick={() => setSortBy("jumlah_terjual")}
                                style={{ width: "100px", borderRadius: "10px" }}
                            >
                                <h6 className=" mt-1">Jumlah Terjual</h6>
                            </div>
                            <div
                                className={`btn ${sortBy === "tanggal_transaksi" ? "btn-success" : "btn-outline-success"
                                    } ms-3`}
                                onClick={() => setSortBy("tanggal_transaksi")}
                                style={{ width: "100px", borderRadius: "10px" }}
                            >
                                <h6 className=" mt-1">Tanggal Transaksi</h6>
                            </div>

                            <div
                                className={`btn ${sort === "asc" ? "btn-success" : "btn-outline-success"
                                    } ms-5`}
                                onClick={() => setSort("asc")}
                                style={{ width: "100px", borderRadius: "10px" }}
                            >
                                <h6 className=" mt-1">ASC</h6>
                            </div>
                            <div
                                className={`btn ${sort === "desc" ? "btn-success" : "btn-outline-success"
                                    } ms-3`}
                                onClick={() => setSort("desc")}
                                style={{ width: "100px", borderRadius: "10px" }}
                            >
                                <h6 className=" mt-1">DESC</h6>
                            </div>
                            
                            <NavDropdown title="Jenis Barang" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="#action3">Jenis Barang</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">
                                    konsumsi
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                            </NavDropdown>
                            
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                value={inputData.search}
                                name="search"
                                onChange={handleChange}
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <section className="mt-3">
                <Table responsive="sm" className="text-center">
                    <thead>
                        <tr>
                            <th>Nama Barang</th>
                            <th>Stok Barang</th>
                            <th>Jumlah Terjual</th>
                            <th>Tanggal Transaksi</th>
                            <th>Jenis Barang</th>
                            <th>
                                <InsertData />
                            </th>
                        </tr>
                    </thead>
                    {data?.map((p) => (
                        <tbody key={p.id}>
                            <tr>
                                <td>{p.nama_barang}</td>
                                <td>{p.stok}</td>
                                <td>{p.jumlah_terjual}</td>
                                <td>{p.tanggal_transaksi}</td>
                                <td>{p.jenis_barang}</td>
                                <td>
                                    <Edit data={p} />
                                    <Button variant="danger" type="submit" onClick={(e) => deleteData(e, p.id)}>Delete</Button>{' '}
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </Table>
            </section>
        </div>


    )

}