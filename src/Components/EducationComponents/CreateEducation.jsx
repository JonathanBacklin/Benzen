/* Jontes */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../../css/Education.css'
import { Link } from 'react-router-dom'



const CreateEducation = () => {
  const [utbildningsledare,setUtbildningsledare] = useState([])
  const [kurser,setKurser] = useState([])
  // Usestates för att få ut data från api
  

  const [createdUtbildning, setCreatedUtbildning] = useState([{
    name: "",
    educationLeader:"",
    length:"",
    place:"",
    points:"",
    courses:[],
    description:"",
  }]);
  axios.defaults.baseURL = "http://localhost:3000/";

  // hämtar kurser från min endpoint i backend som hämtar ifrån Petras
 useEffect(async () => {
    await axios.get("education/AllCourses")
    .then((res) => {
      console.log(kurser)
      setKurser(res.data)})
  }, [])

  // hämtar personal från min endpoint i backend som hämtar ifrån Cameron

    useEffect(async () => {
        await axios.get("education/AllPersonal")
        .then((res) => {
          console.log(utbildningsledare)
          setUtbildningsledare(res.data)})
      }, [])
 // Console loggar allt när du skriver in i form
      useEffect(async() => {
        console.log(createdUtbildning)
    },[createdUtbildning])
    

    // Vid minsta förändring i inputs & selects så uppdateras värdet på createdUtbildning som sen hamnar i post request
      const onAnyChange = e => {
        setCreatedUtbildning((data) => ({
          ...data,
          [e.target.name]: e.target.value,
        }));  
      }


      // Vid submit görs en post request som skickar med datan inuti createdUtbildning och sen sätter värdena till ""
      const Submitted = e => {
          e.preventDefault()
          axios
          .post("/education/createEducation", createdUtbildning)
          .then((res) => {
            setCreatedUtbildning({
              name:"",
              educationLeader:"",
              length:"",
              place:"",
              points:"",
              courses:[],
              description:"",
            });
            console.log(res.data) })
            .catch((err) => {
                console.log(" Error");
                console.log(err.message);
              });
      }
  return (
    <>
    <div className="create-utbildning-background">
        <div className="">

          {/* När knappen längs ner klickas så körs onSubmit igång och post request sker */}
            <form onSubmit={Submitted} noValidate>
              <div className="create-utbildning-form-div">
                <div className="create-utbildning-header-div">
                <h1 className='header-h1'>Skapa Utbildning</h1>
                <Link to="/utbildningar" style={{color:'white'}}><button className="create-utbildning-back-button">X</button></Link>
                </div>
                <input type="text" name="name" value={createdUtbildning.name} onChange={onAnyChange} placeholder='Utbildningsnamn'/>
                {/* Mappar ut utbildningsledare */}
                <select value={createdUtbildning.educationLeader} name="educationLeader"  onChange={onAnyChange}>
                    <option  selected disabled>Välj Utbildningsledare..</option>
                {utbildningsledare.map(x => {return (<option key={x._id}>{x.fName} {x.lName} </option>)})}
                </select>
                <select name="length" value={createdUtbildning.length}
                onChange={onAnyChange}>
                    <option hidden></option>
                    <option disabled>Längd på utbildningen..</option>
                    <option value='1' >1 År</option>
                    <option value='2' >2 År</option>
                    <option value='3' >3 År</option>
                    <option value='4' >4 År</option>
                    <option value='5' >5 År</option>
                    <option value='6' >6 År</option>
                </select>
            <select value={createdUtbildning.place} name="place" onChange={onAnyChange}>
                <option selected disabled>Välj Plats..</option>
                <option>Stockholm</option>
                <option>Göteborg</option>
                <option>Distans</option>
            </select>
            <input type="number" name="points" id="" placeholder="Poäng" onChange={onAnyChange} />
            {/* Mappar ut kurser */}
            <select name="courses" onChange={onAnyChange} value={createdUtbildning.courses}>
              <option selected disabled>Välj Kurs..</option>
            {kurser.map(x => {return (<option key={x._id}>{x.name}</option>)})}</select>
            <textarea name="description" onChange={onAnyChange} value={createdUtbildning.description} type="text" placeholder='Beskrivning'/>
            <input type="submit" value="Skapa Utbildning"/>
            </div>
            </form>
        </div>
    </div>
    </>
  )
  }

export default CreateEducation