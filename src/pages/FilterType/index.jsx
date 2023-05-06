import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import Edit from '../../components/ModalEdit';
import InsertData from "../../components/ModalAdd";
import swal from 'sweetalert';
import { useParams } from 'react-router-dom';

function FilterType() {

    const [data, setData] = useState([]);
    const jenis_barang = useParams();
    
    const getData = () => {
        axios
            .get(`http://localhost:3999/barang/${jenis_barang}`)
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
        <>
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
                            <Nav.Link href="#action1">transaksi terbanyak</Nav.Link>
                            <Nav.Link href="#action2">transaksi terendah</Nav.Link>
                        </Nav>
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
        </>
    );
}

export default FilterType;