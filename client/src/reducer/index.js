const initialState = {
  videogames: [],
  allVideogames: [],
  details: [],
  genres: [],
  platforms: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
      };

    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };

    // case "VIDEOGAMES_GENRE_FILTER":
    //   const allGenres = state.allVideogames
    //   const genreFilter = action.payload = "All" ? state.allVideogames : allGenres.filter(genre => genre.genres === action.payload)
    //   return{
    //     ...state,
    //     allVideogames: genreFilter,
    //   }


      case 'VIDEOGAMES_GENRE_FILTER':
        let allGames = state.allVideogames
        let filterGenre = allGames.filter(el => el.genres.find(el => el.name === action.payload))
        
        return {
                ...state,
                videogames: action.payload === "All" ? allGames : filterGenre,
                
            }

    // case "VIDEOGAMES_GENRE_FILTER":
    //   const allGenres = state.videogames;
    //   const genreFilter = action.payload === "All" ? allGenres : allGenres.filter(genre => {
    //     return genre.genres.find(g => {
    //       return g.name === action.payload;
    //     })
    //   })
    //   return{
    //     ...state,
    //     videogames: genreFilter
    //   }

    case "ORDER_BY_NAME":
      const sortArray =
        action.payload === "asc"
          ? state.videogames.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.videogames.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: sortArray,
      };

    case "SEARCH_BY_NAME":
      return {
        ...state,
        videogames: action.payload,
      };


    case "GET_DETAIL":
      return {
        ...state,
        details: action.payload,
      };

    case "GET_PLATFORMS":
      return{
        ...state,
        platforms: action.payload,
      }

    case "CREATE_GAME":
        return{
          ...state,
        }

    case "FILTER_CREATED":
      const allVgames = state.allVideogames
      const filterCreated = action.payload === "created" ? allVgames.filter(f => f.createdInDb === true) :  allVgames.filter(f => !f.createdInDb);
        return{
          ...state,
          videogames: action.payload === "all" ? allVgames : filterCreated,
        }

    case "DELETE":
      return{
        ...state,
        videogames: state.allVideogames.filter(d => d.id !== action.payload)
      }

    default:
      return { ...state };
  }
}

export default rootReducer;
