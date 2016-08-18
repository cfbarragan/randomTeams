$(document).ready(function(){
     $.getJSON("/json/Jugadores.json", function(result){
         var bolsa = $('#bolsa');
        $.each(result, function(i, field){
           var jugadorTemplate = $("#jugadorTemplate").clone();
           $(jugadorTemplate).attr("id","jugador-"+field.id);
           $(jugadorTemplate).find("input").attr("data-id", field.id);
           $(jugadorTemplate).find("label").append(field.nombre);
           $(jugadorTemplate).removeClass("hidden");
           bolsa.append(jugadorTemplate);
           
           members.push({ "nombre" :  field.nombre, "id" : field.id })
        });
    });
    
    console.log(members);
});

var members = [];
var jugadores = [];
var minNumber = 1;
var maxNumber =  11;
 var ids = [];
 
 function juega(element) {
     //console.log(element);
     var id = $(element).data('id');
     var jugador;
        members.filter(function(value, index, members){
          if (value.id ==id){
              jugador = value;
              return;              
          }   
        }); 
     if (element.checked){
      
        jugadores.push({ "nombre": jugador.nombre, "id":jugador.id });
    }else{
        debugger;
       var index = jugadores.findIndex(x => x.id == jugador.id);
       console.log(index);
       if (index > -1){
         jugadores.splice(index,1);
       }
    }
}
 
function generar() {
   
  var team1 = $("#team1");
  var team2 = $("#team2");  
  ids = []; 
  team1.children('p').remove();
  team2.children('p').remove(); 
  var eq1 =0;
  var eq2 =0;
  
if (jugadores.length > 0){
    maxNumber = members.length + 1;
    for(i = 1; i < jugadores.length + 1; i++) { 
    
        var result = randomNumberFromRange(minNumber,maxNumber);
        ids.push(result);
        var elem;
        jugadores.forEach(function(value, index){
        if (value.id == result){
            elem = value;           
        }
        });
        
        if (i <= Math.floor(jugadores.length/2)){
            eq1 ++
            team1.append("<p>"+ elem.nombre+"</p>");
        }else{
            eq2 ++
            team2.append("<p>"+ elem.nombre+"</p>");
        }
    }
    
    team1.find("span").text(eq1)
    team2.find("span").text(eq2)     
         
}else{
    alert("Debe seleccionar jugadores para armar los equipos");
}

};

function randomNumberFromRange(min,max)
{
   var result = Math.floor(Math.random()*(max-min+1)+min);
   var juega = false;
   jugadores.forEach(function(value, index){
       if(value.id == result)
       {
           juega = true;
       }       
   });
   if (juega){
        if ($.inArray(result, ids) == -1){
            return result;
        }else{
            return randomNumberFromRange(min,max);
        }
   }else{
        return randomNumberFromRange(min,max);
   }
}