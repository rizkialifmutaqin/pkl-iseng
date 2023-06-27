import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Sidebar";

const TambahSiswa = () => {
    const [siswa, setSiswa] = useState({
        foto: null,
        nama: "",
        kelas: "",
        jurusan: "",
        umur: "",
        id_login: "",
    });
    const history = useHistory();

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (name === "foto") {
            setSiswa({ ...siswa, foto: files[0] });
        } else {
            setSiswa({ ...siswa, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("foto", siswa.foto);
            formData.append("nama", siswa.nama);
            formData.append("kelas", siswa.kelas);
            formData.append("jurusan", siswa.jurusan);
            formData.append("umur", siswa.umur);
            formData.append("id_login", siswa.id_login);
            const response = await axios.post(
                "http://localhost:5000/api/dataSiswa",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (response.data) {
                alert(response.data.message);
                setSiswa({ foto: null, nama: "", kelas: "", jurusan: "", umur: "", id_login: "" });
                history.push("/dataSiswa");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleBack = () => {
        history.push("/dataSiswa");
    };

    return (
        <div className="p-3">
            {/* <Navbar /> */}
            <button className="back-button mb-2">
                <FontAwesomeIcon icon={faArrowLeft} onClick={handleBack} style={{ color: 'black' }} />
            </button>
            <h1>Tambah Data Siswa</h1>
            <Form onSubmit={handleSubmit} className="row gy-3">
                <Form.Group controlId="formProfilSiswa">
                    <Form.Label>Foto Siswa</Form.Label>
                    <Form.Control
                        type="file"
                        name="foto"
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formNama">
                    <Form.Label>Nama</Form.Label>
                    <Form.Control
                        type="text"
                        name="nama"
                        value={siswa.nama}
                        onChange={handleChange}
                        placeholder="Masukkan Nama Siswa"
                    />
                </Form.Group>
                <Form.Group controlId="formKelas">
                    <Form.Label>Kelas</Form.Label>
                    <Form.Control
                        as="select"
                        name="kelas"
                        value={siswa.kelas}
                        onChange={handleChange}
                    >
                        <option value="">-- Pilih Kelas --</option>
                        <option value="X">X (Sepuluh)</option>
                        <option value="XI">XI (Sebelas)</option>
                        <option value="XII">XII (Dua Belas)</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formJurusan">
                    <Form.Label>Jurusan</Form.Label>
                    <Form.Control
                        as="select"
                        name="jurusan"
                        value={siswa.jurusan}
                        onChange={handleChange}
                    >
                        <option value="">-- Pilih Jurusan --</option>
                        <option value="RPL">RPL</option>
                        <option value="TKJ">TKJ</option>
                        <option value="TJA">TJA</option>
                        <option value="TR">TR</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formUmur">
                    <Form.Label>Umur</Form.Label>
                    <Form.Control
                        type="number"
                        name="umur"
                        value={siswa.umur}
                        onChange={handleChange}
                        placeholder="Masukkan Umur"
                    />
                </Form.Group>
                <Form.Group controlId="formIdLogin">
                    <Form.Label>Id Login</Form.Label>
                    <Form.Control
                        type="number"
                        name="id_login"
                        value={siswa.id_login}
                        onChange={handleChange}
                        placeholder="Masukkan Id Login"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Simpan
                </Button>
            </Form>
        </div>
    );
}

export default TambahSiswa;