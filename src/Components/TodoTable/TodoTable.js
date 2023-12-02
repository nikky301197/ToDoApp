export default function TodoTable({taskStatus , settaskStatus ,taskList , settaskList , priorityList , setpriorityList , changeTaskStatus}){

    return <>
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
    </>
}