import React, { createContext, useCallback } from "react";
import {useNavigate} from 'react-router-dom'

import AppContext from './AppContext'

import {getRandom} from '../Util'

const BuyerInteractContext = createContext(null)

function BuyerInteractContextProvider({children}){
    const navigate = useNavigate()

    const {isReceived, setIsReceived} = useState(false)

    //Interact methods
    const confirmReceive = useCallback ( () => {

    }, [])

    const notifyTimeout = useCallback ( () => {

    }, [])
    

}