import React from 'react';
import { RiBubbleChartFill } from "react-icons/ri";
import { BsXCircle } from "react-icons/bs";
import { IoStatsChart } from "react-icons/io5";

import {
    FiHexagon
} from "react-icons/fi";


export const SidebarData = [

    {
        title: '',
        path: '',
        icon: <BsXCircle size={35}/>,
        cName: 'x-icon'
    },
    
    {
        title: '',
        path: '',
        icon: <FiHexagon size={45}/>,
        cName: 'icon'
    },

    {
        title: ' Dashboard',
        path: '',
        icon: <IoStatsChart size={18}/> ,
        cName: 'nav-text'
    },

    {
        title: ' Comparações avançadas',
        path: '/Comparacao',
        icon: <RiBubbleChartFill size={20}/> ,
        cName: 'nav-text'
    }
    


]