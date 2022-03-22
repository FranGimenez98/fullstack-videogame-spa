import axios from 'axios';

export const  getVideogames = () => {
    return async function (dispatch){
        var json = await axios.get('http://localhost:3009/api/videogames');
        return dispatch({
            type: "GET_VIDEOGAMES",
            payload: json.data
        });
    };
};

export const getGenres = () => {
    return async function(dispatch){
        var json = await axios.get('http://localhost:3009/api/genres');
        return dispatch({
            type: "GET_GENRES",
            payload: json.data
        })
    }
}

export const videogamesGenreFilter = (payload) => {
    return{
        type: "VIDEOGAMES_GENRE_FILTER",
        payload
    };
};

export const orderByName = (payload) => {
    return{
        type: "ORDER_BY_NAME",
        payload
    }
}

export const searchByName = (name) => {
    return async function (dispatch) {
        var json = await axios.get(`http://localhost:3009/api/videogames?search=${name}`)
        return dispatch ({
            type: "SEARCH_BY_NAME",
            payload: json.data,
        });
    }
}

export const getDetail = (id) => {
    return async function(dispatch){
        try{
            var json = await axios.get(`http://localhost:3009/api/videogames/${id}`)
            return dispatch ({
                type: "GET_DETAIL",
                payload: json.data,
            })
        } catch(error){
            console.log(error)
        }
        
    };
};

export const getPlatforms = () => {
    return async function(dispatch){
        const response = await axios.get('http://localhost:3009/api/platforms');
        return dispatch({
            type: "GET_PLATFORMS",
            payload: response.data
        })
    }
}

export const postVidegame = (payload) => {
    return async function(dispatch){
        const response = await axios.post('http://localhost:3009/api/videogames', payload);
        return dispatch({
            type: "CREATE_GAME",
            response
        })
    }
}

export const filterCreated = (payload) => {
    return{
        type: "FILTER_CREATED",
        payload,
    }
}

export const deleteButton = (payload) => {
    return{
        type: "DELETE",
        payload,
    }
}