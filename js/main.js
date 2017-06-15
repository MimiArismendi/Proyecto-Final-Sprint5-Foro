var api = {
  url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics'
};

var $topicsList = $("#topics-list");

var cargarPagina = function() {
    cargarTemas();
    $("#add-topic").submit(agregarTema);
};

var cargarTemas = function () {
    $.getJSON(api.url, function(temas){
    temas.forEach(crearTema);
  });
}

var crearTema = function (tema) {
    var mensaje = tema.content;
    var autor = tema.author_name;

  // creando la fila
  var $tr = $("<tr />");
  // creamos la celda del mensaje
  var $mensajeTd = $("<td />"); 
  var $linkTema = $("<a />");
    
  $linkTema.text(mensaje)
  $linkTema.attr("href", "verResponses.html")
  //$mensajeTd.text(mensaje);
  $mensajeTd.append($linkTema);
  $mensajeTd.attr('data-url', tema.id);
    
  // creando la celda del autor
  var $autorTd = $("<td />");
  $autorTd.text(autor);
    
  /*// creando la celda de respuestas
  var $respuestasTd = $("<td />");
  $respuestasTd.text(respuestas)    */
       
  // agregando las celdas a la fila
  $tr.append($mensajeTd);
  $tr.append($autorTd);
  //$tr.append($respuestasTd);

  // agregando filas a la tabla
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
