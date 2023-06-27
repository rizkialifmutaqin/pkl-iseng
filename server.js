const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();
const path = require("path");
const bcrypt = require("bcryptjs");
const fs = require("fs");

const app = express();
const port = 5000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "src/images")));

pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log("Connected to MySQL database...");
  connection.release();
});

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});


// menghapus file gambar
app.delete("/api/images/:filename", (req, res) => {
  const filename = req.params.filename;
  const path = `./src/images/${filename}`;
  fs.unlink(path, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Gagal menghapus file." });
    } else {
      res.json({ message: "File berhasil dihapus." });
    }
  });
});

// memeriksa apakah user terautentikasi saat melakukan login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM login WHERE username = ?";
  pool.query(sql, [username], async (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      const isPasswordMatched = await bcrypt.compare(password, result[0].password);
      if (isPasswordMatched) {
        res.json({ role: result[0].role, id_login: result[0].id_login, message: `Berhasil login. Selamat datang ${username}!` });
      } else {
        res.status(401).json({ message: "Password salah." });
      }
    } else {
      res.status(404).json({ message: "Username tidak ditemukan." });
    }
  });
});


// mengambil data pada tabel login
app.get("/api/dataLogin", (req, res) => {
  const sql = "SELECT * FROM login";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// mengambil data tabel login berdasarkan ID
app.get("/api/dataLogin/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM login WHERE id_login = ?";
  pool.query(sql, id, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// menambahkan data pada tabel login
app.post("/api/dataLogin", (req, res) => {
  const { username, password, role } = req.body;
  const sql = `INSERT INTO login (id_login , username, password, role) VALUES ('', '${username}', '${password}', '${role}')`;
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.json({ message: "Data berhasil ditambahkan." });
  });
});

// memperbarui data tabel Login berdasarkan ID
app.put("/api/dataLogin/:id", (req, res) => {
  const id = req.params.id;
  const { username, password, role } = req.body;
  const sql =
    "UPDATE login SET username= ?, password = ?, role = ? WHERE id_login = ?";
  pool.query(sql, [username, password, role, id], (err, result) => {
    if (err) throw err;
    res.json({ message: "Data berhasil diperbarui." });
  });
});

// memperbarui password pada tabel Login berdasarkan ID
app.put("/api/dataLogin/ubahPassword/:id", (req, res) => {
  const id = req.params.id;
  const { password } = req.body;
  const sql =
    "UPDATE login SET password = ? WHERE id_login = ?";
  pool.query(sql, [password, id], (err, result) => {
    if (err) throw err;
    res.json({ message: "Password berhasil diubah. Jangan lupa untuk mengingat passwordnya. Silahkan login kembali" });
  });
});

// menghapus data tabel login berdasarkan ID
app.delete("/api/dataLogin/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM login WHERE id_login = ?";
  pool.query(sql, id, (err, result) => {
    if (err) throw err;
    res.json({ message: "Data berhasil dihapus." });
  });
});



// mengambil data pada tabel Siswa
app.get("/api/dataSiswa", (req, res) => {
  const sql = "SELECT * FROM siswa";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// mengambil data tabel siswa berdasarkan ID
app.get("/api/dataSiswa/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM siswa WHERE id_siswa = ?";
  pool.query(sql, id, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// mengambil data siswa beserta informasi login yang terkait
app.get("/api/dataSiswaWithLogin", (req, res) => {
  const sql = "SELECT siswa.*, login.username FROM siswa INNER JOIN login ON siswa.id_login = login.id_login";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// menambahkan data pada tabel siswa
app.post("/api/dataSiswa", upload.single("foto"), (req, res) => {
  const { nama, kelas, jurusan, umur, id_login } = req.body;
  const pic_siswa = req.file.filename;
  const sql = `INSERT INTO siswa (id_siswa , pic_siswa, nama, kelas, jurusan, umur, id_login) VALUES ('', '${pic_siswa}', '${nama}', '${kelas}', '${jurusan}', '${umur}', '${id_login}')`;
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.json({ message: "Data berhasil ditambahkan." });
  });
});

// memperbarui data tabel siswa berdasarkan ID
app.put("/api/dataSiswa/:id", upload.single("foto"), (req, res) => {
  const id = req.params.id;
  const { nama, kelas, jurusan, umur, id_login } = req.body;

  // Mendapatkan data siswa berdasarkan ID
  const getPicQuerySiswa = "SELECT pic_siswa FROM siswa WHERE id_siswa = ?";
  pool.query(getPicQuerySiswa, id, (err, result) => {
    if (err) throw err;
    const oldPicSiswa = result[0].pic_siswa;
    const oldPicPathSiswa = path.join(__dirname, "src/images", oldPicSiswa);

    // Mengecek apakah ada gambar baru yang diunggah
    if (req.file) {
      // Menghapus gambar lama
      fs.unlink(oldPicPathSiswa, (err) => {
        if (err) console.log(err);
      });
      const pic_siswa = req.file.filename;

      // Memperbarui data siswa dengan gambar baru
      const sql =
        "UPDATE siswa SET pic_siswa = ?, nama = ?, kelas = ?, jurusan = ?, umur = ?, id_login = ? WHERE id_siswa = ?";
      pool.query(sql, [pic_siswa, nama, kelas, jurusan, umur, id_login, id], (err, result) => {
        if (err) throw err;
        res.json({ message: "Data berhasil diperbarui." });
      });
    } else {
      // Memperbarui data siswa tanpa mengubah gambar
      const sql =
        "UPDATE siswa SET nama = ?, kelas = ?, jurusan = ?, umur = ?, id_login = ? WHERE id_siswa = ?";
      pool.query(sql, [nama, kelas, jurusan, umur, id_login, id], (err, result) => {
        if (err) throw err;
        res.json({ message: "Data berhasil diperbarui." });
      });
    }
  });
});


// menghapus data tabel siswa berdasarkan ID
app.delete("/api/dataSiswa/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM siswa WHERE id_siswa = ?";
  pool.query(sql, id, (err, result) => {
    if (err) throw err;
    res.json({ message: "Data berhasil dihapus." });
  });
});


