import { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Add() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //CreateData
    const [inputData, setInputData] = useState({
        nama_barang: '',
        stok: '',
        jumlah_terjual: '',
        tanggal_transaksi: '',
        jenis_barang: ''
    });

    const onChangeHandle = (e) => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value,
        });
    };

    const postData = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:3999/barang`, inputData)
            swal("Success", "Menambahkan Barang Sukses", "success");
            window.location.reload(false);
        } catch (err) {
            console.log(err);
            swal("Warning", "Gagal Menambahkan Barang", "error");
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Tambah Barang
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Tambahkan Barang</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={postData}>
                        <Form.Group>
                            <Form.Label>Nama Barang</Form.Label>
                            <Form.Control
                                className="mb-2"
                                type="text"
                                id="nama_barang"
                                name="nama_barang"
                                onChange={onChangeHandle}
                                placeholder="masukkan nama barang"
                                autoFocus
                            />

                            <Form.Label>Stok Barang</Form.Label>
                            <Form.Control
                                className="mb-2"
                                id="stok" 
                                name="stok" 
                                onChange={onChangeHandle}
                                type="number"
                                placeholder="masukkan stok barang"
                                autoFocus
                            />

                            <Form.Label>Jumlah Terjual</Form.Label>
                            <Form.Control
                                id="jumlah_terjual" 
                                name="jumlah_terjual" 
                                onChange={onChangeHandle}
                                className="mb-2"
                                type="number"
                                placeholder="Masukkan jumlah terjual"
                                autoFocus
                            />

                            <Form.Label>Tanggal Transaksi</Form.Label>
                            <Form.Control
                                id="tanggal_transaksi" 
                                name="tanggal_transaksi" 
                                onChange={onChangeHandle}
                                className="mb-2"
                                type="date"
                                placeholder="01-01-2021"
                                autoFocus
                            />

                            <Form.Label>Jenis Barang</Form.Label>
                            <Form.Control
                                id="jenis_barang" 
                                name="jenis_barang" 
                                onChange={onChangeHandle}
                                className="mb-2"
                                type="text"
                                placeholder="konsumsi"
                                autoFocus
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={ postData}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Add;