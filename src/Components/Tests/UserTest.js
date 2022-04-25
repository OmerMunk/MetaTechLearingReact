import { useEffect, useState } from "react";
import axios from "axios";

const UserTest = () => {
  const [test, setTests] = useState([]);
  const [lastThreeTests, setLastThreeTest] = useState([]);
  const [showAllTest, setShowAllTest] = useState(true);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    axios
      .get("/api/test_by_student", {
        headers: { Authorization: "Token " + token },
      })
      .then((res) => {
        setTests(res.data);
        setLastThreeTest(res.data);
      });
  }, []);

  return (
    <div className="card">
      <h4>{!showAllTest ? "Your Tests:" : "Your Last 3 Tests:"}</h4>
      {!test && ""}

      {showAllTest &&
        test &&
        test.slice(0, 3).map((value, index) => {
          return (
            <div key={index}>
              {value.test_id.name} - {value.grade}
            </div>
          );
        })}

      {!showAllTest &&
        test &&
        test.map((value, index) => {
          return (
            <div key={index}>
              {value.test_id.name} - {value.grade}
            </div>
          );
        })}
      <a
        style={{ color: "rgb(35, 132, 250)", cursor: "pointer" }}
        onClick={() => setShowAllTest((prev) => !prev)}
      >
        {showAllTest ? "Show More" : "Show Less"}
      </a>

      {test.length === 0 && (
        <p>
          No tests yet!{" "}
          <a href="/test" style={{ color: "rgb(35, 132, 250)" }}>
            Let's do some
          </a>
        </p>
      )}
    </div>
  );
};

export default UserTest;
