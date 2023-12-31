import React, {Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import {routeConfig} from '@/app/providers/router/config/routeConfig';

export const AppRouter = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                {Object.values(routeConfig).map(({element, path})=>(
                    <Route
                        key={path}
                        element={(<div className={'page-wrapper'}>{element}</div>)}
                        path={path}  />
                ))}
            </Routes>
        </Suspense>
    );
};

