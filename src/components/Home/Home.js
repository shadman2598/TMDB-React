import { useEffect, useState } from "react";
import SearchBar from "../SearchBar";
import { getMovies, getDefaultMovies } from '../TMDB/Fetch';
import MovieContainer from "../MovieContainer/MovieContainer";
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';

export default function Home(props) {
    const [search, setSearch] = useState('');
    const [genres, setGenres] = useState([]);
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchMovies();
    }, [page, search, genres]);

    const fetchMovies = async () => {
        setLoading(true);
        let fetchedMovies;
        if (search || genres || page > 1) {
            fetchedMovies = await getMovies(search, genres, page);
        } else {
            fetchedMovies = await getDefaultMovies();
        }
        setMovies(fetchedMovies.data.results);
        setTotalPages(fetchedMovies.data.total_pages);
        setLoading(false);
    }

    const handleSearch = (newSearch, newGenre) => {
        setSearch(newSearch);
        setGenres(newGenre);
        setPage(1);
    };

    const handleSelect = (pageNumber) => {
        setPage(pageNumber);
    };

    return (
        <>
            <SearchBar onSearch={handleSearch} />
            {loading ? (
                <Spinner animation="border" role="output">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            ) : (
                <>
                    <Pagination>
                        <Pagination.First onClick={() => handleSelect(1)} disabled={page === 1} />
                        <Pagination.Prev onClick={() => handleSelect(page - 1)} disabled={page === 1} />
                        {page > 1 && <Pagination.Item onClick={() => handleSelect(page - 1)}>{page - 1}</Pagination.Item>}
                        <Pagination.Item active>{page}</Pagination.Item>
                        {page < totalPages && <Pagination.Item onClick={() => handleSelect(page + 1)}>{page + 1}</Pagination.Item>}
                        <Pagination.Next onClick={() => handleSelect(page + 1)} disabled={page === totalPages} />
                        <Pagination.Last onClick={() => handleSelect(totalPages)} disabled={page === totalPages} />
                    </Pagination>
                    <MovieContainer movies={movies} />
                </>
            )}
        </>
    );
}