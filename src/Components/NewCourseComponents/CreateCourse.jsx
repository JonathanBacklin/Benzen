/*PETRAS*/
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CreateCourse = () => {

  
  axios.defaults.baseURL = "http://localhost:3001";

  const [submitMessage, setSubmitMessage] = useState(false); //då en kurs blir tillagd visas ett meddelande för agtt bekräfta detta
  const [teacher, setTeacher] = useState([]);

  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    length: "1",
    location: "distans",
    startDate: "",
    teacherId: "",
    points: "",
  });

  // Hanterar all input då kursen skapas. 
  //i else räknar vi ut antalet points för en kurs, baserat på antalet veckor vi angett under length
  function handleChange(e) {
    if (e.target.name != "length") {
      setCourseInfo((data) => ({
        ...data,
        [e.target.name]: e.target.value,
      }));
    } else {
      setCourseInfo((data) => ({
        ...data,
        [e.target.name]: e.target.value,
        points: e.target.value * 5,
      }));
    }
  }
  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post("/courses/createCourse", courseInfo)
      .then((res) => {
        setCourseInfo({
          name: "",
          description: "",
          length: "",
          location: "",
          startDate: "",
          teacherId: "",
          points: "",
        });
        console.log(res.data);
        setSubmitMessage(true);
      })
      .catch((err) => {
        console.log("Ojdå, kursen kunde inte skapas");
        console.log(err.message);
      });
  }


  //Hämtar all personal från Camerons sida vilka sedan mapas ut i en select i formet
  useEffect(async () => {
    const res = await axios.get("/personal/allPersonal");
    setTeacher(res.data);
  }, []);

  useEffect(async () => {
    console.log(teacher);
  }, [teacher]);

  return (
    <section className="course-container">
      <section className="course-specs">
        <div className="course-header">
          <h2>Lägg till ny kurs</h2>
          <Link to="/Kurser">
            <button type="button" className="go-back-btn course-btns">
              Tillbaka
            </button>
          </Link>
        </div>
        {submitMessage ? (
          <div className="submit-message">
            <h4>Kursen har blivit tillagd.</h4>
            <p>
              <Link to="/Kurser">Tillbaka till Kursöversikt</Link>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="add-course-form" noValidate>
            <label className="course-label" htmlFor="name">
              Kursnamn:
            </label>
            <input
              id="kurs"
              type="text"
              name="name"
              value={courseInfo.name}
              onChange={handleChange}
              className="course-input"
            />
            <label className="course-label" htmlFor="description">
              Kursbeskrivning:
            </label>
            <textarea
            id="kurs"
              rows={3}
              type="textarea"
              name="description"
              value={courseInfo.description}
              onChange={handleChange}
              className="course-input"
            />
            <label className="course-label" htmlFor="length">
              Kursens längd i veckor:
            </label>
            <select
             id="kurs"
              type="select"
              name="length"
              value={courseInfo.length}
              onChange={handleChange}
              className="course-input"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>

            <label htmlFor="points" className="course-label">
              Poäng = 5 per vecka
            </label>
            <p
            id="kurs"
              type=""
              name="points"
              className="points"
              value={courseInfo.points}
              onChange={handleChange}
            ></p>

            <label htmlFor="startDate" className="course-label">
              Kursstart:
            </label>
            <input
              id="kurs"
              type="date"
              min="2022-04-10"
              name="startDate"
              className="course-input"
              value={courseInfo.startDate}
              onChange={handleChange}
            ></input>

            <label htmlFor="location" className="course-label">
              Plats:
            </label>
            <select
              id="kurs"
              type="select"
              name="location"
              value={courseInfo.location}
              onChange={handleChange}
              className="course-input"
            >
              <option>Stockholm</option>
              <option>Göteborg</option>
              <option>Distans</option>
            </select>

            <label className="course-label" htmlFor="teacher">
              Kursens lärare
            </label>
            <select
             id="kurs"
              type="select"
              name="teacherId"
              className="course-input"
              value={courseInfo.teacherId}
              onChange={handleChange}
            >
              {teacher.map((teachers) => {
                return <option key={teacher._id}>{teachers.fName}</option>;
              })}
            </select>

            <button type="submit" className="add-course-btn course-btns">
              Skapa Kurs
            </button>
          </form>
        )}
      </section>
    </section>
  );
};
export default CreateCourse;
