/*PETRAS*/
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UpdateCourse from "./UpdateCourse";
import CourseList from "./CourseList";
import {FaSortAlphaDown, FaPlus } from 'react-icons/fa';


export function DisplayCourses() {
  axios.defaults.baseURL = "http://localhost:3001/courses";

  const [courseInfo, setCourseInfo] = useState([]);
  const [id, setId] = useState("");
  const [update, setUpdate] = useState(false);
  const [collapse, setCollapse] = useState(false);


  // hämtar alla kurser från vår databas, från den angivna base url:en ovan
  useEffect(() => {
    axios
      .get("/showCourses")
      .then((res) => {
        console.log(res.data);
        setCourseInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [update]);


  // kopplad till vår uppdatera knapp i update-modal. sätter våra nya värden vid submit.
  const editHandler = (e) => {
    setId(e.target.name);
    setCollapse(true);
  };
  
  const updateHandler = () => {
    setUpdate(!update);
  };


  const closeHandler = () => {
    setId("");
    setCollapse(false);
  };


  const deleteCourse = (e) => { 
    axios.delete(`http://localhost:3001/courses/deleteCourse/${e.target.name}`);

    setCourseInfo((data) => {
      return data.filter((course) => course._id !== e.target.name);
    });
   
  };

  // Här har vi funktionen för att sortera våra kurser från a-ö. Används genom att trycka på sorteringsknappen som finns över alla kurser 
 const sortCourses = () => {
  axios
  .get("/showCourses")
  .then((res) => {
    setCourseInfo(res.data.sort((a, b) => a.name.localeCompare(b.name) ));
  }
  )};


  return (
    <section className="course-container">
    <section className="course-specs">
      <div className="course-header">
        <h2>Våra tillgängliga kurser</h2>
        <button  className="course-btns"  id="sort-courses" onClick={sortCourses}><FaSortAlphaDown/></button>
          <Link to="/skapa-kurs">
        <button type="button" className="add-new-course-btn course-btns">
            <FaPlus/>
        </button>
          </Link>
      </div>
      
      <section className="course-info">
        <ul className="course-list"> 
          {courseInfo.map((course) => (
            <CourseList
              key={course._id}
              course={course}
              editHandler={editHandler}
              deleteCourse={deleteCourse}
            />
          ))}
        </ul>
        </section>
      </section>

      
      {collapse ? (
       
          <UpdateCourse
            _id={id}
            closeHandler={closeHandler}
            updateHandler={updateHandler}
          />
       
      ) : (
        ""
      )}
    </section>
  );
}

export default DisplayCourses;
