import { useState, useEffect } from 'react';
import ContentDetail from "../Components/contentDetail";
import Movie from '../images/film-fill.svg'
import Tv from '../images/tv-2-fill.svg'
import next from '../images/arrow-drop-right-line.svg'
import previous from '../images/arrow-drop-left-line.svg'
import last from '../images/skip-forward-mini-fill.svg'
import first from '../images/skip-back-mini-fill.svg'


const AllMovies = () => {

    // const [recommend, setRecommend] = useState([])
    const [countries, setCountries] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [searchText, setSearchText] = useState("");

    // const currentPage = "p-4 rounded-full bg-white text-black h-8 w-8 place-content-center grid text-xs cursor-pointer"
    // const otherPage = "p-4 rounded-full border bg-white/10 text-white h-8 w-8 place-content-center grid text-xs cursor-pointer"
     
    useEffect(() => {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=72a11b158b57f6cc258d85d0d425ea98&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${activePage}&with_watch_monetization_types=flatrate`, requestOptions)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.results);
          setCountries(data['results']);
          // setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }, [activePage]);

  // Search for movie
  async function searchCountry() {

    if (searchText.length === 0) {

        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=72a11b158b57f6cc258d85d0d425ea98&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`)
        .then(res => res.json())
        .then(data => {
          setCountries(data.results);
          console.log(data);
        })
        .catch(err => console.log(err));
        
    } else {

      fetch(`https://api.themoviedb.org/3/search/movie?api_key=72a11b158b57f6cc258d85d0d425ea98&language=en-US&query=${searchText}&page=1&include_adult=false
      `)
        .then(res => res.json())
        .then(data => {
          setCountries(data.results);
          console.log(data);
        })
        .catch(err => console.log(err));
    
   }
}

  function handleSearchCountry(e) {
    e.preventDefault()
    searchCountry()
  }



    return ( 
       <div>
        
        <div className='grid gap-8 mb-6'>
          <form onSubmit={handleSearchCountry}>
            <input type="search"
              placeholder='Search Movie...'
              className="text-white bg-transparent border border-white/20 p-4 w-full md:w-1/3 text-xs rounded-md"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </form>

          <div className='flex justify-between items-center'>
            <div className=' text-lg'>Discover movies</div>
            <div className='flex gap-5'>
            <div className='flex gap-5 items-center'>
              <div onClick={() => setActivePage(activePage === 1 ? 1:1)}>
                <img src={first} alt=""/>
              </div>
              <div onClick={() => setActivePage(activePage - 1)}>
                <img src={previous} alt="" className="p-1 rounded-full border bg-white/10 cursor-pointer"/>
              </div>
              <div className='text-xs opacity-40'>
              Page {activePage}
              </div>
              <div onClick={() =>  setActivePage(activePage + 1)}>
                <img src={next} alt="" className="p-1 rounded-full border bg-white/10 cursor-pointer"/>
              </div>
              <div onClick={() => setActivePage(200)}>
                <img src={last} alt=""/>
              </div>
            </div>
            </div>
          </div>
        </div>

        <div  className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {countries.map((country) =>  (
        // <Link to={`/${country.name}`}>
          <div key={country.id} className="rounded-md">
            <img  key={country.id}  src={`https://image.tmdb.org/t/p/w300` + country.poster_path} alt="" className="w-full h-95 object-cover rounded-md mb-4" />
            <ContentDetail
              year = {country.release_date == null ? '2022-12-28': country.release_date}
              icon = {country.media_type === "movie" ? Movie: Tv}
              category = "Movie"
              rating = {country.original_language}
              title = {country.title == null ? country.name: country.title}
            />
            
          </div>
        // </Link>
        ))}
        </div>

        
       </div>
     );
}
 
export default AllMovies;