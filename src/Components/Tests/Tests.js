import { useEffect, useState } from "react";
import axios from "axios";
import SingleTest from "./SingleTest";
import "./Tests.css";

const Tests = () => {
  const [tests, setTests] = useState([]);
  const [singleTest, setSingleTest] = useState({});
  const [showTestModal, setShowTestModal] = useState(false);

  const getTests = () => {
    axios.get("/api/test").then((response) => {
      setTests([response]);
    });
  };

  const displaySingleTest = (test) => {
    setSingleTest(test);
    setShowTestModal(true);
  };

  const closeModal = () => {
    setShowTestModal(false);
  };

  useEffect(() => {
    getTests();
  }, []);

  return (
    <div
      style={{ marginTop: "80px", marginBottom: "40%" }}
      className="test text-center "
    >
      <header>
        <h1>Test Yourself</h1>
        <p>We dare you to try! Enjoy :)</p>
        <hr />
      </header>
      <section
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: "column",
        }}
      >
        {tests === [] && <h1>Ben</h1>}
        {tests.length > 0 &&
          tests[0].data.map((value, index) => {
            return (
              <div
                onClick={() => displaySingleTest(value)}
                className="card"
                key={value.id}
                style={{ width: "400px" }}
              >
                <div>
                  {/* <Button
                  className="button_links"
                  onClick={() => displaySingleTest(value)}
                > */}
                  {value.name}
                  {/* </Button> */}
                </div>
                <br />
              </div>
            );
          })}

        {singleTest !== {} && (
          <SingleTest
            close={closeModal}
            show={showTestModal}
            singleTest={singleTest}
          />
        )}
      </section>
    </div>
  );
};

export default Tests;
