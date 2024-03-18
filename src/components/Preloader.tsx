import React, { useState } from "react";
import { useSelector } from "react-redux";
import { PreloaderPops } from "../constants/interfaces";


const Preloader = () => {
    const loading = useSelector((state: any) => state)

    return (
        <div className={loading.loading ? 'pageLoader' :''}>
            <div />
        </div>
    )
}

export default Preloader
