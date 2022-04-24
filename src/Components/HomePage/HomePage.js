import { useEffect, useState } from "react";

const HomePage = () => {
  const [size, setSize] = useState(1);

  window.onscroll = function () {
    setSize(window.pageYOffset);
  };

  useEffect(() => {}, [size]);

  return (
    <div style={{ overflowX: "hidden" }}>
      <div className="homePage">
        {/* Header */}
        <header
          className="card grid text-center"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            top: "150px",
            padding: "80px",
            marginBottom: "55%",
            position: "relative",
            left: "10%",
            width: "80%",
            transform: `scale(${1 - size * 0.0005}) rotate(${
              0 - size * 0.0225
            }deg)`,
          }}
        >
          <span className="m-4">
            <img style={{ width: "80%" }} src="MTLlogo.png" alt="mainlogo" />
          </span>
          <span>
            <h1 style={{ color: "white", fontWeight: "bold" }}>
              MetaTech - Online Coding Academy
            </h1>
            <p
              style={{
                fontSize: "35px",
                background: "transparent",
                border: "none",
                boxShadow: "none",
                fontWeight: 600,
              }}
              className="card"
            >
              Learn and improve your coding skills and abillities with us! All
              you need to do is sign up!
              <br /> We will take care about the rest
              <br />
              <br />
              <button
                onClick={() => {
                  window.location.href = "/sign_up";
                }}
                className="benBtn benWhiteBtn autoMarg"
              >
                Join Us
              </button>
            </p>
          </span>
        </header>

        {/* Our Majors */}

        {/*<section className="card text-center" style={{background:'linear-gradient(280deg, rgba(221,11,215,1) 0%, rgba(168,81,249,1) 38%, rgba(92,171,255,1) 100%)'}}>*/}
        <section
          className="card text-center"
          style={{
            background: "rgba(255,255,255,0.25)",
            transform: `scale(${0.5 + size * 0.0005}) skewY(${
              -10 + size * 0.01
            }deg)`,
            marginBottom: "20%",
            maxWidth: "2000px",
          }}
        >
          <h3
            style={{
              color: "white",
              fontWeight: "bolder",
              fontSize: "550%",
              textShadow: "rgb(0,0,0, 0.5) 15px 15px 15px ",
            }}
          >
            Start Learning Now
          </h3>
          <hr />
          <div className=" homePage homeFlex">
            <p className="card cardItem">
              Java
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlWkibXFdfUB7h7FmKLmgwxe-__BdMPGNGDA&usqp=CAU"
                alt="JavaLogo"
              />
            </p>
            <p className="card cardItem">
              Python{" "}
              <img
                src="https://img.cppng.com/download/2020-06/7-2-python-logo-free-download-png.png"
                alt="PythonLogo"
              />
            </p>
            <p className="card cardItem">
              HTML
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/512px-HTML5_logo_and_wordmark.svg.png"
                alt="HTMLLogo"
              />
            </p>
            <p className="card cardItem">
              JS
              <img
                src="https://i2.wp.com/thebamboocode.com/wp-content/uploads/2016/03/js-logo.png?fit=500%2C500"
                alt="JavaScriptLogo"
              />
            </p>
            <p className="card cardItem">
              CSS
              <img
                src="https://cdn-icons-png.flaticon.com/512/919/919826.png"
                alt="CSSLogo"
              />
            </p>
            <p className="card cardItem">
              C/C++{" "}
              <img
                src="https://i.pinimg.com/originals/6e/46/e7/6e46e7dbe2bb73dacc055e5dbd85c3ad.png"
                alt="CCPPLogo"
              />
            </p>
            <p className="card cardItem">
              React.js{" "}
              <img
                src="https://i0.wp.com/www.primefaces.org/wp-content/uploads/2017/09/feature-react.png?ssl=1"
                alt="ReactJS"
              />
            </p>
          </div>
        </section>

        {/* Reviews and contact us */}
        <section
          id="about"
          style={{
            transform: `scale(${-0.3 + size * 0.0005})`,
            marginBottom: "10%",
          }}
        >
          <section>
            <h1
              style={{
                color: "white",
                fontWeight: "bolder",
                fontSize: "550%",
                textShadow: "rgb(0,0,0, 0.5) 15px 15px 15px ",
              }}
              className="text-center m-4"
            >
              Who are we?
            </h1>

            <div className="whoRwe text-center">
              <div
                className="card whoCard"
                style={{ backgroundColor: "rgba(255,255,255,0.6)" }}
              >
                <h3 style={{ fontSize: "70px" }}>We believe in PEOPLE</h3>
              </div>
              <div className="card whoCard">
                <img
                  style={{ maxHeight: "370px" }}
                  src="https://imageio.forbes.com/specials-images/imageserve/1135065843/0x0.jpg?format=jpg&crop=5472,3078,x0,y11,safe&width=1200"
                  alt="peoplelearning"
                />
              </div>
            </div>
            {/*  */}
          </section>
          <section>
            <div className="whoRwe text-center">
              <div className="card whoCard">
                <img
                  style={{ maxHeight: "380px" }}
                  src="https://metatechlearning.com/img/about2.jpg"
                  alt="ComputerPhoto"
                />
              </div>
              <div
                className="card whoCard"
                style={{ backgroundColor: "rgba(255,255,255,0.6)" }}
              >
                <h3 style={{ fontSize: "80px" }}>We are the FUTURE</h3>
              </div>
            </div>
            <div
              className="card whoCard "
              style={{
                backgroundColor: "rgba(255,255,255,0.6)",
                fontSize: "100px",
                fontWeight: "bold",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div>
                We are MetaTech {"     "}
                <img
                  style={{ width: "100px" }}
                  src="MetaIconColor.png"
                  alt="meta logo"
                />{" "}
              </div>
              {/*  */}
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
