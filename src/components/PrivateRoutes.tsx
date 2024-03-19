import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from "react-router-dom";


export const PrivateRouteNoEconomist = () => {
    const currentUser = useSelector((state: any) => state.currentUser)
    const token = localStorage.getItem('.AuthToken')
    return (
        token && currentUser.role !== 'economist' ? <Outlet /> : <Navigate to='/' />
    )
}
export const PrivateRouteAdmin = () => {
    const currentUser = useSelector((state: any) => state.currentUser)
    const token = localStorage.getItem('.AuthToken')
    return (
        token && currentUser.role == 'administrator' ? <Outlet /> : <Navigate to='/' />
    )
}
export const PrivateRouteCoordinator = () => {
    const currentUser = useSelector((state: any) => state.currentUser)
    const token = localStorage.getItem('.AuthToken')
    return (
        token && currentUser.role == 'coordinator' ? <Outlet /> : <Navigate to='/' />
    )
}
export const PrivateRouteClerk = () => {
    const currentUser = useSelector((state: any) => state.currentUser)
    const token = localStorage.getItem('.AuthToken')
    return (
        token && currentUser.role == 'clerk' ? <Outlet /> : <Navigate to='/' />
    )
}
export const PrivateRouteExpert = () => {
    const currentUser = useSelector((state: any) => state.currentUser)
    const token = localStorage.getItem('.AuthToken')
    return (
        token && currentUser.role == 'expert' ? <Outlet /> : <Navigate to='/' />
    )
}
export const PrivateRouteEconomist = () => {
    const currentUser = useSelector((state: any) => state.currentUser)
    const token = localStorage.getItem('.AuthToken')
    return (
        token && currentUser.role == 'economist' ? <Outlet /> : <Navigate to='/' />
    )
}

export const PrivateRouteLoginPage = () => {
    const token = localStorage.getItem('.AuthToken')
    const currentUser = useSelector((state: any) => state.currentUser)
    return (
        // token ? currentUser.role == 'economist' ? <Navigate to='/projects-economist' /> : <Navigate to='/projects' /> : <Outlet />
        // token&&currentUser.role ? <Navigate to='/' /> : <Outlet />
        token ? <Navigate to='/' /> : <Outlet />
    )
}
export const PrivateRouteAdminCoordinator = () => {
    const currentUser = useSelector((state: any) => state.currentUser)
    const token = localStorage.getItem('.AuthToken')
    return (
        token && (currentUser.role == 'coordinator' || currentUser.role == 'administrator') ? <Outlet /> : <Navigate to='/' />
    )
}
export const PrivateRouteAllUsers = () => {
    const token = localStorage.getItem('.AuthToken')
    return (
        token ? <Outlet /> : <Navigate to='/' />
    )
}
export const PrivateRouteNotFound = () => {
    return (
       <Navigate to='/' />
    )
}

