window.addEventListener("load", function(){

    let url = 'http://localhost:3000/api/domics'
    fetch(url)
        .then(response => response.json())
        .then(data => mostrarData(data))
        .catch(error => console.log(error))
        
        const mostrarData = (data) => {
            const selectElement = document.getElementById('inputDomiciliar');
            for (let i = 0; i<data.length; i++){
                    let category = `<option>${data[i].name}</option>`
                    selectElement.insertAdjacentHTML("beforeend",category);
                       
            }
        }   
});

function actualizar(opcion){
    let url = 'http://localhost:3000/api/pedits'
    fetch(url)
        .then(response => response.json())
        .then(data => mostrarData(data))
        .catch(error => console.log(error))
        
    const mostrarData = (data) => {
        let body = ''
        for (let i = 0; i<data.length; i++){
            if(data[i].nameDomic == opcion.value){
                body += `<tr><td>${i+1}</td><td>${data[i].Date}</td><td>${data[i].name}</td><td>${data[i].address}</td><td>${data[i].telephone}</td><td>${data[i].nameDomic}</td><td>${data[i].TypeProduct}</td><td>${data[i].NameProduct}</td><td>${data[i].price}</td><td>${data[i].priceTotal}</td><td>NO</td></tr>` 
            }
    }
    document.getElementById('data3').innerHTML = body   
}
}
