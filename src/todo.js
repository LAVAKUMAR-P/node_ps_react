import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import env from "./settings";

function Todo() {
    const [data, setdata] = useState([]);
    const [task,setTask]=useState("");
    let fetchData=async()=>{
      try {
        let appData = await axios.get(`${env.api}/list-all-to-do`,{
        headers : {
          "Authorization" : window.localStorage.getItem("app_token")
        }}
        )
        setdata([...appData.data]);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
    useEffect( () => {
     fetchData();
    }, []);
  
    let handleCreate=async()=>{
    try {
      let postData=await axios.post(`${env.api}/create-task`,{task})
      fetchData();
      setTask("")
    } catch (err) {
      alert(err);
    }
    }
    let handleDelete=async(id)=>{
      try {
        let deleteData=await axios.delete(`${env.api}/delete-task/${id}`)
        fetchData();
      } catch (err) {
        console.log(err);
      }
      }
  
    let handleChange=async(e,id)=>{
      try {
        let updateData =await axios.put(`${env.api}/update-task/${id}`,{status:e.target.checked})
        fetchData();
      } catch (err) {
        console.log(err);
      }
     
    }
    return (
        <>
      <h1>hi</h1>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
          <label> TASK </label><br/>
          <div class="input-group mb-3">
            <input type="text" class="form-control" value={task} onChange={e=>setTask(e.target.value)} placeholder="task........" aria-label="Recipient's username" aria-describedby="button-addon2"/>
           <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleCreate}>Button</button>
       </div>
            {data.map((obj) => {
              return (
                <div className="list-group">
                  <label className="list-group-item">
                    <input
                      className="form-check-input me-1"
                      type="checkbox"
                      value=""
                      checked={obj.status} 
                      onChange={(e)=>{handleChange(e,obj._id)}}
                    />
                    <span style={{textDecoration: obj.status? "line-through":""}}>{obj.task}</span>
                    <button type="button" onClick={()=>{handleDelete(obj._id)}} class="btn btn-danger ms-5">REMOVE</button>
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
    )
}

export default Todo
