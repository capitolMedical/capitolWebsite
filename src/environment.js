
let urlHandler = ''

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    urlHandler  = 'http://localhost:4000/api'
} else {
    urlHandler = 'https://cmcc-library.herokuapp.com/api'
}

export const url = urlHandler