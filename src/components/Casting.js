import React, { useEffect, useState } from 'react';
import {selectURLCasting, IMAGE_HEIGHT_175 } from './../constants/config'
import axios from 'axios'
import { Row, Col, Card } from 'react-bootstrap';

const Casting = (props) => {
    const [castingGallery, setCastingGallery] = useState({});

    const axiosInstance = axios.create({
        timeout: 15000
    });
    useEffect(() => {
        console.log('props.idFilm', props.idFilm);
        async function getCasting() {
            const url = selectURLCasting(props.idFilm)
            const response = await axiosInstance.get(url)
            // console.log(response.data);
            setCastingGallery(response.data)

        }
        getCasting();

    }, [props.idFilm])
    return (
        <React.Fragment>
            <h3 className="my-3">Casting </h3>
            {
                Array.isArray(castingGallery.cast)
                &&
                <Row>
                    {
                        castingGallery.cast.map((item) => {
                            return (
                                <Col xs={12} sm={6} md={4} lg={2}>
                                    <Card className="mb-3">
                                        <Card.Img alt="No image"
                                            className="img-fluid"
                                            variant="top"
                                            src={`${IMAGE_HEIGHT_175}${item.profile_path}`} />
                                        <Card.Body>
                                            <Card.Title className="cardTitle"> {item.name}</Card.Title>
                                            <Card.Text className="text-justify cardTitle">
                                                {item.character}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>

                                </Col>
                            )
                        })
                    }

                </Row>
            }
            <h3 className="my-3">Production </h3>
            {
                Array.isArray(castingGallery.crew)
                &&
                <Row>
                    {
                        castingGallery.crew.map((item) => {
                            return (
                                <Col xs={12} sm={6} md={4} lg={2}>
                                    <Card className="mb-3">
                                        <Card.Img alt="No image"
                                            className="img-fluid"
                                            variant="top"
                                            src={`${IMAGE_HEIGHT_175}${item.profile_path}`} />
                                        <Card.Body>
                                            <Card.Title className="cardTitle"> {item.name}</Card.Title>
                                            <Card.Text className="text-justify cardTitle">
                                                {item.job}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>

                                </Col>
                            )
                        })
                    }

                </Row>
            }
        </React.Fragment>
    )
}

export default Casting;