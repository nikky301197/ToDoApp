export default function TodoForm({task , setTask ,taskList , settaskList , titleStatus , settitleStatus , priorityList , setpriorityList , priority ,setPriority , priorityStatus , setpriorityStatus , addTask})
{
    return<>
     <div className="row ">
          <div className="col-md-6 mt-4">
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

          <div className="col-md-6 mt-4">
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
        <div className="row mt-2 mb-4">
          <div className="col-md-12">
            <button className="btn  w-25" style={{border:"2px solid #4682B4" , color : "#4682B4" , fontWeight :"bold" , }}  onClick={addTask}>Add</button>
          </div>
        </div>
    </>
}