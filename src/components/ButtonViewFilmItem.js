import React, { useState, useEffect } from 'react';
import { Button, Modal, Row, Col, Image, Badge, Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';
import { selectURLFilmDetail, IMAGE_HEIGHT_450, COLOR_TAB, COLORS_CODE } from './../constants/config'
import { getRandomOfArray } from './../utils/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import VoteAverage from './VoteAverage';
import Gallery from './Gallery';
import Casting from './Casting';
import Videos from './Videos';

const ButtonViewFilmItem = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const axiosInstance = axios.create({
        timeout: 15000
    });
    const [currentFilm, setCurrentFilm] = useState({});

    const getRandomColor = (arr) => {
        const rd = getRandomOfArray(arr)
        // console.log(rd)
        return rd;
    }
    const handleShow = async () => { //appel ajax par event
        // console.log('handleShow', props.film)
        const url = selectURLFilmDetail(props.film.id)
        //appel ajax ici pour récupérer le détail du film par id avant l'affichage du modal
        const response = await axiosInstance.get(url)
        setCurrentFilm(response.data)
        // console.log(response)
        setShow(true)


    };
    return (
        <React.Fragment>
            <Button variant="primary" onClick={handleShow}>Voir les détails</Button>
            <Modal dialogClassName="modal-90w" show={show} onHide={handleClose}>
                <Modal.Body className="modalBg">
                    <Tabs defaultActiveKey="info" id="uncontrolled-tab-example" variant="tabs">
                        <Tab eventKey="info" title="Informations">
                            <Row className="mt-3">
                                <Col className="mt-2" md={3} style={{ textAlign: 'center' }}>
                                    <Image
                                        className="imgPoster"
                                        fluid
                                        src={`${IMAGE_HEIGHT_450}${currentFilm.poster_path ? currentFilm.poster_path : currentFilm.backdrop_path}`} />

                                </Col>
                                <Col className="mt-2" md={9}>
                                    <h2> {currentFilm.title} <span><VoteAverage note={currentFilm.vote_average} /> </span></h2>
                                    <span >Statut : </span> {currentFilm.status} <br />
                                    <span> Date de sortie :</span> {moment(currentFilm.release_date, 'YYYY-MM-DD').format('DD/MM/YYYY')} <br />
                                    <span >Langue originale : </span> {currentFilm.original_language} <br />
                                    <span >Durée : </span> {currentFilm.runtime} minutes <br />
                                    <span >Budget : </span> {currentFilm.budget}$ <br />
                                    <span >Pays d’origine : </span>
                                    {
                                        Array.isArray(currentFilm.production_countries) &&
                                        <React.Fragment>
                                            {
                                                currentFilm.production_countries.map((pc) => {
                                                    return (
                                                        <React.Fragment>
                                                            <Badge pill style={{ backgroundColor: getRandomColor(COLORS_CODE) }}
                                                                className="mx-1 badgeSize" >
                                                                {pc.name}
                                                            </Badge>
                                                        </React.Fragment>
                                                    )
                                                })
                                            }
                                        </React.Fragment>
                                    }
                                    <h5>Synopsis</h5>
                                    <div className="text-justify">{currentFilm.overview}</div>
                                    <h5>Genres</h5>
                                    {
                                        Array.isArray(currentFilm.genres) &&
                                        <React.Fragment>
                                            {
                                                currentFilm.genres.map((g) => {
                                                    return (
                                                        <Badge
                                                            variant={getRandomColor(COLOR_TAB)}
                                                            className="mx-1 badgeSize" >
                                                            {g.name}
                                                        </Badge>
                                                    )
                                                })
                                            }
                                        </React.Fragment>
                                    }
                                </Col>
                            </Row>
                        </Tab>
                        <Tab eventKey="casting" title="Casting">
                            <Casting idFilm={currentFilm.id} />

                        </Tab>
                        <Tab eventKey="gallery" title="Galerie">
                            <Gallery idFilm={currentFilm.id} />

                        </Tab>

                        <Tab eventKey="videos" title="Vidéos">
                            <Videos idFilm={currentFilm.id} />

                        </Tab>
                    </Tabs>

                </Modal.Body>

                <Button className="buttonCloseModal" variant="secondary" onClick={handleClose}>
                    <FontAwesomeIcon icon={faTimes} />

                </Button>


            </Modal>
        </React.Fragment >
    )
}

export default ButtonViewFilmItem;