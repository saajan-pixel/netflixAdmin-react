export const getMovieStart=()=>(
    {
        type:'MOVIE_START'
    }
)
export const getMovieSuccess=(movies)=>(
    {type:'MOVIE_SUCCESS',payload:movies}
)

export const getMovieFailure=()=>(
    {type:'MOVIE_FAILURE'}
)

// deleting movie
export const deleteMovieStart= ()=>(
    {
        type:'DELETE_START'
    }
)

export const deleteMovieSuccess=(id)=>(
    {
        type:'DELETE_SUCCESS',
        payload:id
    }
)

export const deleteMovieFailure=()=>(
    {
        type:'DELETE_FAILURE'
    }
)

// updating movie
export const updateMovieStart=()=>(
    {type:"UPDATE_START"}
)
export const updateMovieSuccess=(movie)=>(
    {type:"UPDATE_SUCCESS",payload:movie}
)
export const updateMovieFailure=()=>(
    {type:'UPDATE_FAILURE'}
)

// posting movie
export const postMovieStart=()=>(
    {type:'POST_START'}
)
 
export const postMovieSuccess=(movie)=>(
    {type:'POST_SUCCESS',payload:movie}
)

export const postMovieFailure=()=>(
    {type:'POST_FAILURE'}
)

