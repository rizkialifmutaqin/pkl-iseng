import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "../nillkin-case.webp";
import { Link } from "react-router-dom";

function FeatureProduct() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:5000/api/dataKendaraan")
      .then((response) => setData(response.data))
      .catch((err) => console.error(err));
  };
  

  return (
    <>
      {data.map((item) => (
        <div className="col">
          <div className="card shadow-sm">
            <img
              className="card-img-top bg-dark cover"
              height="240"
              alt={item.nama_kendaraan}
              src={`http://localhost:5000/images/${item.pic_kendaraan}`}
            />
            <div className="card-body">
              <h5 className="card-title">{item.nama_kendaraan}</h5>
              <p className="card-text">{item.tahun_produksi}</p>
              <h6 className="card-text">Rp {item.harga}</h6>
              <p className="card-text text-muted mb-3">{item.daerah_asal}</p>
              <div className="d-grid gap-2">
                <Link to={`/products/${item.id_kendaraan}`} className="btn btn-outline-dark" replace>
                  Detail
                </Link>
              </div>
            </div>
          </div>
        </div>
        ))
      }
    </>
  );
}

export default FeatureProduct;
