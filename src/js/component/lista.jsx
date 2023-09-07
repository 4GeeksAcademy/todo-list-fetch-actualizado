import React, { useEffect, useState } from "react"


const urlBase = "https://playground.4geeks.com/apis/fake/todos/user/alex"

export const Note = () => {
    const [taskList, setTaskList] = useState([])
    const [task, setTask] = useState({})
    
    const getAllTasks = async() => {
        try{
            let response = await fetch(urlBase)
            let data = await response.json()
            
            if(response.ok){
                setTaskList(data)
            }

            if(response.status == 404){
                createNewUser()
            }

        }catch(error){
            console.log("error al traer los task")
        }
    }

    const createNewUser = async() =>{
        try {
            let response = await fetch(urlBase, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify([])
            })
            if(response.ok){
                getAllTasks()
            }
            
        } catch (error) {
            console.log("error al crear usuario")
        }
    }

    const handleChange = (event) =>{
        setTask({
            ...task,
            [event.target.name]:event.target.value
        })
    }

    const saveTask = async(event) =>{
        if(event.key == "Enter"){
            try {
                let response = await fetch(urlBase,{
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify([...taskList, task])
                    
                })
                console.log(response)
                if(response.ok){
                    getAllTasks()
                }
            } catch (error) {
                console.log("error guardar tareas")
            }
        }
    }

    const deleteTask = async(id) =>{
        let newTask = taskList.filter((item, index) => id != index)

        try {
            let response = await fetch(urlBase, {
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(newTask)
            })
            if(response.ok){
                getAllTasks()
            }
        } catch (error) {
            
        }
    }



    useEffect(()=>{
        getAllTasks()
    }, [])




    return(
        <>
            <input 
                placeholder="intruduce la tarea" 
                name="label" 
                value={task.label}
                onChange={handleChange}
                onKeyDown={saveTask}
            />
            


            <ul>
                {
                    taskList.map((item, index)=>{
                        return(
                            <li key={index} onClick={() =>deleteTask(index)}>{item.label}</li>
                        )
                    })
                    
                }
            </ul>
        
        </>


    )
}