import { Checkbox, FormControlLabel, IconButton } from "@mui/material";
import React from "react";
import { TaskChildrenContainer } from "../TaskChildrenContainer/TaskChildrenContainer";
import cl from "./TaskContainer.module.scss";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useDispatch } from "react-redux";
import { deleteTask, doneTask } from "../../../redux/actions/tasksListActions";
import cn from 'classnames';

export const TaskContainer = ({ id, isDone, text, children }: TTask) => {
    const dispatch = useDispatch()
    const handleDeleteTask = (id: string) => {
        dispatch(deleteTask(id))
    }
    const handleDoneTask = (id: string) => {
        dispatch(doneTask(id))
    }
    return (
        <li className={cl.container}>
            <FormControlLabel
                className={cl.label}
                control={<Checkbox onChange={() => handleDoneTask(id)} checked={isDone} />}
                label={
                    <div className={cn(cl.row, isDone && cl.checked)}>
                        {text}
                        {isDone && <IconButton onClick={() => handleDeleteTask(id)}><DeleteOutlineOutlinedIcon /></IconButton>}
                    </div>
                }
            />

            {children && <TaskChildrenContainer tasks={children} />}
        </li>
    );
};
