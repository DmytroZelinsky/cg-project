import Button from '@restart/ui/esm/Button'
import React from 'react'
import { Link , useHistory} from 'react-router-dom'
import './Home.css'
const Home = () => {
    let history = useHistory();
        return (
        <>
            <Button className='helpBtn'><h2><b>?</b></h2></Button>
            <div className='btnContainer'>
                <Button className='btnMain' onClick={() => { history.push('/fractal') }}><h1>Фрактал Мандельборта</h1></Button>
                <Button className='btnMain'><h1>Колірні моделі: CMYK i HSL</h1></Button>
                <Button className='btnMain'><h1>Афінні перетворення</h1></Button>
            </div>
        </>
    )
}

export default Home
