console.log('test');

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data)=>{
//         console.log(data);
//     })
// })


// fetch('http://localhost:3000/weather?address=dubai').then((res)=>{
//     res.json().then((data)=>{
//         if(data.error){
//             console.log(error);
//         }else{
//             console.log(data.location);
//             console.log(data.forcast);
//         }
//     })
// })


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = 'loading ..';
messageTwo.textContent = '';

weatherForm.addEventListener('submit', (res) =>{
    res.preventDefault();
    const location = search.value;

    fetch('/weather?address='+location).then((response) =>{
        response.json().then((data) =>{
            if(data.error){
                messageOne.textContent = data.error;
            }else{
                messageOne.textContent = data.forcast;
                messageTwo.textContent = data.location;
            }
        })
    })

    console.log(location);
});
