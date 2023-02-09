import { useState, useEffect } from 'react';
import ContentDetail from "../Components/contentDetail";
import Movie from '../images/film-fill.svg'
import Tv from '../images/tv-2-fill.svg'



const Trending = () => {
      // const [recommend, setRecommend] = useState([])
      const [countries, setCountries] = useState([]);

      useEffect(() => {
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
  
        fetch('https://api.themoviedb.org/3/trending/all/day?api_key=72a11b158b57f6cc258d85d0d425ea98', requestOptions)
          .then((res) => res.json())
          .then((data) => {
            console.log(data.results);
            setCountries(data['results']);
            // setIsLoading(false);
          })
          .catch((err) => console.log(err));
      }, []);
    return ( 
          <div className="">
              <p className='mb-4' >Search</p>
              <div className='py-4 text-3xl'>Trending Movies</div>
              <div className="flex overflow-x-auto">
               
        {countries.map((country) =>  (
        // <Link to={`/${country.name}`}>
          <div className="flex-none py-6 px-3 first:pl-6 last:pr-6">
          <div key={country.id} className="rounded-md relative ">
            <div className="bg-black opacity-50">
            <img  key={country.id}  src={`https://image.tmdb.org/t/p/w500` + country.poster_path} alt="" className="w-full h-72 object-contain rounded-md mb-4" />
            </div>
            <div className='absolute bottom-0 p-2'><ContentDetail
              year = {country.release_date == null ? '2022-12-28': country.release_date}
              icon = {country.media_type === "movie" ? Movie: Tv}
              category = {country.media_type}
              rating = {country.original_language}
              title = {country.title == null ? country.name: country.title}
            />
             </div>

            </div>
            </div>
        
        // </Link>
        ))}
        
</div>
</div>   
     );
}
 
export default Trending;