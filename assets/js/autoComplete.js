$(document).ready(function(){
    var InputTipo = [
        {"Tipo":"Hamburguesa"},
        {"Tipo":"Pizza"},
        {"Tipo":"Carnes"},
        {"Tipo":"Hot Dog"},
        {"Tipo":"Bebida"},
        {"Tipo":"Postre"},
        {"Tipo":"Cerveza"},
        {"Tipo":"Bebidas Calientes"},
        {"Tipo":"Licores"},
        {"Tipo":"Vinos"}
    ];    
    $("#InputTipo").fuzzyComplete(InputTipo);
})