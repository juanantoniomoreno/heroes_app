
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

import { useForm } from "../../hooks/useForm"
import { HeroCard } from "../components"
import { getHeroesByName } from "../helpers";

export const SearchPage = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const { q = ''} = queryString.parse( location.search );
    const heroes = getHeroesByName(q);  

    const showSearch = (q.length === 0);
    const showError  = q.length > 0 && heroes.length <= 0;

    const { searchText, onInputChange } = useForm({
        searchText: q
    });    

    const onSearchSubmint = (event) => {
        event.preventDefault();

        // if (searchText.trim().length <= 1) return;

        navigate(`?q=${ searchText }`);
    }

    return (
        <>
            <h1>Search</h1>  
            <hr />

            <div className="row">
                <div className="col-5">
                    <h4>Searching</h4>
                    <hr />
                    <form onSubmit={onSearchSubmint}>
                        <input 
                            type="text" 
                            name="searchText" 
                            placeholder='Search a heroe' 
                            autoComplete='off'
                            className='form-control'
                            value={searchText}
                            onChange={onInputChange}

                        />
                        <button className='btn btn-outline-primary mt-1'>Search</button>
                    </form>
                </div>
                <div className="col-7">
                    <h4>Results</h4>
                    <hr />

                    {/* {q === '' 
                        ? (
                            <div className='alert alert-primary'>
                                Search a hero
                            </div>
                        ) : (heroes.length <= 0) && 
                            <div className='alert alert-danger'>
                                No heroe with <b>{ q }</b>
                            </div>                        
                    } */}

                    <div 
                        className='alert alert-primary animate__animated animate__fadeIn' 
                        style={{ display: showSearch ? '' : 'none'}}
                    >
                        Search a hero
                    </div>

                    <div 
                        className='alert alert-danger animate__animated animate__fadeIn' 
                        style={{ display: showError ? '' : 'none'}}
                    >
                        No heroe with <b>{ q }</b>
                    </div>                        

                    {
                        heroes.map((heroe, i) => (
                            <HeroCard key={i} {...heroe} /> 
                        ))
                    }
                    
                </div>
            </div>

        </>
    )
}
