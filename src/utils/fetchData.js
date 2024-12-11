export const exerciseOptions =  {
    method: 'GET',
    headers: {
      
      'x-rapidapi-host':  'exercisedb.p.rapidapi.com',
      'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
    }
  };

  export const youtubeOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
      'X-RapidAPI-Key': 'f0021db587msh781fb1cbef39856p11c183jsn45521d5d1c85',
    },
  };

export const fetchData = async (url, Options) => {
    const response = await fetch(url, Options);
    const data = await response.json();

    return data;
}