import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasksListThunk } from '../../../redux/actions/tasksListActions';
import { AppStateType } from '../../../redux/redux';
import { Fetching } from '../../ui/organisms/Fetching/Fetching';
import { TaskContainer } from '../TaskContainer/TaskContainer';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import Button from '@mui/material/Button';
import { AddElement } from '../../ui/organisms/AddElement/AddElement';

export const TasksListContainer = () => {
    const [opened, setOpened] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTasksListThunk());
    }, [])
    const tasksList = useSelector((state: AppStateType) => state.tasksListReducer.tasksList);
    const isFetching = useSelector((state: AppStateType) => state.tasksListReducer.isFetching);
    if (isFetching) return <Fetching />
    return (
        <>
            <ul>
                {tasksList && tasksList.length > 0 && tasksList.map((task) => <TaskContainer key={task.id} {...task} />)}
            </ul>
            <Button variant="outlined" startIcon={<AddBoxOutlinedIcon />} onClick={() => setOpened(true)}>
                Добавить элемент
            </Button>
            <AddElement tasksList={tasksList} opened={opened} setOpened={setOpened} />
        </>
    )
}
