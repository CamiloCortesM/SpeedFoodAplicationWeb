function actualizar(opcion){
    let url = 'http://localhost:3000/api/products'
    fetch(url)
        .then(response => response.json())
        .then(data => mostrarData(data))
        .catch(error => console.log(error))
        
    const mostrarData = (data) => {
        const selectElement = document.getElementById('inputFood');
        const input = document.getElementById('inputprice');
        const inputTotal = document.getElementById('inputpriceTotal');
        input.value = "";
        inputTotal.value="";
        var length = selectElement.options.length;
        for (i = length-1; i >= 0; i--) {
            selectElement.options[i] = null;
        }
        for (let i = 0; i<data.length; i++){
            if(opcion.value == data[i].type){
                if(input.value == ""){
                    input.value = `${data[i].price}` ;
                    let PriceTotal = (data[i].price*0.3)+data[i].price;
                    inputTotal.value = `${PriceTotal}`;
                }
                let category = `<option>${data[i].name}</option>`
                selectElement.insertAdjacentHTML("beforeend",category);
            }        
        }
    }   
}
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

function Price(opcion){
    let url = 'http://localhost:3000/api/products'
    fetch(url)
        .then(response => response.json())
        .then(data => mostrarData(data))
        .catch(error => console.log(error))
        
    const mostrarData = (data) => {
        const input = document.getElementById('inputprice');
        const inputTotal = document.getElementById('inputpriceTotal');
        input.value = "";
        inputTotal.value="";
        for (let i = 0; i<data.length; i++){
            if(opcion.value == data[i].name){
                input.value = `${data[i].price}` ;
                let PriceTotal = (data[i].price*0.3)+data[i].price;
                inputTotal.value = `${PriceTotal}`;
            }        
        }
    }   
}

window.onload = function(){
    var fecha = new Date(); //Fecha actual
    var mes = fecha.getMonth()+1; //obteniendo mes
    var dia = fecha.getDate(); //obteniendo dia
    var ano = fecha.getFullYear(); //obteniendo año
    if(dia<10)
      dia='0'+dia; //agrega cero si el menor de 10
    if(mes<10)
      mes='0'+mes //agrega cero si el menor de 10
    document.getElementById('fechaActual').value=ano+"-"+mes+"-"+dia;
  }