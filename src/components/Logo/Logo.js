import React from 'react';
import brain from './brain.png';
import './Logo.css';
import Tilt from 'react-parallax-tilt';

const Logo = () => {
    return(
        <div className='ma4 mt0' style={{ width: '150px' }}>
            <Tilt>
                <div className='tilt br2 shadow-2 pa3'>
                    <img src={brain} alt='logo' style={{width: '100%'}} />
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;