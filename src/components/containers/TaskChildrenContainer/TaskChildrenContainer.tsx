import React from 'react';
import { TaskContainer } from '../TaskContainer/TaskContainer';
import cl from './TaskChildrenContainer.module.scss';

type TTaskChildrenContainerProps = {
    tasks: TTasksList;
};

export const TaskChildrenContainer = ({ tasks }: TTaskChildrenContainerProps) => {
    if (!tasks) return null;
    return (<ul className={cl.container}>
        {tasks.length > 0 && tasks.map((task) => <TaskContainer key={task.id} {...task} />)}
    </ul>)
}
