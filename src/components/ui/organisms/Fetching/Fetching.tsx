import { Skeleton } from '@mui/material';
import React from 'react';
import cl from './Fetching.module.scss';

export const Fetching = React.memo(() => <div className={cl.container}>
    <Skeleton animation="wave" />
    <Skeleton animation="wave" />
    <Skeleton animation="wave" />
    <Skeleton animation="wave" />
</div>)