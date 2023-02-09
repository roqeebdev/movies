import { useState, useEffect } from 'react';
import ContentDetails from "../Components/contentDetail";
import Movie from '../images/film-fill.svg'
import Tv from '../images/tv-2-fill.svg'

const Loading = () => {
  return(
      <div>
          <p>Loading....</p>
          print('taye');
      </div>
  )
}

const Recommended = () => {

    // const [recommend, setRecommend] = useState([])
    const [countries, setCountries] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [id, setIsid] = useState();
    const [details, setMovieDetails] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch('https://api.themoviedb.org/3/discover/movie?api_key=72a11b158b57f6cc258d85d0d425ea98&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate', requestOptions)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.results);
          setCountries(data['results']);
          // setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }, []);

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=72a11b158b57f6cc258d85d0d425ea98&language=en-US`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setMovieDetails(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id]);



    return ( 
       <div>
        
        <div className='my-8 text-3xl'>Recommended for you</div>
        <div  className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {countries.map((country) =>  (
        // <Link to={`/${country.name}`}>
        
          <div key={country.id} className="rounded-md">
            
            <img  key={country.id}  onClick={() => {setIsid(country.id); setIsOpen(true);}} src={`https://image.tmdb.org/t/p/w300` + country.poster_path} alt="" className="w-full h-95 object-cover rounded-md mb-4" />
            <ContentDetails
              year = {country.release_date == null ? '2022-12-28': country.release_date}
              icon = {country.media_type === "movie" ? Movie: Tv}
              category = {country.media_type}
              rating = {country.original_language}
              title = {country.title == null ? country.name: country.title}
            />

          </div>
        // </Link>
        ))}
{loading ? <Loading/> :
<div>
        {isOpen ? (
        <>
<div className="fixed inset-0 h-full w-full bg-black opacity-90 overscroll-contain">
<div className="relative max-w-sm mx-auto my-14 bg-white p-6 rounded-lg shadow-lg overscroll-contain">
  <button className="absolute top-0 right-0 p-2" onClick={() => setIsOpen(false)}>
    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>

  <div className="text-center">
    <img src={`https://image.tmdb.org/t/p/w300` + details.poster_path} alt='' className="w-full  rounded-lg" />
  </div>

  <div className="px-4 mt-4">
    <h2 className="text-lg font-medium text-gray-900">{details.original_title}</h2>
    <p className="text-sm text-gray-600">{details.release_date}</p>
    <p className="text-sm text-gray-600 mt-2 text-justify">{details.overview}</p>
  </div>
</div>
</div>
        </>
      ) : null}
             </div> }
        </div>
       </div>

     );
}
 
export default Recommended;



