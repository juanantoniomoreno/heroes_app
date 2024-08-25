import { useMemo } from 'react';

import { getHeroesByPublisher } from '../helpers'
import { HeroCard } from './';

export const HeroesList = ({ publisher }) => {

    const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher])  ;    

    return (
        <div className='row rows-cols-1 row-cols-md-3 g-3'>
            {!heroes ? (
                <span>No hay héroes</span>
            ) : (
                heroes.map((heroe, i) => (
                    <div key={i}>
                        <HeroCard 
                            key={heroe.id} 
                            {...heroe}
                        />
                    </div>
                ))
            )}
        </div>
    )
}
