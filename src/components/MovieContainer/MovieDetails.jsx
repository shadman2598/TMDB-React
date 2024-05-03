import React from 'react';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ReactCardFlip from 'react-card-flip';

function MovieDetails({ movie }) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
                <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>
                        {movie.release_date.split('-')[0]} - {movie.genre_ids.join(', ')}
                    </Card.Text>
                    <Button variant="primary" onClick={handleClick}>Details</Button>
                </Card.Body>
            </Card>

            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>
                        {movie.overview}
                    </Card.Text>
                    <Button variant="primary" onClick={handleClick}>Back</Button>
                </Card.Body>
            </Card>
        </ReactCardFlip>
    );
}

export default MovieDetails;