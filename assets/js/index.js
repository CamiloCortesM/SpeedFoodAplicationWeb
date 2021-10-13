var names = [];

window.addEventListener("load", function(){
    let url = 'http://localhost:3000/api/domics'
    fetch(url)
        .then(response => response.json())
        .then(data => mostrarData(data))
        .catch(error => console.log(error))
        
    const mostrarData = (data) => {
        console.log(data);
        for (let i = 0; i<data.length; i++){
                names[i] = `${data[i].name}` ;     
        }
    } 
    });
    

window.addEventListener("load", function(){

    let url = 'http://localhost:3000/api/domics'
    fetch(url)
        .then(response => response.json())
        .then(data => mostrarData(data))
        .catch(error => console.log(error))
        
        const mostrarData = (data) => {
            const selectElement = document.getElementById('inputDomiciliar');
            var length = selectElement.options.length;
            for (i = length-1; i >= 0; i--) {
            selectElement.options[i] = null;
            }
            for (let i = 0; i<data.length; i++){
                    let category = `<option>${data[i].name}</option>`
                    selectElement.insertAdjacentHTML("beforeend",category);
                       
            }
        }   
});



function onlyNums(e){
    const code = window.event ? e.which : e.keyCode;
    return !( code < 48 || code > 57 );
}

function onlyAlpha(e) {
    var key = e.keyCode || e.which,
        tecla = String.fromCharCode(key).toLowerCase(),
        letras = " áéíóúabcdefghijklmnñopqrstuvwxyz",
        especiales = [8, 37, 39, 46],
        tecla_especial = false;

    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        return false;
    }
}

$("#add_domic").submit(function(event){  
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Domiciliario agregado'
      });
      
})




$("#new_pedit").submit(function(event){
    Swal.fire('Bien!', 'Datos insertados correctamente!', 'success');
})



$("#update_domic").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })

    
    var request = {
        "url" : `http://localhost:3000/api/domics/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        Swal.fire('Bien!', 'Datos insertados correctamente!', 'success');
    })

})

$("#update_product").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })


    var request = {
        "url" : `http://localhost:3000/api/products/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        Swal.fire('Bien!', 'Datos insertados correctamente!', 'success');
    })

})

if(window.location.pathname == "/domiciliarios"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3000/api/domics/${id}`,
            "method" : "DELETE"
        }

        if(confirm("¿Realmente desea eliminar este registro?")){
            $.ajax(request).done(function(response){
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'success',
                    title: '¡Datos eliminados con éxito!'
                  });
                  setTimeout(function(){
                    location.reload(1);
                 }, 1000);
            })
        }

    })
}

window.addEventListener("load", function(){
let url = 'http://localhost:3000/api/domics'
fetch(url)
    .then(response => response.json())
    .then(data => mostrarData(data))
    .catch(error => console.log(error))
    
const mostrarData = (data) => {
    console.log(data);
    for (let i = 0; i<data.length; i++){
            names[i] = `${data[i].name}` ;     
    }
} 
});

if(window.location.pathname == "/products"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3000/api/products/${id}`,
            "method" : "DELETE"
        }

        if(confirm("¿Realmente desea eliminar este registro?")){
            $.ajax(request).done(function(response){
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'success',
                    title: '¡Datos eliminados con éxito!'
                  });
                  setTimeout(function(){
                    location.reload(1);
                 }, 1000);
                
            })
            .fail(function() {
                alert( "error" );
              })
        }

    })
}
$('#products').DataTable({
    initComplete: function(){
     this.api().columns([1]).every(function(i){
      var column = this,
      select = $('<select style="width:200px"><option value=""></option></select>')
      .appendTo( $('#search'+i))
      .on( 'change', function(){
        var val = $.fn.dataTable.util.escapeRegex($(this).val());
        column.search( val ? '^'+val+'$' : '', true, false ).draw();
      });
      column.data().unique().sort().each( function ( d, j ) {
       select.append('<option value="'+d+'">'+d+'</option>');
      });
     });
    }
   });
