const form = document.querySelector('form');
const search = document.getElementById("search");
const main = document.getElementById("main");

form.addEventListener("submit",(e)=> {
    e.preventDefault();

    weather = document.createElement('div');
    weather.classList.add('weather')

    let location = search.value;

    if (!location) {
       location='Karachi';
    }
    // `http://localhost:3000/weather?address=${location}`
    fetch(`/weather?address=${location}`, {origin: "cors" }).then(response => response.json())
        .then( data => {
            if(data.error){
                weather.innerHTML = `<p>${data.error}</p>`
            }else{
                weather.innerHTML = `
                <p>${location}</p>
                <p>${data.forecast}</p>
                <p>${data.Latitude}</p>
                <p>${data.Longitude}</p>
                <p>${data.place}</p>
            `
            }
        })


    main.innerHTML = "";
    main.appendChild(weather);
    search.value = " ";
});