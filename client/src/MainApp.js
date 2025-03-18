import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/layout';
import { Fragment } from 'react';
import ToastNotification from '~/components/Notification';

function MainApp() {
    return (
        <div className="App">
            <Routes>
                {publicRoutes.map((route, index) => {
                    let Layout = DefaultLayout;
                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }
                    const Page = route.component;

                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
            <ToastNotification />
        </div>
    );
}

export default MainApp;
