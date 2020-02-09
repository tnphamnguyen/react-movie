import React from 'react'
import { Col, Card } from 'react-bootstrap'
import { LIMIT_LENGTH_OVERVIEWS, LIMIT_LENGTH_TITLE, IMAGE_WIDTH_500 } from './../constants/config'
import { limitLength } from './../utils/index'
import ButtonViewFilmItem from './ButtonViewFilmItem'

const FilmListItem = (props) => {
    return (
        <React.Fragment>
            <Col xs={12} sm={6} md={4} lg={3}>
                <Card className="my-3">
                    <Card.Img 
                        className="img-fluid"
                        variant="top"
                        src={`${IMAGE_WIDTH_500}${props.film.backdrop_path ? props.film.backdrop_path : props.film.poster_path}`} />
                    <Card.Body>
                        <Card.Title className="cardTitle">{limitLength(props.film.title, LIMIT_LENGTH_TITLE)}</Card.Title>
                        <Card.Text className="text-justify cardText">
                            {limitLength(props.film.overview, LIMIT_LENGTH_OVERVIEWS)}
                        </Card.Text>
                        <ButtonViewFilmItem film={props.film} />

                    </Card.Body>
                </Card>
            </Col>

        </React.Fragment>
    )
}
export default FilmListItem