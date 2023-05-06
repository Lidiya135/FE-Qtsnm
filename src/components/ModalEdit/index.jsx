import { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Edit({data}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let id = data.id;
    // console.log(id, "id edit ")

    //UpdateData
    const [updateData, setUpdateData] = useState({
        nama_barang: data.nama_barang,
        stok: data.stok,
        jumlah_terjual: data.jumlah_terjual,
        tanggal_transaksi: data.tanggal_transaksi,
        jenis_barang: data.jenis_barang
    });
    // console.log(updateData)

    const handleChange = (e) => {
        setUpdateData({
            ...updateData,
            [e.target.name]: e.target.value
        });
    };

    const postData = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("nama_barang", updateData.nama_barang);
        formData.append("stok", updateData.stok);
        formData.append("jumlah_terjual", updateData.jumlah_terjual);
        formData.append("tanggal_transaksi", updateData.tanggal_transaksi);
        formData.append("jenis_barang", updateData.jenis_barang)
        console.log(formData)
        await
            axios
                .put(`http://localhost:3999/barang/${id}`, formData)
                .then((res) => {
                    console.log("Update barang succes");
                    console.log(res);
                    swal("Success", "Update Barang Success", "success");
                    window.location.reload(false);
                })
                .catch((err) => {
                    console.log("Update data failed");
                    console.log(err);
                    swal("Warning", "Update Barang failed", "error");
                    // window.location.reload(false);
                });
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Edit Barang
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal Edit Barang</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nama Barang</Form.Label>
                            <Form.Control
                                name="nama_barang"
                                value={updateData.nama_barang}
                                onChange={ handleChange}
                                // placeholder={data.nama_barang}
                                className="mb-2"
                                type="text"
                                autoFocus
                            />

                            <Form.Label>Stok Barang</Form.Label>
                            <Form.Control
                                name="stok"
                                value={updateData.stok}
                                onChange={handleChange}
                                // placeholder={data.stok}
                                className="mb-2"
                                type="number"
                                autoFocus
                            />

                            <Form.Label>Jumlah Terjual</Form.Label>
                            <Form.Control
                                name="jumlah_terjual"
                                value={updateData.jumlah_terjual}
                                onChange={handleChange}
                                // placeholder={data.jumlah_terjual}
                                className="mb-2"
                                type="number"
                                autoFocus
                            />

                            <Form.Label>Tanggal Transaksi</Form.Label>
                            <Form.Control
                                name="tanggal_transaksi"
                                value={updateData.tanggal_transaksi}
                                onChange={handleChange}
                                // placeholder={data.tanggal_transaksi}
                                className="mb-2"
                                type="date"
                                autoFocus
                            />

                            <Form.Label>Jenis Barang</Form.Label>
                            <Form.Control
                                name="jenis_barang"
                                value={updateData.jenis_barang}
                                onChange={ handleChange}
                                // placeholder={data.jenis_barang}
                                className="mb-2"
                                type="text"
                                autoFocus
                            />
                        </Form.Group>
                        
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={postData}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Edit;