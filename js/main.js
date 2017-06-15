var api = {
  url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics'
};

var $topicsList = $("#topics-list");

var cargarPagina = function() {
    cargarTemas();
    $("#add-topic").submit(agregarTema);
};

var cargarTemas = function () {
    $.getJSON(api.url, function(response){
    var autor = response.author_name;
    var mensaje = response.content;
      
    $("#content").text(mensaje);
    $("#author_name").text(autor);
  });
}

var crearTema = function (tema) {
var mensaje = tema.content;
var autor = tema.author_name;

  // creamos la fila
  var $tr = $("<tr />");
  // creamos la celda del mensaje
  var $mensajeTd = $("<td />");
  $mensajeTd.text(mensaje);
  // creamos la celda del autor
  var $autorTd = $("<td />");
  $autorTd.text(autor);
    
  /*// creamos la celda de respuestas
  var $respuestasTd = $("<td />");
  $respuestasTd.text(respuestas)    */
       
  // agregamos las celdas a la fila
  $tr.append($mensajeTd);
  $tr.append($autorTd);
  //$tr.append($respuestasTd);

  // agregamos filas a la tabla
  $topicsList.append($tr);
};


var agregarTema = function (e) {
  e.preventDefault();
  var autor = $("#author_name").val();
  var mensaje = $("#content").val();
  $.post(api.url, {
    author_name: autor,
    content: mensaje
  }, function (tema) {
    crearTema(tema);
    $("#modalTopicNuevo").modal("hide");
  });
};

$(document).ready(cargarPagina);

