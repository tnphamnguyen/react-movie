import React, { useState, useEffect } from 'react'
import { Container, Row, Button } from 'react-bootstrap'
import FilmListItem from './FilmListItem'
import axios from 'axios'
import { selectURL, menu } from './../constants/config'

const GenericFilmList = (props) => {
    const [filmList, setFilmList] = useState({})
    const [currentPage, setCurrentPage] = useState(1)
    const [oldTheme, setOldTheme] = useState('');

    const axiosInstance = axios.create({
        timeout: 15000
    });
const getCurrentLabel=()=>{
    for(let i=0; i<menu.length;i++){
        const theme= menu[i]
        console.log("theme",theme);
        
        if(props.currentTheme===theme.theme){
            return theme.label;
        }
    }
}
    useEffect(() => {
        // console.log('GenericFilmList', currentPage, props.currentTheme, oldTheme)
        setOldTheme(props.currentTheme)
        // console.log('oldTheme',oldTheme)
        async function getByTheme() {
            const url = selectURL(props.currentTheme)
            
            if (filmList.results) {
                if (oldTheme === props.currentTheme && currentPage>1) {
                    const response = await axiosInstance.get(url + 'page=' + currentPage)
                    const tmp = filmList.results;
                    const newResults = response.data.results
                    const newArr = tmp.concat(newResults)
                    // console.log(newArr.length)
                    setFilmList({
                        ...response.data,
                        results: newArr
                    })//affecter response à filmList
                } else {
                    setCurrentPage(1);
                    // console.log('current page',currentPage)
                    const response = await axiosInstance.get(url + 'page=1')
                    setFilmList(response.data)//affecter response à filmList
                }

            } else {
                const response = await axiosInstance.get(url + 'page=' + currentPage)
                setFilmList(response.data)
            }

        }
        getByTheme()


    }, [props.currentTheme, currentPage])
    return (
        <Container fluid className="mt-5 pt-3">
            <h2>{getCurrentLabel()}</h2>
            {
                Array.isArray(filmList.results) &&
                <React.Fragment>
                    <Row >
                        {
                            filmList.results.map((item, idx) => {
                                return <FilmListItem key={item.id} film={item} indexFilm={idx} />

                            })
                        }

                    </Row>
                    <Row className="my-3">
                        <Button  onClick={() => setCurrentPage(currentPage + 1)}
                            className="mr-auto ml-auto my-3" variant="outline-primary" size="lg">
                            Charger plus</Button>
                    </Row>
                </React.Fragment>
            }

        </Container>



    )
}
export default GenericFilmList;