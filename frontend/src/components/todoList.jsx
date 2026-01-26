import React, { useState, useEffect } from "react";
import TaskService from "../services/taskService";
import TaskItem from "./taskItem";

const TodoList = ( => {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => { loadTasks() }, []);
    
    const loadTasks = async () => {
        const response = await taskService.fetchTasks();
        setTasks(response.data);
    }

    const hendleAdd = async () => {
        e.preventDefault();
        if (!input) return;
        await taskService.addTask(input);
        loadTasks();
        setInput("");
    }
});
    

return (
    
    lanjutkan seiup telwind besok
)
    

