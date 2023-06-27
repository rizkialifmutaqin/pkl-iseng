import React, { useState, useEffect } from "react";
import axios from "axios";
import BannerZero from "./banner-0.jpg";
import BannerOne from "./banner-1.jpg";
import BannerTwo from "./banner-2.jpg";

function BannerIndicator(props) {
  return (
    <button
      type="button"
      data-bs-target="#bannerIndicators"
      data-bs-slide-to={props.index}
      className={props.active ? "active" : ""}
      aria-current={props.active}
    />
  );
}

function BannerImage(props) {
  return (
    <div
      className={`carousel-item ${props.active ? "active" : ""}`}
      data-bs-interval="4000"
    >
      <div
        className="ratio"
        style={{ "--bs-aspect-ratio": "50%", maxHeight: "450px" }} // Ubah maxHeight sesuai kebutuhan
      >
        <img
          className="d-block w-100 h-100 bg-dark cover"
          alt=""
          src={props.image}
        />
      </div>
      <div className="carousel-caption d-none d-lg-block" style={{ 
          backdropFilter: "blur(5px)", 
          backgroundColor: "rgba(0, 0, 0, 0.3)", 
          opacity: 1, 
          padding: 10, 
          borderRadius: 5 
        }}>
          <h4>{props.title}</h4>
          <p>{props.description}</p>
      </div>
    </div>
  );
}

function Banner() {
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0); // Menyimpan indeks gambar aktif

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:5000/api/dataBanner")
      .then((response) => {
        setData(response.data);
        setActiveIndex(0); // Mengatur gambar pertama sebagai gambar aktif secara default
      })
      .catch((err) => console.error(err));
  };

  return (
    <div
      id="bannerIndicators"
      className="carousel slide"
      data-bs-ride="carousel"
      style={{ marginTop: "56px" }}
    >
      <div className="carousel-indicators">
        {data.map((item, index) => (
          <BannerIndicator
            key={index}
            index={index}
            active={index === activeIndex}
          />
        ))}
      </div>
      <div className="carousel-inner">
        {data.map((item, index) => (
          <BannerImage
            key={index}
            active={index === activeIndex}
            image={`http://localhost:5000/images/${item.pic_banner}`}
            title={item.judul_banner}
            description={item.deskripsi_banner}
          />
        ))}
      </div>
    </div>
  );
}

export default Banner;