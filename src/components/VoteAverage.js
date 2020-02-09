import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as startEmpty } from '@fortawesome/free-regular-svg-icons';

const VoteAverage =(props)=>{
    const notes= []
    for(let i=1;i<=props.note;i++){
        notes.push(<FontAwesomeIcon color="yellow" icon={faStar} />)
    }
    for(let i=0;i<(10-props.note); i++){
        notes.push(<FontAwesomeIcon color="yellow" icon={startEmpty} />)
    }

    return(
        <React.Fragment>
            {
                notes
            }
        </React.Fragment>
    )
}

export default VoteAverage;