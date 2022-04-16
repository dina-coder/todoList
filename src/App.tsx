import React from 'react';
import cl from './App.module.scss';
import { TasksListContainer } from './components/containers/TasksListContainer/TasksListContainer';

const App = () => {
    return (
        <div className={cl.container}>
            <TasksListContainer />
        </div>
    )
}

export default App;