import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Sidebar";

const EditSiswa = () => {
    const { id } = useParams();
    const history = useHistory();
    const [siswa, setSiswa] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/dataSiswa/" + id)
            .then((res) => setSiswa(res.data[0]))
            .catch((err) => console.log(err));
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSiswa((prevSiswa) => ({
            ...prevSiswa,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("foto", selectedFile);
        formData.append("nama", siswa.nama);
        formData.append("kelas", siswa.kelas);
        formData.append("jurusan", siswa.jurusan);
        formData.append("umur", siswa.umur);
        formData.append("id_login", siswa.id_login);
        try {
            const response = await axios.put(
                `http://localhost:5000/api/dataSiswa/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.data) {
                alert(response.data.message);
                history.push("/dataSiswa");
                return;
            }
        } catch (err) {
            console.error(err);
            alert(err.message);
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
            <h2>Edit Data Siswa</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formProfilSiswa">
                    <Form.Label>Foto Siswa</Form.Label>
                    <Form.Control
                        type="file"
                        name="foto"
                        onChange={handleImageChange}
                    />
                </Form.Group>
                <Form.Group controlId="formNama">
                    <Form.Label>Nama Siswa</Form.Label>
                    <Form.Control
                        type="text"
                        name="nama"
                        value={siswa.nama}
                        onChange={handleInputChange}
                        placeholder="Masukkan Nama Siswa"
                    />
                </Form.Group>
                <Form.Group controlId="formKelas">
                    <Form.Label>Kelas</Form.Label>
                    <Form.Control
                        as="select"
                        name="kelas"
                        value={siswa.kelas}
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
                        placeholder="Masukkan Umur"
                    />
                </Form.Group>
                <Form.Group controlId="formIdLogin">
                    <Form.Label>Id Login</Form.Label>
                    <Form.Control
                        type="number"
                        name="id_login"
                        value={siswa.id_login}
                        onChange={handleInputChange}
                        placeholder="Masukkan Id Login"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Simpan
                </Button>
            </Form>
        </div>
    );
};

export default EditSiswa;
