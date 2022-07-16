const author = document.getElementById('author')
// https://linuxhint.com/how_to_get_current_date_and_time_in_javascript/
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options
function getTime(){
  const current = new Date()
  const currentTime = current.toLocaleTimeString(("en-us"), {timeStyle: 'medium'})
  document.getElementById('time').textContent = currentTime
}

// runs getTime every second
setInterval(getTime, 1000)

const backupImage = {
  image:
    'https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTc4MDkzNzU&ixlib=rb-1.2.1&q=80',
  publisher: 'Ken Cheung',
};


// unsplash api
    fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature')
    .then(res => res.json())
    .then(data => {
      document.body.style.backgroundImage = `url(${data.urls.full})`;
      author.textContent = data.user.name
    })
    // throws and error if api call goes wrong
    .catch(err => {
      console.log('Something went wrong!')
      // set up default image
      document.body.style.backgroundImage = `url(${backupImage.image})`
      author.textContent = backupImage.publisher
    })
// Crypto
fetch('https://api.coingecko.com/api/v3/coins/dogecoin')
    .then(res => {
      // if not 400 level error
      if (!res.ok) {
        // throw will exit out of the function
        throw Error(res.status, "something went wrong")
      }
      console.log(res.status)
      return res.json()
    })
    .then(data => {
      console.log(data);
      document.getElementById('coin-top').innerHTML = `<img src=${data.image.small}> <span> ${data.name} </span>`
      
      document.getElementById('coin').innerHTML += `
            <p>🎯: $${data.market_data.current_price.usd}</p>
            <p>👆: $${data.market_data.high_24h.usd}</p>
            <p>👇: $${data.market_data.low_24h.usd}</p>
        `;
    })
    .catch(err => console.log(err))


    // geolocation web api
    // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API#getting_the_current_position
    
    


    // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }

    function success(pos) {
      const coord = pos.coords
      console.log('your position is: Lat, Long', coord.latitude, coord.longitude )
    }

    function error(err) {
      console.warn("error", err.code, err.message)
    }
    // navigator.geolocation.getCurrentPosition(success, error, options)

    // access the geoLocatioObj
    (navigator.geolocation.getCurrentPosition(data => {
      const lat = data.coords.latitude
      const long = data.coords.longitude
      console.log(lat, long)
      fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial`)
        .then(res => {
          if (!res.ok) {
            throw Error("Data not found")
          }
          return res.json()
        })
        .then(data => {
          console.log('weather info', data)
          const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
          console.log(icon)
          document.getElementById('weather-icon').setAttribute('src', icon);
          document.getElementById('temp').textContent = `${Math.round(data.main.temp)}°`
          document.getElementById('city').textContent = data.name
        })
        .catch(err => console.log(err));
    }))


    