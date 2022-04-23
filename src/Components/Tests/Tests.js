import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import SingleTest from "./SingleTest";
import "./Tests.css";

const Tests = () => {
  const [tests, setTests] = useState([]);
  const [singleTest, setSingleTest] = useState({});
  const [showTestModal, setShowTestModal] = useState(false);

  const getTests = () => {
    axios.get("http://127.0.0.1:8000/api/test").then((response) => {
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
    <div className="test text-center ">
      <header>
        <h1>Test Yourself</h1>
        <p>We dare you to try! Enjoy :)</p>
        <hr />
      </header>
      {tests === [] && <h1>Ben</h1>}
      {tests.length > 0 &&
        tests[0].data.map((value, index) => {
          return (
            <div
              onClick={() => displaySingleTest(value)}
              className="card"
              key={value.id}
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
    </div>
  );
};

export default Tests;
