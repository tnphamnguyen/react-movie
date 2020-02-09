import React, { useEffect, useState } from 'react';
import { IMAGE_WIDTH_1000, selectURLImg,IMAGE_HEIGHT_450 } from './../constants/config'
import axios from 'axios'
import { Row, Col, Image } from 'react-bootstrap';

const Gallery = (props) => {
    const [gallery, setGallery] = useState({});

    const axiosInstance = axios.create({
        timeout: 15000
    });
    useEffect(() => {
        console.log('props.idFilm', props.idFilm);
        async function getGallery() {
            const url = selectURLImg(props.idFilm)
            const response = await axiosInstance.get(url)
            // console.log(response.data);
            setGallery(response.data)

        }
        getGallery();

    },[props.idFilm])
    return (
        <React.Fragment>
            {
                Array.isArray(gallery.backdrops)
                &&
                <Row className="mt-3">

                    {

                        gallery.backdrops.map((img, idx) => {
                            return (
                                <Col key={idx} className="my-2" xs={12} sm={6} md={4} lg={3}>
                                    <Image
                                        className="img-fluid"
                                        src={`${IMAGE_WIDTH_1000}${img.file_path}`} />
                                </Col>
                            )
                        })
                    }

                </Row>
            }
            {
                Array.isArray(gallery.posters)
                &&
                <Row className="mt-3">

                    {

                        gallery.posters.map((img, idx) => {
                            return (
                                <Col key={idx} className="my-2" xs={12} sm={6} md={4} lg={3}>
                                    <Image 
                                        className="img-fluid"
                                        src={`${IMAGE_HEIGHT_450}${img.file_path}`} />
                                </Col>
                            )
                        })
                    }

                </Row>
            }
        </React.Fragment>
    )
}

export default Gallery;