import Header from "../Header/Header";
import Data from "../Data/Data";
import { taskPriority } from "../Data/Data";
import { useState } from "react";
import userEvent from "@testing-library/user-event";
import TodoTable from "../TodoTable/TodoTable";
import TodoForm from "../TodoForm/TodoForm";

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
       
      <TodoForm task={task} setTask={setTask} taskList ={taskList} settaskList={settaskList} titleStatus={titleStatus}  settitleStatus={settitleStatus}  priorityList={priorityList} setpriorityList={setpriorityList} priority={priority}
      setPriority={setPriority} priorityStatus = {priorityStatus} setpriorityStatus={setpriorityStatus}  addTask={addTask}
      />
      <TodoTable taskList={taskList} settaskList={ settaskList} taskStatus={taskStatus} settaskStatus={ settaskStatus} priorityList={priorityList} setpriorityList={setpriorityList} changeTaskStatus={changeTaskStatus}/>
      </div>
    </>
  );
}
