import { useEffect, useState } from "react";
import swal from "sweetalert";
import axios from "axios";
// import styles from "./barang.module.css";
import InsertData from "../../components/ModalAdd";
import EditData from "../../components/ModalEdit";
// import DeleteData from "../../components/ModalDelete";
import Nav from "../../components/Navbar";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default function Barang() {

    const [data, setData] = useState([]);

    const getData = () => {
        axios
            .get(`http://localhost:3999/barang`)
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

    const deleteData = (e, id) => {
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
            <Nav />
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
                                    <EditData id={p.id} />
                                    <Button variant="danger" type="submit" onClick={(e) => deleteData(e, p.id)}>Delete</Button>{' '}
                                </td>
                            </tr>
                            {/* <tr>
                            <td>Kopi</td>
                            <td>100</td>
                            <td>10</td>
                            <td>01-01-2021</td>
                            <td>Konsumsi</td>
                            <td>
                            <EditData />
                            <Button variant="danger">Delete</Button>{' '}
                            </td>
                        </tr> */}
                        </tbody>
                    ))}
                </Table>
            </section>
        </div>


    )

}