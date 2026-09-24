import { use, useEffect, useState } from "react";

function App() {
  const [userData, setUserData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");
  const API = "http://localhost:3000/students";
  let [isadd, setIsAdd] = useState(true);
  const [id, setId] = useState(null);

  fetch(API, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then((res) => {
    res.json().then((data) => {
      setUserData(data);
    })
  });

  // useEffect(()=>{
  //   console.log("Changed")
  // },[userData]);

  const handleSubmit = (e) => {
    // e.preventDefault();
    const user = {
        name, email, age, course
      }
    if (isadd) {
      localStorage.setItem("id", null);
      fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });
    }else{
      fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });
    }

  }
  const handleDelete = (id) => {
    fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  const handleEdit = (element) => {
    setIsAdd(false);
    localStorage.setItem("id", element.id);
    setId(localStorage.getItem("id"));
    setName(element.name);
    setEmail(element.email);
    setAge(element.age);
    setCourse(element.course);
  }

  useEffect(() => {

  }, [id]);
  return (
    <>
      <div className="text-center">
        <h2>Add New Data</h2>
        <form>
          <input type="text" value={name} placeholder="Name" onChange={(e) => { setName(e.target.value) }} />
          <br />
          <input type="text" value={email} placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
          <br />
          <input type="number" value={age} placeholder="Age" onChange={(e) => { setAge(e.target.value) }} />
          <br />
          <input type="text" value={course} placeholder="Course" onChange={(e) => { setCourse(e.target.value) }} />
          <br />
          <button onClick={handleSubmit}>{(isadd) ? "Add" : "Edit"}</button>
        </form>
      </div>
      <div className="  p-4 m-3 row">
        {
          userData.map((element, index) => {
            return (
              <div className="   col-4 p-4" key={index}>
                <main className="shadow p-2 d-flex flex-column gap-2">
                  <h2 className=" text-primary">Roll No. : {index + 1}</h2>
                  <h3 className="fw-bold">Name : {element.name}</h3>
                  <p className="mb-2">
                    <strong>Email :</strong> {element.email}
                  </p>
                  <p className="mb-2">
                    <strong>Age :</strong> {element.age}
                  </p>
                  <p className="mb-0">
                    <strong>Course :</strong> {element.course}
                  </p>
                  <main className="container px-5">
                    <div className="d-flex justify-content-between">
                      <button className="bg-danger text-white border-0 p-2" onClick={() => { handleDelete(element.id) }}>Delete</button>
                      <button className="bg-black-50 border-0 p-2" onClick={() => { handleEdit(element) }}>Edit</button>
                    </div>
                  </main>
                </main>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default App
