import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { selectURLVideo } from './../constants/config';
import axios from 'axios';


const Videos = (props) => {
    const [videoGallery, setVideoGallery] = useState({});

    const axiosInstance = axios.create({
        timeout: 15000
    });
    useEffect(() => {
        console.log('props.idFilm', props.idFilm);
        async function getVideos() {
            const url = selectURLVideo(props.idFilm)
            const response = await axiosInstance.get(url)
            console.log(response.data);
            setVideoGallery(response.data)

        }
        getVideos();

    }, [props.idFilm])
    return (
        <React.Fragment>
            {
                Array.isArray(videoGallery.results)
                &&
                <Row className="mt-3">
                    {
                        videoGallery.results.map((item) => {
                            return (
                                <Col key={item.id} xs={12} sm={12} md={12} lg={6} xl={4}>
                                    <iframe
                                        title="myFrame"
                                        width="400px"
                                        height="224px"
                                        src={`https://www.youtube.com/embed/${item.key}`} allowFullScreen>
                                    </iframe>
                                </Col>
                            )
                        })
                    }

                </Row>
            }
        </React.Fragment >
    )
}

export default Videos;