import React from 'react'
import { useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@restart/ui/esm/Button';
import Fractal from '../Fractal/Fractal';
import { useHistory } from 'react-router-dom'

const FractalWindow = () => {
    const [colorMode, setColorMode] = useState('black')
    const [scale, setScale] = useState(6)
    let history = useHistory();
    return (
        <>
            <Container fluid >
                <Row>
                    <Col lg={4} style={{position:'relative'}}>
                        <Button className='helpBtn' onClick={() => history.push('/theory/fractal')}><h2><b>?</b></h2></Button>
                        <h1>Фрактал Мандельборта</h1>
                        <h4>Вибір кольору фракталу</h4>
                        <Button className='modeBtn blackModeBtn' onClick={() => setColorMode('black')}>
                            
                        </Button>
                        <Button className='modeBtn whiteModeBtn' onClick={() => setColorMode('white')}>
                            
                        </Button>
                        <Button className='modeBtn rainbowModeBtn' onClick={() => setColorMode('rainbow')}>
                            
                        </Button>
                       
                    </Col>
                    <Col lg={8}  id ='fractalContainer' onDoubleClick={() => setScale(prev => (prev - 2) < 2? 6: prev-2)}>
                        
                    </Col>
                </Row>
                
            </Container>
            <Fractal colorMode={colorMode} scale={scale} key={scale}/>
        </>
    )
}

export default FractalWindow
