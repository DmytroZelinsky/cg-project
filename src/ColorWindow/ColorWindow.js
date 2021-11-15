import React, { useState, useRef } from "react";
import {Col, Row, Container, Image, OverlayTrigger, Tooltip, Form} from 'react-bootstrap'
import Color from "./Color";
import leftarrow from '../Theory/TheoryNav/leftarrow.png'
import defaultImage from '../ColorWindow/Alvin_and_the_Chipmunks.jpg'
import Button from '@restart/ui/esm/Button';
import { useHistory } from 'react-router-dom'
import "./style.css";

function ColorWindow() {
    const history = useHistory()
    const [imageUrl, setImageUrl] = useState(defaultImage)
    const [range, setRange] = useState()
    const [colorType, setColorType] = useState()
    const colorRef = useRef()
    const imageWidth = 400
    const imageHeight = 400

  return (
    <div>
        <Container fluid >
            <Row>
                <Col lg={4} style={{position:'relative'}}>
                    <Button className='backBtn' onClick={() => history.push('/')}>
                      <Image src={leftarrow} fluid>
                      </Image>
                    </Button>
                    <OverlayTrigger
                        placement='right'
                        overlay={<Tooltip> CMYK - субтрактивна модель, вона використовується для підготовки не екранних, а друкованих зображень, тобто для пристроїв, які реалізують принцип поглинання (віднімання) кольорів. Для зміни світлості зображення використовуйте повзунок "Світлота по сірому". Розширенням колірної моделі HSV/HSB є HLS. Параметрами якої є Hue, Lightness, Saturation, відповідно: кольоровий тон, кількість світла(освітленість), насиченість. </Tooltip>}>
                        <Button className='helpBtn' onClick={() => history.push('/theory/color')}><h2><b>?</b></h2>
                        </Button>
                    </OverlayTrigger>
                    <h1>Колірні моделі: CMYK та HSL</h1>
                    <h4>Світлота по сірому кольору</h4>
                    <Form.Range className='greyRangeSlider' min={0} max={100} step={2} defaultValue={0} onChange={(e) => setRange(e.target.value)}/>
                    <Form.Check className={'radioBtn'} name={'group-1'}type={'radio'} onChange={() => setColorType('HSL')} label={<h4>HSL</h4>}/>
                    <Form.Check className={'radioBtn'} name={'group-1'}type={'radio'} onChange={() => setColorType('CMYK')} label={<h4>CMYK</h4>}/>

                    <Form.Control size='lg' className='modeBtn' type='file'onChange={e => setImageUrl(URL.createObjectURL(e.target.files[0]))}/>
                    <Button className='modeBtn' onClick={() => colorRef.current.save()}>
                        Завантажити картинку
                    </Button>
                </Col>
                <Col lg={8}>
                    <Row>
                      <Col>
                          <Color ref={colorRef} imageUrl={imageUrl} size={{x:imageWidth, y:imageWidth}} key={imageUrl} range={range} colorType={colorType}></Color>
                      </Col>
                      <Col>
                          <Image src={imageUrl} width={imageWidth} height={imageHeight} ></Image>
                      </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    </div>
  );
}

export default ColorWindow
