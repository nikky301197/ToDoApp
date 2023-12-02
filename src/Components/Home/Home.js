import Header from "../Header/Header";
import Data from "../Data/Data";
import { taskPriority } from "../Data/Data";
import { useState } from "react";
import userEvent from "@testing-library/user-event";

export default function Home() {
  let [taskList, settaskList] = useState(Data);
  let [priorityList, setpriorityList] = useState(taskPriority);
  let [taskStatus, settaskStatus] = useState("Active");
  let [titleStatus, settitleStatus] = useState(false);
  let [priorityStatus , setpriorityStatus] = useState(false);
  let [task , setTask] = useState(null);
  let [priority , setPriority] = useState(null);
  let updateStatus = () => {};

  let changeTaskStatus = (task, tstatus) => {
    let index = taskList.findIndex((t1) => t1.title == task.title);
    let updatedTask = taskList[index];
    updatedTask.status = tstatus;
    taskList.splice(index, 1);
    settaskList([...taskList, updatedTask]);
  };

  let addTask = ()=>{
    console.log("priority:"+priorityStatus)
    console.log("title:"+ titleStatus)
    if(!priorityStatus && !titleStatus)
    {
      let createdDate = new Date();
      createdDate = createdDate.getDate()+"-"+(createdDate.getMonth()+1)+"-"+createdDate.getFullYear();
    
    let priorityId = priorityList.find((p) => p.priorityValue == priority).pid
    console.log(task);
    settaskList([...taskList , {title:task , createdDate ,  priorityId , status : 'Active'}])
    }
    else{
      alert(" please enter correct details  ")
    }

  };
  return (
    <>
      <Header />
      <div className="container">
        <div className="row mt-4 mb-4">
          <div className="col-md-6">
            <input
              onChange={(event) => {
                // console.log(event.target.value)
                setTask(event.target.value)
                let t1 = taskList.find(
                  (task) => task.title == event.target.value
                );
                if (t1) {
                  settitleStatus(true);
                } else {
                  settitleStatus(false);
                }
                // console.log(titleStatus);
              }}
              className="form-control"
              type="text"
              placeholder="Enter task title"
            />
            {titleStatus ? (
              <small className="text-danger">
                Task title is already present{" "}
              </small>
            ) : (
              " "
            )}
          </div>

          <div className="col-md-6">
            <select className="form-control"  onClick={(event)=>{
              console.log(event.target.value);
              setPriority(event.target.value)
              let selectedPriority= event.target.value;
              let priorityobj =  priorityList.find((p) => p.priorityValue == selectedPriority )
              if(priorityobj)
              {
                setpriorityStatus(false); 
              }
              else{
                setpriorityStatus(true); 
              }
              console.log(priorityStatus)
            }}>
              <option>select priority</option>
              {priorityList.map((priority) => (
                <option> {priority.priorityValue}</option>
              ))}
            </select>
            {priorityStatus ? <small className="text-danger">select any one  priority</small> :""}
          </div>
        </div>
        <div className="row mt-4 mb-4">
          <div className="col-md-12">
            <button className="btn btn-primary w-25" onClick={addTask}>Add</button>
          </div>
        </div>

        <button
          onClick={() => settaskStatus("Active")}
          disabled={taskStatus == "Active" ? true : false}
          className="btn btn-success mt-3 ml-2"
        >
          Active ({taskList.filter((task) => task.status == "Active").length})
        </button>
        <button
          onClick={() => settaskStatus("Deactive")}
          disabled={taskStatus == "Deactive" ? true : false}
          className="btn btn-danger mt-3 ml-2"
        >
          Deactive (
          {taskList.filter((task) => task.status == "Deactive").length})
        </button>
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Sno.</th>
              <th>Task</th>
              <th>Priority</th>
              <th>Created date </th>
              <th>Change task status </th>
              <th>Delete task</th>
            </tr>
          </thead>
          <tbody>
            {taskList
              .filter((task) => task.status == taskStatus)
              .sort((a, b) => a.priorityId - b.priorityId)
              .map((task, index) => (
                <tr
                  style={{
                    backgroundColor:
                      task.priorityId == 1
                        ? "red"
                        : task.priorityId == 2
                        ? "orange"
                        : "green",
                    color: "white",
                  }}
                >
                  <td>{index + 1}</td>
                  <td>{task.title}</td>
                  <td>
                    {
                      priorityList.find(
                        (priority) => priority.pid == task.priorityId
                      ).priorityValue
                    }
                  </td>
                  <td>{task.createdDate}</td>
                  <td>
                    {task.status == "Active" ? (
                      <button
                        className="btn btn-light"
                        onClick={() => {
                          changeTaskStatus(task, "Deactive");
                        }}
                      >
                        {" "}
                        Deactive{" "}
                      </button>
                    ) : (
                      <button
                        className="btn btn-light"
                        onClick={() => changeTaskStatus(task, "Active")}
                      >
                        {" "}
                        Active{" "}
                      </button>
                    )}{" "}
                  </td>
                  <td>
                    <button
                      className="btn btn-dark"
                      onClick={() => {
                        if (window.confirm("are you sure ?")) {
                          let index = taskList.findIndex(
                            (t1) => t1.title == task.title
                          );

                          taskList.splice(index, 1);
                          settaskList([...taskList]);
                        }
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
