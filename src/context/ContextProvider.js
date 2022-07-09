import React, {createContext, useContext, useEffect, useState} from 'react';

const StateContext = createContext(undefined, undefined);

const initialState = {
    chat : false,
    cart: false,
    userProfile: false,
    notification: false,
}

export const ContextProvider = ({children}) => {

    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setIsClicked] = useState(initialState);
    const [currentColor, setCurrentColor] = useState('#03C9D7')
    const [currentMode, setCurrentMode] = useState('Light')
    const [themeSettings, setThemeSettings] = useState(false)

    // Se cambia el modo del tema
    const setMode = (e) => {
        setCurrentMode(e.target.value);
        localStorage.setItem('themeMode', JSON.stringify(e.target.value))
        setThemeSettings(false)
    }

    // Se restaura el modo del tema en caso de estar en el almacenamiento local
    useEffect( () => {
        const themeMode = JSON.parse(localStorage.getItem('themeMode'))

        if(themeMode){
            setCurrentMode(themeMode)
        }
    }, [])


    //Se cambia el color del tema
    const setColor = (color) => {
        setCurrentColor(color);
        localStorage.setItem('colorMode', JSON.stringify(color))
        setThemeSettings(false)
    }

    //Se restaura el color del tema en caso de estar en el almacenamiento local
    useEffect(() => {
        const themeColor = JSON.parse(localStorage.getItem('colorMode'))
        if(themeColor){
            setCurrentColor(themeColor)
        }
    })

    const handleClick = (clickedElement) => {
        setIsClicked({ ...initialState, [clickedElement]: true });
    }

    // Estado para determinar el tamaño de la pantalla
    const [screenSize, setScreenSize] = useState(undefined)

    return (
        <StateContext.Provider
            value={{ 
                activeMenu,
                setActiveMenu,
                isClicked,
                setIsClicked,
                handleClick,
                screenSize,
                setScreenSize,
                currentColor, currentMode,
                setColor, setMode,
                themeSettings, setThemeSettings,
            }}
        >
            {children}

        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);