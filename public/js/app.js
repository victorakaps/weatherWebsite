const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')
const messageThree = document.querySelector('#messageThree')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    console.log(location)
    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    fetch('/weather?address='+location).then((response) => {
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = error;
        }else{
            var str = data.weather;
            var res = str.split(",");
            var cityStr = data.location;
            var city = cityStr.split(",");
            var n = city.length;
            messageOne.textContent = city[0] + "," + city[n-1];
            messageTwo.textContent = res[1] + "°C";
            messageThree.textContent = res[0];
        }
     })
    })
})

