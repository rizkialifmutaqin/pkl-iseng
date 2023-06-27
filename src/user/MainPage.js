import React, { useState, useEffect } from "react";
import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom"; 
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";

// const iconPath =
//   "M18.571 7.221c0 0.201-0.145 0.391-0.29 0.536l-4.051 3.951 0.96 5.58c0.011 0.078 0.011 0.145 0.011 0.223 0 0.29-0.134 0.558-0.458 0.558-0.156 0-0.313-0.056-0.446-0.134l-5.011-2.634-5.011 2.634c-0.145 0.078-0.29 0.134-0.446 0.134-0.324 0-0.469-0.268-0.469-0.558 0-0.078 0.011-0.145 0.022-0.223l0.96-5.58-4.063-3.951c-0.134-0.145-0.279-0.335-0.279-0.536 0-0.335 0.346-0.469 0.625-0.513l5.603-0.815 2.511-5.078c0.1-0.212 0.29-0.458 0.547-0.458s0.446 0.246 0.547 0.458l2.511 5.078 5.603 0.815c0.268 0.045 0.625 0.179 0.625 0.513z";

function MainPage() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const id_login = location.state?.id_login;
    const storedUserData = JSON.parse(localStorage.getItem("userData"));

    const fetchData = () => {
      if (id_login) {
        axios
          .get(`http://localhost:5000/api/dataSiswa?id_login=${id_login}`)
          .then((response) => {
            const filteredData = response.data.filter(
              (item) => item.id_login === id_login
            );
            setUserData(filteredData);
            setLoading(false);
            localStorage.setItem("userData", JSON.stringify(filteredData));
          })
          .catch((err) => console.error(err));
      } else if (storedUserData) {
        setUserData(storedUserData);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    const timeout = setTimeout(fetchData, 500); // Delay data fetching for 2 seconds

    return () => clearTimeout(timeout); // Clear the timeout if component unmounts

  }, [location.state]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (userData.length === 0) {
    return <div style={{ textAlign: 'center' }}>No data found</div>;
  }

  return (
    <>
    {userData.map((item) => (
    <div className="container mt-5 py-4 px-xl-5">
      <ScrollToTopOnMount />
      {/* <nav aria-label="breadcrumb" className="bg-custom-light rounded mb-4">
        <ol className="breadcrumb p-3">
          <li className="breadcrumb-item">
            <Link className="text-decoration-none link-secondary" to="/products">
              All Prodcuts
            </Link>
          </li>
          <li className="breadcrumb-item">
            <a className="text-decoration-none link-secondary" href="!#">
              Cases &amp; Covers
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Nillkin iPhone X cover
          </li>
        </ol>
      </nav> */}
      <div className="row mb-4">
        {/* <div className="d-none d-lg-block col-lg-1">
          <div className="image-vertical-scroller">
            <div className="d-flex flex-column">
              {Array.from({ length: 5 }, (_, i) => {
                let selected = i !== 1 ? "opacity-6" : "";
                return (
                  <a key={i} href="!#">
                    <img
                      className={"rounded mb-2 ratio " + selected}
                      alt=""
                      src={Image}
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div> */}
        <div className="col-lg-6">
          <div className="row">
            <div className="col-12 mb-4">
                <img
                  className="border rounded ratio ratio-1x1"
                  alt=""
                  src={`http://localhost:5000/images/${item.pic_siswa}`}
                  // style={{width: 400}}
                />
            </div>
          </div>

          {/* <div className="row mt-2">
            <div className="col-12">
              <div
                className="d-flex flex-nowrap"
                style={{ overflowX: "scroll" }}
              >
                {Array.from({ length: 8 }, (_, i) => {
                  return (
                    <a key={i} href="!#">
                      <img
                        className="cover rounded mb-2 me-2"
                        width="70"
                        height="70"
                        alt=""
                        src={Image}
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </div> */}
        </div>

        <div className="col-lg-5">
          <div className="d-flex flex-column h-100">
            <h2 className="mb-2">{item.nama}</h2>
            <h5 className="text-muted mb-4">NIS : 10000 Ks</h5>

            {/* <div className="row g-3 mb-4">
              <div className="col">
                <button className="btn btn-outline-dark py-2 w-100">
                  Add to cart
                </button>
              </div>
              <div className="col">
                <button className="btn btn-dark py-2 w-100">Buy now</button>
              </div>
            </div> */}

            <h5 className="mb-0">Details</h5>
            <hr />
            <dl className="row">
              <dt className="col-sm-4">Kelas</dt>
              <dd className="col-sm-8 mb-3">{item.kelas}</dd>

              <dt className="col-sm-4">Jurusan</dt>
              <dd className="col-sm-8 mb-3">{item.jurusan}</dd>

              <dt className="col-sm-4">Umur</dt>
              <dd className="col-sm-8 mb-3">{item.umur}</dd>

              <dt className="col-sm-4"></dt>
              <dd className="col-sm-8 mb-3"></dd>

              <dt className="col-sm-4"></dt>
              <dd className="col-sm-8 mb-3"></dd>

              <dt className="col-sm-4"></dt>
              <dd className="col-sm-8 mb-3"></dd>

              <dt className="col-sm-4"></dt>
              <dd className="col-sm-8 mb-3"></dd>

              {/* <dt className="col-sm-4">Rating</dt>
              <dd className="col-sm-8 mb-3">
                <Ratings
                  rating={4.5}
                  widgetRatedColors="rgb(253, 204, 13)"
                  changeRating={changeRating}
                  widgetSpacings="2px"
                >
                  {Array.from({ length: 5 }, (_, i) => {
                    return (
                      <Ratings.Widget
                        key={i}
                        widgetDimension="20px"
                        svgIconViewBox="0 0 19 20"
                        svgIconPath={iconPath}
                        widgetHoverColor="rgb(253, 204, 13)"
                      />
                    );
                  })}
                </Ratings>
              </dd> */}
            </dl>

            <h5 className="mb-0">Description</h5>
            <hr />
            <p className="lead flex-shrink-0">
              <small>
                Nature (TPU case) use environmental non-toxic TPU, silky smooth
                and ultrathin. Glittering and translucent, arbitrary rue
                reserved volume button cutouts, easy to operate. Side frosted
                texture anti-slipping, details show its concern; transparent
                frosted logo shows its taste. The release of self, the flavor of
                life. Nillkin launched Nature transparent soft cover, only to
                retain the original phone style. Subverting tradition,
                redefinition. Thinner design Environmental texture better hand
                feeling.
              </small>
            </p>
          </div>
        </div>
      </div>

      {/* <div className="row">
        <div className="col-md-12 mb-4">
          <hr />
          <h4 className="text-muted my-4">Related products</h4>
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
            {Array.from({ length: 4 }, (_, i) => {
              return (
                <RelatedProduct key={i} percentOff={i % 2 === 0 ? 15 : null} />
              );
            })}
          </div>
        </div>
      </div> */}
    </div>
    ))
    }
    </>
  );
}

export default MainPage;
