import React from 'react';
import MovieDetails from './MovieDetails';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function MovieContainer({ movies }) {
    return (
        <Row>
            {movies.map((movie, index) => (
                <Col xs={12} md={4} key={index}>
                    <MovieDetails movie={movie} />
                </Col>
            ))}
        </Row>
    );
}