import React, { useEffect } from 'react'
import { AiOutlineMenu } from 'react-icons/ai';
import { SiShopware } from 'react-icons/si';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import avatar from '../../data/avatar.jpg';
import { Cart, Chat, Notification, UserProfile } from '../';
import { useStateContext } from '../../context/ContextProvider';
import { NavButton} from '../';

const Navbar = () => {

  const { activeMenu, setActiveMenu, isClicked, setIsClicked, handleClick, screenSize, setScreenSize, currentColor } = useStateContext();

  // Se abre o cierra inicialmente la barra lateral dependiendo del tamaño del dispositivo.

  // Al principio se tiene como indefinido, y al cargar la página se determina su tamaño.
  useEffect(() => {
    
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  //Si el dispositivo tiene pantalla pequeña, se cierra la barra lateral.
  useEffect( () => {

    if (screenSize <= 900) {
      setActiveMenu(false);
    } else{
      setActiveMenu(true);
    }

  }, [screenSize]);



  return (
    <div className='flex justify-between p-2 md:mx-6 relative'>
      
      <NavButton 
        title='Menu'
        customFunc={ () =>  setActiveMenu( (prevActiveMenu) => !prevActiveMenu ) }
        color={currentColor}
        icon={<AiOutlineMenu />}
      />

      <div className='flex'>

        <NavButton 
          title='Cart'
          customFunc={ () =>  handleClick("cart") }
          color={currentColor}
          icon={<SiShopware />}
        />

        <NavButton 
          title='Chat'
          dotColor="#03C9D7"
          customFunc={ () =>  handleClick("chat") }
          color={currentColor}
          icon={<BsChatLeft />}
        />

        <NavButton 
          title='Notifications'
          dotColor="#03C9D7"
          customFunc={ () =>  handleClick("notification") }
          color={currentColor}
          icon={<RiNotification3Line />}
        />

        <TooltipComponent
          content="Profile"
          position="BottomCenter"
        >

          <div className='flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg'
            onClick={() => handleClick("userProfile")}
          >
            <img src={avatar} alt="avatar" className="rounded-full w-8 h-8" />

            <p>
              <span className='text-gray-400 text-14'>Hi, </span> {" "}
              <span className='text-gray-400 font-bold ml-1 text-14'>Carlos</span>
            </p>

            <MdKeyboardArrowDown 
              className='text-gray-400 text-14'
            />

          </div>

        </TooltipComponent>

        {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}

      </div>

    </div>
  )
}

export default Navbar