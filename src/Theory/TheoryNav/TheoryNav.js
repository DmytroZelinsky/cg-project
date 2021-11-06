import Button from '@restart/ui/esm/Button';
import React, { useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
  } from "react-router-dom";
import {Col, Row, Container, Image} from 'react-bootstrap'
import FractalTheory from '../FractalTheory/FractalTheory';
import './TheoryNav.css'
import leftarrow from './leftarrow.png'

const TheoryNav = (props) => {
    let history = useHistory();
    useEffect(() => {
       console.log('main')
    }, [])
    return (
        <>
            <Container fluid>
                <Row >
                    <Col lg={12} style={{position:'relative'}}>
                    <Button className='backBtn' onClick={() => history.push('/')}><Image src={leftarrow} fluid></Image></Button>
                    <h1 style={{marginTop:'1rem'}}>Теоретичні відомості</h1>
                    </Col>
                    
                    <Col md={4}>
                        <Button className='navBtn' onClick={() => history.push('/theory/fractal')}>
                             Фрактали
                        </Button>
                     </Col>
                        
                    <Col md={4}>
                        <Button className='navBtn' onClick={() => history.push('/theory/color')}>
                            Змінна колірної схеми
                        </Button>
                    </Col>
                   <Col md={4}>
                       <Button className='navBtn' onClick={() => history.push('/theory/transformation')}>
                           Афінні перетворення
                       </Button>
                   </Col>
                </Row>
            </Container>
        </>
    )
}

export default TheoryNav
