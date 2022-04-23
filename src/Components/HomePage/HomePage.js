import { height } from "dom-helpers";
import { Form } from "react-bootstrap";

const HomePage = () => {
  return (
    <div className="homePage">
      {/* Header */}
      <header
        className="card grid text-center"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          // margin: "auto",
          position: "relative",
        }}
      >
        <span>
          <h1 style={{ color: "white", fontWeight: "bold" }}>
            MetaTech - Online Future Academy
          </h1>
          <p className="card">
            We are teaching you to be the best We are teaching you to be the
            bestWe are teaching you to be the bestWe are teaching you to be the
            best
            <button className="benBtn autoMarg">Join Us</button>
          </p>
        </span>
        <span className="m-4">
          <img style={{ width: "60%" }} src="MTLlogo.png" alt="mainlogo" />
        </span>
      </header>

      {/* Our Majors */}

      <section className="card text-center">
        <h3 style={{ fontWeight: "bold" }}>What is your favourite?</h3>
        <hr />
        <div className=" homePage homeFlex">
          <p className="card cardItem">
            Java
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlWkibXFdfUB7h7FmKLmgwxe-__BdMPGNGDA&usqp=CAU" />
          </p>
          <p className="card cardItem">
            Python{" "}
            <img src="https://img.cppng.com/download/2020-06/7-2-python-logo-free-download-png.png" />
          </p>
          <p className="card cardItem">
            HTML
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/512px-HTML5_logo_and_wordmark.svg.png" />
          </p>
          <p className="card cardItem">
            JS
            <img src="https://i2.wp.com/thebamboocode.com/wp-content/uploads/2016/03/js-logo.png?fit=500%2C500" />
          </p>
          <p className="card cardItem">
            CSS
            <img src="https://cdn-icons-png.flaticon.com/512/919/919826.png" />
          </p>
          <p className="card cardItem">
            C/C++{" "}
            <img src="https://i.pinimg.com/originals/6e/46/e7/6e46e7dbe2bb73dacc055e5dbd85c3ad.png" />
          </p>
          <p className="card cardItem">
            React.js{" "}
            <img src="https://i0.wp.com/www.primefaces.org/wp-content/uploads/2017/09/feature-react.png?ssl=1" />
          </p>
        </div>
      </section>

      {/* Reviews and contact us */}

      <section>
        <h1
          style={{ color: "white", fontWeight: "bolder" }}
          className="text-center m-4"
        >
          Who are we?
        </h1>

        <div className="whoRwe text-center">
          <div className="card whoCard">
            <h3>We belive in people</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum vel tortor molestie, consectetur magna vitae, accumsan
              purus. Vivamus quis enim urna. Praesent lacinia tincidunt egestas.
              Ut luctus malesuada consectetur. Quisque non aliquam dui. Morbi
              sed efficitur libero. Nam accumsan justo in volutpat congue.
              Aenean diam lacus, posuere ac vehicula et, tristique ut velit.
              Duis sed mauris elit. Donec non pharetra tortor, quis lacinia ex.
              Sed posuere iaculis elit, ut tempor neque fermentum molestie.
              Mauris vulputate pharetra dolor eget condimentum. Sed auctor est
              ligula, in efficitur est iaculis nec. Interdum et malesuada fames
              ac ante ipsum primis in faucibus. Nulla id elit egestas, mattis
              erat vitae, efficitur turpis.
            </p>
          </div>
          <div className="card whoCard">
            <img
              style={{ maxHeight: "370px" }}
              src="https://imageio.forbes.com/specials-images/imageserve/1135065843/0x0.jpg?format=jpg&crop=5472,3078,x0,y11,safe&width=1200"
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
            />
          </div>
          <div className="card whoCard">
            <h3>We believe in the future</h3>
            <p>
              Morbi lacinia ultrices ante, et vehicula nisl. Mauris sit amet
              quam id enim placerat consectetur ac et metus. Etiam id enim
              sagittis est posuere ullamcorper a nec augue. Pellentesque quis
              massa a nunc auctor tempor sit amet eget lacus. Donec porta, eros
              congue lobortis commodo, est erat dapibus eros, a tempor ex arcu
              in odio. Aenean dapibus pharetra nisi, sit amet faucibus mauris
              dictum in. Nunc porta justo vitae interdum consectetur. In dolor
              nulla, tempus sit amet velit vitae, ullamcorper blandit sapien.
            </p>
          </div>
        </div>
      </section>
      <footer>
        <div className="footer card">
          <img style={{ width: "30%" }} src="MTLlogo.png" />
          <ul>
            <li>
              <a href="/">Carrers</a>
            </li>
            <li>
              <a href="/">Contact Us</a>
            </li>
            <li>
              <a href="/">Hey</a>
            </li>
          </ul>
        </div>
      </footer>
      <h5 className="text-center" style={{ color: "white" }}>
        This Web-Application was built and designed by Omer Munk and Ben Buaron,
        MetaTech CEO's and Co-Founders
      </h5>
    </div>
  );
};

export default HomePage;
