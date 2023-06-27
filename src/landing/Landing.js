import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";

function Landing() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const id_login = location.state?.id_login; // Mengambil id_login dari state location
    if (id_login) {
      axios
        .get(`http://localhost:5000/api/dataSiswa?id_login=${id_login}`)
        .then((response) => {
          const filteredData = response.data.filter(
            (item) => item.id_login === id_login
          );
          setUserData(filteredData);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    } else {
      setLoading(false);
    }
  }, [location.state]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (userData.length === 0) {
    return <div>No data found</div>;
  }

  return (
    <>
      {userData.map((item) => (
      <div>
        <ScrollToTopOnMount />
        <div className="d-flex flex-column bg-white py-4">
            <h6 className="text-center px-5 mb-4" key={item.id}>
              {item.nama}
            </h6>
            <h6 className="text-center px-5 mb-4" key={item.id}>
              {item.kelas}
            </h6>
            <h6 className="text-center px-5 mb-4" key={item.id}>
              {item.umur}
            </h6>
            <h6 className="text-center px-5 mb-4" key={item.id}>
              {item.id_siswa}
            </h6>
          <div className="d-flex justify-content-center">
            <Link to="/products" className="btn btn-primary" replace>
              Browse products
            </Link>
          </div>
        </div>
        <h2 className="text-center mt-5 mb-5">Rekomendasi Kendaraan Dari BiduOto</h2>
        <div className="container pb-5 px-lg-5">
          {/* <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 px-md-5">
          {Array.from({ length: 1 }, (_, i) => {
            return <FeatureProduct key={i} />;
          })}
        </div> */}
        </div>
        <div className="d-flex flex-column bg-white py-4">
          <h6 className="text-center mb-3">Follow us on</h6>
          <div className="d-flex justify-content-center">
            <a href="!#" className="me-3">
              <FontAwesomeIcon icon={["fab", "facebook"]} size="1x" />
            </a>
            <a href="!#">
              <FontAwesomeIcon icon={["fab", "instagram"]} size="1x" />
            </a>
            <a href="!#" className="ms-3">
              <FontAwesomeIcon icon={["fab", "twitter"]} size="1x" />
            </a>
          </div>
        </div>
      </div>
      ))}
    </>
  );
}

export default Landing;
