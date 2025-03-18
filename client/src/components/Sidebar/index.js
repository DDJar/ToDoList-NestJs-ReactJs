import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import { ArrowDown01Icon, Task01Icon, UserIcon } from 'hugeicons-react';

const Sidebar = ({ sidebarOpen }) => {
    const location = useLocation();
    const { pathname } = location;

    const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
    const [sidebarExpanded, setSidebarExpanded] = useState(
        storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
    );

    return (
        <aside
            className={` left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-slate-900 duration-300 ease-linear lg:static lg:translate-x-0 text-white text-base ${
                sidebarOpen ? 'translate-x-0 block' : '-translate-x-full hidden'
            } `}
        >
            <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5 mt-5 ml-3">
                <NavLink to="/">
                    <img width={200} src="/logo.png" alt="Logo" />
                </NavLink>
            </div>

            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
                    <div>
                        <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">MENU</h3>

                        <ul className="mb-6 flex flex-col gap-1.5">
                            <>
                                <SidebarLinkGroup
                                    activeCondition={pathname === '/' || pathname.includes('dashboard/users')}
                                >
                                    {(handleClick, open) => {
                                        return (
                                            <React.Fragment>
                                                <NavLink
                                                    to="#"
                                                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark ${
                                                        (pathname === '/' || pathname.includes('dashboard/users')) &&
                                                        'bg-graydark '
                                                    }`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                                                    }}
                                                >
                                                    <UserIcon className="size-6" />
                                                    User
                                                    <ArrowDown01Icon
                                                        className={`absolute size-6 right-4 top-1/2 -translate-y-1/2 fill-current ${
                                                            open && 'rotate-180'
                                                        }`}
                                                    />
                                                </NavLink>
                                                {/* <!-- Dropdown Menu Start --> */}
                                                <div
                                                    className={`translate transform overflow-hidden ${!open && 'hidden'}`}
                                                >
                                                    <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                        <li>
                                                            <NavLink
                                                                to="/dashboards/users/view-list"
                                                                className={({ isActive }) =>
                                                                    'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                                    (isActive && '!text-white')
                                                                }
                                                            >
                                                                User management
                                                            </NavLink>
                                                        </li>
                                                        <li>
                                                            <NavLink
                                                                to="/dashboards/users/create"
                                                                className={({ isActive }) =>
                                                                    'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                                    (isActive && '!text-white')
                                                                }
                                                            >
                                                                Create user
                                                            </NavLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                                {/* <!-- Dropdown Menu End --> */}
                                            </React.Fragment>
                                        );
                                    }}
                                </SidebarLinkGroup>
                            </>
                            <>
                                <SidebarLinkGroup
                                    activeCondition={pathname === '/' || pathname.includes('dashboard/users')}
                                >
                                    {(handleClick, open) => {
                                        return (
                                            <React.Fragment>
                                                <NavLink
                                                    to="#"
                                                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark ${
                                                        (pathname === '/' || pathname.includes('dashboard/users')) &&
                                                        'bg-graydark '
                                                    }`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                                                    }}
                                                >
                                                    <Task01Icon className="size-6" />
                                                    Task
                                                    <ArrowDown01Icon
                                                        className={`absolute size-6 right-4 top-1/2 -translate-y-1/2 fill-current ${
                                                            open && 'rotate-180'
                                                        }`}
                                                    />
                                                </NavLink>
                                                {/* <!-- Dropdown Menu Start --> */}
                                                <div
                                                    className={`translate transform overflow-hidden ${!open && 'hidden'}`}
                                                >
                                                    <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                        <li>
                                                            <NavLink
                                                                to="/dashboards/task/view"
                                                                className={({ isActive }) =>
                                                                    'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                                    (isActive && '!text-white')
                                                                }
                                                            >
                                                                Task management
                                                            </NavLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                                {/* <!-- Dropdown Menu End --> */}
                                            </React.Fragment>
                                        );
                                    }}
                                </SidebarLinkGroup>
                            </>
                        </ul>
                    </div>
                </nav>
                {/* <!-- Sidebar Menu --> */}
            </div>
        </aside>
    );
};

export default Sidebar;
