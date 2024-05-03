import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { getGenres } from '../components/TMDB/Fetch';

export default function SearchBar({ onSearch }) {
    const [localSearch, setLocalSearch] = useState('');
    const [localGenre, setLocalGenre] = useState(['0']);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            const fetchedGenres = await getGenres();
            setGenres([{ id: 0, name: 'All' }, ...fetchedGenres.data.genres]);
        };
    
        fetchGenres();
    }, []);


    const handleSearchChange = (event) => {
        setLocalSearch(event.target.value);
    };

    const handleGenreChange = (event) => {
        if (event.target.checked) {
            setLocalGenre([...localGenre, event.target.value]);
        } else {
            setLocalGenre(localGenre.filter(genre => genre !== event.target.value));
        }
    };
    
    const handleAllChange = (event) => {
        if (event.target.checked) {
            setLocalGenre(['0']);
        } else {
            setLocalGenre([]);
        }
    };

    const handleSearch = (event) => {
        event.preventDefault();
        onSearch(localSearch, localGenre);
    };

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <Form.Control
                            type="text"
                            placeholder="Search"
                            value={localSearch}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2" key={'all'}>
                        <Form.Check
                            type="checkbox"
                            id="0"
                            label="All"
                            value="0"
                            onChange={handleAllChange}
                            checked={localGenre.includes('0')}
                        />
                    </div>
                    {genres.map((genre) => (
                        genre.id !== 0 && (
                            <div className="col-md-2" key={genre.id}>
                                <Form.Check
                                    type="checkbox"
                                    id={genre.id}
                                    label={genre.name}
                                    value={genre.id.toString()}
                                    onChange={handleGenreChange}
                                    checked={localGenre.includes(genre.id.toString())}
                                    disabled={localGenre.includes('0')}
                                />
                            </div>
                        )
                    ))}
                </div>
            </div>
            <Form onSubmit={handleSearch}>
                <Button variant="outline-success" type="submit">
                    Search
                </Button>
            </Form>
        </div>
    );
}