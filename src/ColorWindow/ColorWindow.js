import React, { useState } from "react";
import {Col, Row, Container, Image} from 'react-bootstrap'
import Color from "./Color";

import "./style.css";

function ColorWindow() {
    const [imageUrl, setImageUrl] = useState()
    const imageWidth = 300
    const imageHeight = 300
  return (
    <div>
        <Container fluid >
            <Row>
                <Col lg={4} style={{position:'relative'}}>
                    <input type={'file'} onChange={e => setImageUrl(URL.createObjectURL(e.target.files[0]))}/>
                  </Col>
                  <Col lg={8}>
                      <Color imageUrl={imageUrl} size={{x:imageWidth, y:imageWidth}} key={imageUrl}></Color>
                      <Image src={imageUrl} width={imageWidth} height={imageHeight} ></Image>
                  </Col>
            </Row>
        </Container>
    </div>
  );
}

export default ColorWindow
