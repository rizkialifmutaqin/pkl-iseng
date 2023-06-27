import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { hash } from "bcryptjs";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Sidebar";

const TambahLogin = () => {
    const [login, setLogin] = useState({
        username: "",
        password: "",
        role: "",
    });
    const history = useHistory();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLogin({ ...login, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const hashedPassword = await hash(login.password, 10);
            const formData = {
                username: login.username,
                password: hashedPassword,
                role: login.role,
            };
            const response = await axios.post(
                "http://localhost:5000/api/dataLogin",
                formData
            );
            if (response.data) {
                alert(response.data.message);
                setLogin({ username: "", password: "", role: "" });
                history.push("/dataLogin");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleBack = () => {
        history.push("/dataLogin");
    };

    return (
        <div className="p-3">
            {/* <Navbar /> */}
            <button className="back-button mb-2">
                <FontAwesomeIcon icon={faArrowLeft} onClick={handleBack} style={{ color: 'black' }} />
            </button>
            <h1>Tambah Data Login</h1>
            <Form onSubmit={handleSubmit} className="row gy-3">
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={login.username}
                        onChange={handleChange}
                        placeholder="Masukkan username"
                    />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={login.password}
                        onChange={handleChange}
                        placeholder="Masukkan Password"
                    />
                </Form.Group>
                <Form.Group controlId="formRole">
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                        as="select"
                        name="role"
                        value={login.role}
                        onChange={handleChange}
                    >
                        <option value="">-- Pilih Role --</option>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Simpan
                </Button>
            </Form>
        </div>
    );
};

export default TambahLogin; 