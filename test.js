//REGISTRO TERCEROS MOTOS
jQuery(document).ready(function () {
    //inicializar roles
    function GetUserInfo(UserID) {
      var JSONFile = '';
      jQuery.ajax({
        url: 'api/v3/users/' + UserID,
        type: 'GET',
        success: function (response) {
  
          var cargo = response.user.jobtitle;
          var roles = response.user.org_roles;
          for (var i = 0; i < roles.length; i++) {
            switch (roles[i].name) {
              case 'Digitador de datos formato FMD0039':
                switch (cargo) {
                  case 'Auxiliar administratativo de ventas':
                    JSONFile = 'AUADVENMOT_';
                    $CS.removeOptions("WorkOrder_Fields_301_UDF_CHAR225", ["Cliente Repuestos Motos"]);
                    break;
                  default:
                    JSONFile = '';
                    break;
                }
                break;
              case 'Digitador datos básicos de clientes Rep. motos':
                switch (cargo) {
                  case 'Cargo Prueba Digitador Rep Autos':
                    JSONFile = 'DDBDCRM_';
                    $CS.removeOptions("WorkOrder_Fields_301_UDF_CHAR225", ["Cliente Motos"]);
                    break;
                  default:
                    JSONFile = '';
                    break;
                }
                break;
              case 'Clientes criterios clasificación Rep. Motos':
                switch (cargo) {
                  case 'Asesor Repuestos Motos':
                    JSONFile = 'CCCRM_';
                    $CS.removeOptions("WorkOrder_Fields_301_UDF_CHAR82", ["Bloqueo", "Inactivación", "Activación"]);
                    $CS.removeOptions("WorkOrder_Fields_301_UDF_CHAR225", ["Cliente Motos"]);
                    break;
                  default:
                    JSONFile = '';
                    break;
                }
                break;
              case 'Cupos de credito':
                switch (cargo) {
                  case 'Cupos de credito':
                    JSONFile = 'CDCREPMOT_';
                    $CS.removeOptions("WorkOrder_Fields_301_UDF_CHAR82", ["Bloqueo", "Inactivación", "Activación", "Creación"]);
                    $CS.removeOptions("WorkOrder_Fields_301_UDF_CHAR225", ["Cliente Motos"]);
                    break;
                  default:
                    JSONFile = '';
                    break;
                }
                break;
            }
          }
  
        },
        async: false
      });
      return JSONFile;
    }
  
    var UserID = $CS.getLoggedInUserId();
    var fileJS = GetUserInfo(UserID);
  
  
    //telefonos y celular obligatorios
    //$CS.mandateField(["WorkOrder_Fields_301_UDF_CHAR14"]);
    //$CS.mandateField(["WorkOrder_Fields_301_UDF_CHAR27"]);
    //$CS.mandateField(["WorkOrder_Fields_301_UDF_CHAR15"]);
    //$CS.mandateField(["WorkOrder_Fields_301_UDF_CHAR28"]);
    //$CS.mandateField(["WorkOrder_Fields_301_UDF_CHAR161"]);
    //$CS.mandateField(["WorkOrder_Fields_301_UDF_CHAR162"]);
    $CS.removeOptions("WorkOrder_Fields_301_UDF_CHAR82", ["Bloqueo"]);
  
    ///////////////////////////
    //razon social y persona natural no obligatorios
    $CS.nonMandateField(["WorkOrder_Fields_301_UDF_CHAR2"]);
    $CS.nonMandateField(["WorkOrder_Fields_301_UDF_CHAR3"]);
    $CS.nonMandateField(["WorkOrder_Fields_301_UDF_CHAR4"]);
    $CS.nonMandateField(["WorkOrder_Fields_301_UDF_CHAR5"]);
  
    //mayusuclas general
    // Selecciona todos los campos de texto y textarea del formulario
    var camposTexto = jQuery('input, textarea');
  
    // Itera sobre cada campo de texto y textarea
    camposTexto.each(function () {
      // Verifica si el campo tiene los atributos específicos
      var esCampoEspecial =
        jQuery(this).is('[data-field=WorkOrder_Fields_301_UDF_CHAR17]')
        || jQuery(this).is('[data-field=WorkOrder_Fields_301_UDF_CHAR30]')
        || jQuery(this).is('[data-field=WorkOrder_Fields_301_UDF_CHAR163]');
  
      // Si el campo no es especial, convierte el valor a mayúsculas
      if (!esCampoEspecial) {
        jQuery(this).on('input', function () {
          jQuery(this).val(jQuery(this).val().toUpperCase());
        });
      }
    });
    //fin mayusuclas general
    var miDiv = jQuery('<div class="modal-inline-overlay" style="position: fixed !important;" id="freezeAgentConfig"><div class="loading1" style="top: 50%;display: block;"><div class="loading-bar1"></div><div class="loading-bar1"></div><div class="loading-bar1"></div><div class="loading-bar1"></div></div></div>');
    jQuery("body").append(miDiv);
    // Parámetros de autenticación básica
    var username = "wsuser";
    var password = "beta1234";
    var apiUrl = "https://fnwddev01.fanalca.com.co:44300/RESTAdapter/ServiceDesk/Query";
    var base64Credentials = btoa(username + ":" + password);
    // Fin Parámetros de autenticación básica
  
    var numeroIdentificacion = 0;
    var tipoIdentificacion = "";
    //Llamado funciones modificadoras estados iniciales
    deshabilitarPersonerias();
    deshabilitarCamposCLientes();
  
    //inicio tipo tercero
    jQuery.getJSON({
      url: '/custom/scripts/TipTer.json',
      success: function (datas) {
        var target = datas;
        $CS.element("WorkOrder_Fields_301_UDF_CHAR1").select2({
          data: target,
          allowClear: true
        });
      }
    });
    //fin tipo tercero
    
    //Inicio numero de identificacion
  var numeroIdentificacion = jQuery('[data-field=WorkOrder_Fields_301_UDF_CHAR7]');
  // Escuchar el evento de entrada de texto
  numeroIdentificacion.on('input', function () {
    var textoIngresado = jQuery(this).val();
     textoIngresado = textoIngresado.slice(0, 15);
    jQuery(this).val(textoIngresado);
  });
  //Fin numero de identificacion
      
    //Inicio nombre de establecimiento
  var numeroIdentificacion = jQuery('[data-field=WorkOrder_Fields_301_UDF_CHAR8]');
  // Escuchar el evento de entrada de texto
  numeroIdentificacion.on('input', function () {
    var textoIngresado = jQuery(this).val();
     textoIngresado = textoIngresado.slice(0, 40);
    jQuery(this).val(textoIngresado);
  });
  //Fin nombre de establecimiento
  
    //inicio razon social
    var RazonSocialFields = jQuery('[data-field=WorkOrder_Fields_301_UDF_CHAR2]');
    RazonSocialFields.on('input', function () {
      var textoIngresado = jQuery(this).val();
      textoIngresado = textoIngresado.slice(0, 40);
      // Filtrar caracteres no deseados y convertir a mayúsculas
      /*var regex = /^[a-zA-Z0-9\-.']+$/;
      if (regex.test(textoIngresado)) {
        textoIngresado = textoIngresado.toUpperCase();
         jQuery(this).val(textoIngresado);
      } else {
        textoIngresado = textoIngresado.slice(0, - 1).toUpperCase();
        jQuery(this).val(textoIngresado);
      }*/
      textoIngresado = textoIngresado.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9.-]+| {2,}/g, ' ').toUpperCase();
      jQuery(this).val(textoIngresado);
    });
    //fin razon social 
  
    //inicio apellidos
    var ApeFields = jQuery('[data-field=WorkOrder_Fields_301_UDF_CHAR3], [data-field=WorkOrder_Fields_301_UDF_CHAR4], [data-field=WorkOrder_Fields_301_UDF_CHAR4]');
    ApeFields.on('input', function () {
      var textoIngresado = jQuery(this).val();
      // Filtrar caracteres no deseados y convertir a mayúsculas
      textoIngresado = textoIngresado.replace(/[^A-Za-z'-]/g, '').toUpperCase();
      // Limitar la longitud entre 2 y 45 caracteres
      textoIngresado = textoIngresado.slice(0, 45);
      if (textoIngresado.length < 2) {
        jQuery(this).attr('title', 'Se requieren al menos 2 caracteres.');
      } else {
        jQuery(this).removeAttr('title');
      }
      // Actualizar el valor del campo de texto con el texto filtrado y ajustado
      jQuery(this).val(textoIngresado);
    });
    // fin apellidos 
  
    //inicio nombres
    var NombApeFields = jQuery('[data-field=WorkOrder_Fields_301_UDF_CHAR5]');
    NombApeFields.on('input', function () {
      var textoIngresado = jQuery(this).val();
      // Filtrar caracteres no deseados y convertir a mayúsculas
      textoIngresado = textoIngresado.replace(/[^A-Za-z' -]+/g, ''); // Elimina caracteres no deseados
      textoIngresado = textoIngresado.replace(/\s{2,}/g, ' '); // Reemplaza dos o más espacios con uno solo
      textoIngresado = textoIngresado.toUpperCase();
      // Limitar la longitud entre 2 y 45 caracteres
      textoIngresado = textoIngresado.slice(0, 45);
      if (textoIngresado.length < 2) {
        jQuery(this).attr('title', 'Se requieren al menos 2 caracteres.');
      } else {
        jQuery(this).removeAttr('title');
      }
      // Actualizar el valor del campo de texto con el texto filtrado y ajustado
      jQuery(this).val(textoIngresado);
    });
    // fin nombres
  
    //inicio tipo identificación
    jQuery.getJSON({
      url: '/custom/scripts/TypeID.json',
      success: function (datas) {
        var target = datas;
        $CS.element("WorkOrder_Fields_301_UDF_CHAR6").select2({
          data: target,
          placeholder: "Seleccione tipo de identificación...",
          allowClear: true
        });
      }
    });
    //fin tipo identificación 
  
    //inicio numero identificacion
    var identificacion = jQuery('[data-field=WorkOrder_Fields_301_UDF_CHAR6]');
    var IDNumberFields = jQuery('[data-field=WorkOrder_Fields_301_UDF_CHAR7]');
    IDNumberFields.on('input', function () {
      tipoIdentificacion = identificacion.val();
      var textoIngresado = jQuery(this).val();
      if (tipoIdentificacion == "P" || tipoIdentificacion == "E" || tipoIdentificacion == "X") {
        textoIngresado = textoIngresado.replace(/[^0-9a-zA-Z\d]/g, '').toUpperCase();
      } else {
        // Filtrar caracteres no deseados y convertir a mayúsculas
        textoIngresado = textoIngresado.replace(/[^0-9]\d*/g, '').toUpperCase();
      }
      if (textoIngresado.length < 6) {
        jQuery(this).attr('title', 'La longitud debe ser al menos 6 caracteres.');
      } else {
        jQuery(this).removeAttr('title');
      }
      // Limitar la longitud a 10 caracteres
      textoIngresado = textoIngresado.slice(0, 15);
  
      if (textoIngresado.length >= 6) {
        var pattern = /^(?!([0-9a-zA-Z])\1{5})[0-9a-zA-Z]{6,}$/;
        if (pattern.test(textoIngresado)) {
          // Actualizar el valor del campo de texto con el texto filtrado y ajustado
          jQuery(this).val(textoIngresado);
          numeroIdentificacion = textoIngresado;
        } else {
          alert("El número de identificación no puede ser secuencia de números");
          textoIngresado = "";
        }
      }
      jQuery(this).val(textoIngresado);
      numeroIdentificacion = textoIngresado;
    });
    //fin numero identificacion 
    
    //Inicio contacto
  var contacto = jQuery('[data-field=WorkOrder_Fields_301_UDF_CHAR9]');
  // Escuchar el evento de entrada de texto
  contacto.on('input', function () {
    var textoIngresado = jQuery(this).val();
     textoIngresado = textoIngresado.slice(0, 40);
    jQuery(this).val(textoIngresado);
  });
  //Fin  contacto
    
    //Inicio direccion1y2
  var direcciones = jQuery('[data-field=WorkOrder_Fields_301_UDF_CHAR10],[data-field=WorkOrder_Fields_301_UDF_CHAR11],[data-field=WorkOrder_Fields_301_UDF_CHAR158],[data-field=WorkOrder_Fields_301_UDF_CHAR157],[data-field=WorkOrder_Fields_301_UDF_CHAR24],[data-field=WorkOrder_Fields_301_UDF_CHAR25]');
  // Escuchar el evento de entrada de texto
  nombreEstablecimiento.on('input', function () {
    var textoIngresado = jQuery(this).val();
     textoIngresado = textoIngresado.slice(0, 40);
    jQuery(this).val(textoIngresado);
  });
  //Fin direccion1y2
  
    //Inicio Barrio
    var barrio = jQuery('[data-field=WorkOrder_Fields_301_UDF_CHAR12],[data-field=WorkOrder_Fields_301_UDF_CHAR11], [data-field=WorkOrder_Fields_301_UDF_CHAR25], [data-field=WorkOrder_Fields_301_UDF_CHAR26], [data-field=WorkOrder_Fields_301_UDF_CHAR158], [data-field=WorkOrder_Fields_301_UDF_CHAR159]');
  
    barrio.on('input', function () {
      var textoIngresado = jQuery(this).val();
  
      // Reemplazar espacios múltiples con un solo espacio
      textoIngresado = textoIngresado.replace(/\s\s+/g, ' ');
  
      // Convertir el texto a mayúsculas
      textoIngresado = textoIngresado.toUpperCase();
  
      if (textoIngresado.length > 25) {
        textoIngresado = textoIngresado.slice(0, 25);
      }
  
      jQuery(this).val(textoIngresado);
    });
    barrio.on('blur', function () {
      var textoIngresado = jQuery(this).val();
      jQuery(this).val(textoIngresado.trim());
    });
    //Fin barrio
  
    //Inicio centro poblado
    var poblado = jQuery('[data-field=WorkOrder_Fields_301_UDF_CHAR210]');
    poblado.on('input', function () {
      var textoIngresado = jQuery(this).val();
      textoIngresado = textoIngresado.replace(/[^0-9\d]/g, '');
      jQuery(this).val(textoIngresado);
    });
    //Fin centro poblado
  
    //Inicio verificar obligatorio
    function verificarObligatorio(telefono, celular) {
      var Vtelefono = $CS.getValue(telefono);
      var Vcelular = $CS.getValue(celular);
      if ((Vtelefono === "" && Vcelular !== "") || (Vtelefono === null && Vcelular !== null)) {
        console.log("celular obligatorio, telefono opcional");
        $CS.mandateField([celular.toString()]);
        $CS.nonMandateField([telefono.toString()]);
      } else if ((Vcelular === "" && Vtelefono !== "") || (Vcelular === null && Vtelefono !== null)) {
        console.log("Telefono obligatorio, celular opcional");
        $CS.mandateField([telefono]);
        $CS.nonMandateField([celular]);
      } else if ((Vcelular !== "" && Vtelefono !== "") || (Vcelular !== null && Vtelefono !== null)) {
        console.log("telefono obligatorio, celular opcional");
        $CS.mandateField([telefono]);
        $CS.nonMandateField([celular]);
      } else {
        console.log("No valida");
        $CS.mandateField([telefono]);
        $CS.mandateField([celular]);
      }
    }
    //Fin verificar obligatorio
  
    //Inicio telefono
    //jQuery(this)[0].dataset.field
    var telefono = jQuery('[data-field=WorkOrder_Fields_301_UDF_CHAR14],[data-field=WorkOrder_Fields_301_UDF_CHAR161],[data-field=WorkOrder_Fields_301_UDF_CHAR27]');
    // Escuchar el evento de entrada de texto
    telefono.on('input', function () {
      var campo = jQuery(this)[0].dataset.field;
      // Obtener el valor actual del campo de texto
      var textoIngresado = jQuery(this).val();
      if (textoIngresado !== "") {
        // Restringir solo caracteres numericos
        textoIngresado = textoIngresado.replace(/[^0-9\d]/g, '');
        // Convertir el texto a mayúsculas
        textoIngresado = textoIngresado.toUpperCase();
        //informa que debe ser 7 u 8
        jQuery(this).attr('title', 'El número debe ser de 7 u 10 digitos, si no tiene número telefónico registrar el celular');
        // Verificar si el texto supera los 20 caracteres
        if (textoIngresado.length > 10) {
          // Si supera los 20 caracteres, truncar el texto a 20 caracteres
          textoIngresado = textoIngresado.slice(0, 10);
        }
        //Alerta numero igual al numero de identficacion o fanalca
  
        //Alerta numero igual a Fanalca
        if (textoIngresado == '6515343') {
          alert('El número no puede ser igual al número de Fanalca');
          textoIngresado = "";
        }
        // Actualizar el valor del campo de texto con el texto en mayúsculas y truncado
        //Numero de cedula no debe ser igual al de telefono
        if (textoIngresado == numeroIdentificacion) {
          alert('El número de identificación no puede ser igual al celular');
          $CS.setValue("WorkOrder_Fields_301_UDF_CHAR7", "");
          textoIngresado = "";
        }
        if (textoIngresado.length >= 6) {
          var regex = /^(?:012345|123456|234567|345678|456789|567890|678901|789012|8901234|901234|987654|876543|765432|654321|543210|432109|321098|210987|109876|098765)$/;
          if (regex.test(textoIngresado)) {
            alert('El número no puede ser una cadena de números');
            $CS.setValue(campo, "");
            textoIngresado = "";
          }
        }
        if (textoIngresado.length >= 10) {
          var regex = /^(?!(\d)\1{6}$)\d{10}$/;
          if (!regex.test(textoIngresado)) {
            alert('El número no puede ser consecutivo de números iguales');
            textoIngresado = "";
            $CS.setValue(campo, "");
          }
        }
        jQuery(this).val(textoIngresado);
      }
    });
    telefono.on('blur', function () {
      var valores = {
        "WorkOrder_Fields_301_UDF_CHAR14": "WorkOrder_Fields_301_UDF_CHAR15",
        "WorkOrder_Fields_301_UDF_CHAR27": "WorkOrder_Fields_301_UDF_CHAR28",
        "WorkOrder_Fields_301_UDF_CHAR161": "WorkOrder_Fields_301_UDF_CHAR162"
      };
      var campo = jQuery(this)[0].dataset.field;
      var textoIngresado = jQuery(this).val();
      if (textoIngresado !== "") {
        if (textoIngresado.length == 7 || textoIngresado.length == 10) {
          jQuery(this).val(textoIngresado);
          verificarObligatorio(campo, valores[campo]);
        } else {
          alert('El número de télefono debe ser de 7 o 10 digitos');
          textoIngresado = "";
          $CS.setValue(campo, "");
          jQuery(this).val(textoIngresado);
          verificarObligatorio(campo, valores[campo]);
        }
      }
      verificarObligatorio(campo, valores[campo]);
    });
    //Fin Telefono
  
    //Inicio Celular
    var celular = jQuery('[data-field=WorkOrder_Fields_301_UDF_CHAR15],[data-field=WorkOrder_Fields_301_UDF_CHAR162],[data-field=WorkOrder_Fields_301_UDF_CHAR28]');
    // Escuchar el evento de entrada de texto
    celular.on('input', function () {
      var campo = jQuery(this)[0].dataset.field;
      // Obtener el valor actual del campo de texto
      var textoIngresado = jQuery(this).val();
      if (textoIngresado !== "") {
        // Restringir solo caracteres numericos
        if (textoIngresado.charAt(0) != 3) {
          alert('El primer digito debe ser un 3');
          textoIngresado = "";
        }
        textoIngresado = textoIngresado.replace(/[^0-9\d]/g, '');
        // Esta línea remueve todos los espacios en blanco
        // Convertir el texto a mayúsculas
        textoIngresado = textoIngresado.toUpperCase();
        //informa que debe ser 7 u 8
        jQuery(this).attr('title', 'El número debe ser de 10 digitos, si no tiene número de celular registrar el número local');
        // Verificar si el texto supera los 20 caracteres
        if (textoIngresado.length > 10) {
          // Si supera los 20 caracteres, truncar el texto a 20 caracteres
          textoIngresado = textoIngresado.slice(0, 10);
        }
        //Alerta numero igual al numero de identficacion o fanalca
        if (textoIngresado == numeroIdentificacion) {
          alert('El número no puede ser igual al número de identificación');
          textoIngresado = "";
        }
        //Alerta numero igual a Fanalca
        if (textoIngresado == '6515343') {
          alert('El número no puede ser igual al número de Fanalca');
          textoIngresado = "";
          $CS.setValue(campo, "");
        }
        if (textoIngresado.length >= 7) {
          var regex = /^(?:3456789|3210987)$/;
          if (regex.test(textoIngresado)) {
            alert('El número no puede ser una cadena de números');
            textoIngresado = "";
            $CS.setValue(campo, "");
          }
        }
        if (textoIngresado == '3333333') {
          alert('El celular no puede ser una cadena de números iguales');
          textoIngresado = "";
          $CS.setValue(campo, "");
        }
        // Actualizar el valor del campo de texto con el texto en mayúsculas y truncado
        jQuery(this).val(textoIngresado);
      }
    });
  
    celular.on('blur', function () {
      var valores2 = {
        "WorkOrder_Fields_301_UDF_CHAR15": "WorkOrder_Fields_301_UDF_CHAR14",
        "WorkOrder_Fields_301_UDF_CHAR28": "WorkOrder_Fields_301_UDF_CHAR27",
        "WorkOrder_Fields_301_UDF_CHAR162": "WorkOrder_Fields_301_UDF_CHAR161"
      };
      var campo = jQuery(this)[0].dataset.field;
      var textoIngresado = jQuery(this).val();
      if (textoIngresado !== "") {
        if (textoIngresado.length < 10) {
          if (textoIngresado !== "") {
            alert('El número de celular no puede ser menor a 10 dígitos');
            $CS.setValue(campo, "");
            verificarObligatorio(campo, valores2[campo]);
          }
          textoIngresado = "";
          jQuery(this).val(textoIngresado);
          $CS.setValue(campo, "");
          verificarObligatorio(campo, valores2[campo]);
        }
      }
      verificarObligatorio(campo, valores2[campo]);
    });
    //Fin Celular
  
    //Inicio código postal
    var codPostal = jQuery('[data-field=WorkOrder_Fields_301_UDF_CHAR16],[data-field=WorkOrder_Fields_301_UDF_CHAR29]');
    // Escuchar el evento de entrada de texto
    codPostal.on('input', function () {
      // Obtener el valor actual del campo de texto
      var textoIngresado = jQuery(this).val();
      if (textoIngresado !== "") {
        // Convertir el texto a mayúsculas
        textoIngresado = textoIngresado.replace(/[^0-9\d]/g, '');
        textoIngresado = textoIngresado.toUpperCase();
        //informa que debe ser 7 u 8
        jQuery(this).attr('title', 'El número debe ser de 6 digitos');
        // Verificar si el texto supera los 20 caracteres
        if (textoIngresado.length > 6) {
          // Si supera los 20 caracteres, truncar el texto a 20 caracteres
          textoIngresado = textoIngresado.slice(0, 6);
        }
        // Actualizar el valor del campo de texto con el texto en mayúsculas y truncado
        jQuery(this).val(textoIngresado);
      }
    });
  
    codPostal.on('blur', function () {
      var textoIngresado = jQuery(this).val();
      if (textoIngresado !== "") {
        if (textoIngresado.length < 6) {
          // Si supera los 20 caracteres, truncar el texto a 20 caracteres
          alert("El código postal no puede ser menor a 6 dígitos");
          textoIngresado = "";
        }
        jQuery(this).val(textoIngresado);
      }
    });
    //Fin código postal
  
    //Inicio correo
    var correo = jQuery('[data-field=WorkOrder_Fields_301_UDF_CHAR17],[data-field=WorkOrder_Fields_301_UDF_CHAR163],[data-field=WorkOrder_Fields_301_UDF_CHAR30]');
    correo.on('input', function () {
      var textoIngresado = jQuery(this).val().toLowerCase().trim();
      if (textoIngresado.length > 50) {
        textoIngresado = textoIngresado.slice(0, 50);
        jQuery(this).val(textoIngresado);
      }
    });
    correo.blur(function () {
      var textoIngresado = jQuery(this).val().toLowerCase();
      if (textoIngresado !== "") {
        var regex = /^([A-Za-z0-9._\-]+@[A-Za-z0-9_\-]+\.[A-Za-z.\s]{2,})(;\s*[A-Za-z0-9._\-]+@[A-Za-z0-9_\-]+\.[A-Za-z.\s]{2,})*$/;
        if (regex.test(textoIngresado)) {
          textoIngresado = textoIngresado.replace(/\s/g, '');
          jQuery(this).val(textoIngresado);
        } else {
          alert('Ingrese uno o más correos validos separados por ";", este campo no puede superar los 50 caracteres');
          jQuery(this).val('');
        }
        var regex = /@.*$/;
        var nuevaCorreo = textoIngresado.replace(regex, "");
        if (nuevaCorreo == 'NOTENGOCORREO' || nuevaCorreo == 'NOTIENE' || nuevaCorreo == 'NOTIENECORREO' || nuevaCorreo == 'NO_TIENE_CORREO' || nuevaCorreo == 'NOAPLICA' || nuevaCorreo == 'NN' || nuevaCorreo == 'NO' || nuevaCorreo == 'NODA' || nuevaCorreo == 'NADA' || nuevaCorreo == 'NODEJA' || nuevaCorreo == 'NODIO' || nuevaCorreo == 'NOTENGO' || nuevaCorreo == 'NOTI' || nuevaCorreo == 'NOTIEE' || nuevaCorreo == 'NOTIEN') {
          alert("Correo Electrónico invalido");
          // $CS.setValue("WorkOrder_Fields_301_UDF_CHAR17","");
          jQuery(this).val("");
        }
      }
    });
    //Fin correo
  
    //Inicio Actividad economica
    var celular = jQuery('[data-field=WorkOrder_Fields_301_UDF_CHAR19]');
    // Escuchar el evento de entrada de texto
    celular.on('input', function () {
      // Obtener el valor actual del campo de texto
      var textoIngresado = jQuery(this).val();
      // Restringir solo caracteres numericos
      textoIngresado = textoIngresado.replace(/[^0-9]/g, '');
      // Convertir el texto a mayúsculas
      textoIngresado = textoIngresado.toUpperCase();
      //informa que debe ser 7 u 8
      jQuery(this).attr('title', 'Corresponde al código de la actividad económica principal que se especifica en el RUT');
      // Verificar si el texto supera los 4 caracteres
      if (textoIngresado.length > 4) {
        // Si supera los 20 caracteres, truncar el texto a 20 caracteres
        textoIngresado = textoIngresado.slice(0, 4);
      }
      // Actualizar el valor del campo de texto con el texto en mayúsculas y truncado
      jQuery(this).val(textoIngresado);
    });
    //Fin actividad economica
    //Inicio  Estado del Cliente 
    jQuery.getJSON({
      url: '/custom/scripts/CustStatus.json',
      success: function (datas) {
        var target = datas;
        $CS.element("WorkOrder_Fields_301_UDF_CHAR222").select2({
          data: target,
          placeholder: "Seleccione estado del cliente...",
          allowClear: true
        });
        $CS.element("WorkOrder_Fields_301_UDF_CHAR21").select2({
          data: target,
          placeholder: "Seleccione estado del cliente...",
          allowClear: true
        });
        $CS.element("WorkOrder_Fields_301_UDF_CHAR221").select2({
          data: target,
          placeholder: "Seleccione estado del tercero...",
          allowClear: true
        });
      }
    });
    //Fin  Estado del Cliente 
  
    //inicio fecha creacion 
    $CS.setValue("WorkOrder_Fields_301_UDF_CHAR18", obtenerFechaSistema());
    $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR18"]);
    //fin fecha creacion 
  
    //Inicio cupo crédito
    var cupoCredito = jQuery('[data-field=WorkOrder_Fields_301_UDF_CHAR35]');
    // Escuchar el evento de entrada de texto
    cupoCredito.on('input', function () {
      // Obtener el valor actual del campo de texto
      var textoIngresado = jQuery(this).val();
      // Restringir solo caracteres numericos
      textoIngresado = textoIngresado.replace(/[^0-9]/g, '');
      // Convertir el texto a mayúsculas
      textoIngresado = textoIngresado.toUpperCase();
      // Actualizar el valor del campo de texto con el texto en mayúsculas y truncado
      jQuery(this).val(textoIngresado);
    });
    //Fin cupo crédito
  
    //Inicio numero cliente coorporativo
    var NumIdentificacion = jQuery('[data-field=WorkOrder_Fields_301_UDF_CHAR146]');
    NumIdentificacion.blur(function () {
      var textoIngresado = jQuery(this).val();
      if (!textoIngresado.length == numeroIdentificacion.length) {
        alert('La cantidad de digitos del número de cliente coorporativo debe ser igual al número de identificación');
        jQuery(this).val('');
      }
    });
    //Fin numero cliente coorporativo
  
    //inicio vigenciaCupo 
    $CS.setValue("WorkOrder_Fields_301_UDF_CHAR36", obtenerFechaSistema());
    $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR36"]);
    //fin vigenciaCupo
    //Inicio CIIU
    jQuery.getJSON({
      url: '/custom/scripts/CIIU.json',
      success: function (datas) {
        var target = datas;
        $CS.element("WorkOrder_Fields_301_UDF_CHAR19").select2({
          data: target,
          placeholder: "Seleccione Actividad económica principal...",
          allowClear: true
        });
      }
    });
    //Fin CIIU 
  
  
    //Inicio llenar VE y POS
    $CS.element("WorkOrder_Fields_301_UDF_CHAR214").on('change', function () {
      var ZRP = jQuery(this).val();
      jQuery.getJSON({
        url: '/custom/scripts/ZRP_POS.json',
        success: function (datas) {
          var target = datas;
          $CS.setValue("WorkOrder_Fields_301_UDF_CHAR128", target[ZRP]);
        }
      });
      $CS.setValue("WorkOrder_Fields_301_UDF_CHAR215", ZRP);
    });
    //Fin llenar VE y POS
  
    //Inicio llenar CAN, ASV y DST
    $CS.element("WorkOrder_Fields_301_UDF_CHAR148").on('change', function () {
      var URL = jQuery(this).val();
      var tipoCLi = $CS.getText("WorkOrder_Fields_301_UDF_CHAR225");
      if (tipoCLi == "Cliente Repuestos Motos") {
        jQuery.getJSON({
          url: '/custom/scripts/CL1_CAN.json',
          success: function (datas) {
            var target = datas;
            $CS.setValue("WorkOrder_Fields_301_UDF_CHAR212", target[URL]);
          }
        });
      } else {
        $CS.setValue("WorkOrder_Fields_301_UDF_CHAR212", "-");
      }
  
      jQuery.getJSON({
        url: '/custom/scripts/CL1_ASV.json',
        success: function (datas) {
          var target = datas;
          $CS.setValue("WorkOrder_Fields_301_UDF_CHAR149", target[URL]);
        }
      });
      jQuery.getJSON({
        url: '/custom/scripts/CL1_DST.json',
        success: function (datas) {
          var target = datas;
          $CS.setValue("WorkOrder_Fields_301_UDF_CHAR150", target[URL]);
        }
      });
    });
    //Fin llenar CAN, ASV y DST
  
    //Inicio modificar persona natural
  
    var tipoPer = $CS.getValue("WorkOrder_Fields_301_UDF_CHAR1");
    if (tipoPer !== "") {
      if (this.value != "2") {
        habilitarPersonaJuridica();
        infoPersoneriasObligatorio();
      } else if (this.value != "1") {
        habilitarPersonaNatural();
        infoPersoneriasObligatorio();
      }
    }
  
    $CS.element("WorkOrder_Fields_301_UDF_CHAR1").on('change', function () {
      var Accion = $CS.getValue("WorkOrder_Fields_301_UDF_CHAR82");
      if (Accion !== "Inactivación" && Accion !== "Activación") {
        if (this.value != "2") {
          habilitarPersonaJuridica();
          infoPersoneriasObligatorio();
        } else if (this.value != "1") {
          habilitarPersonaNatural();
          infoPersoneriasObligatorio();
        }
      }
    });
    //Fin modificar persona natural 
  
    //
    //---FUNCIONES---
    //
    function habilitarPersonaJuridica() {
      $CS.enableField(["WorkOrder_Fields_301_UDF_CHAR3"]);
      $CS.enableField(["WorkOrder_Fields_301_UDF_CHAR4"]);
      $CS.enableField(["WorkOrder_Fields_301_UDF_CHAR5"]);
      $CS.mandateField(["WorkOrder_Fields_301_UDF_CHAR3"]);
      $CS.mandateField(["WorkOrder_Fields_301_UDF_CHAR5"]);
      $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR2"]);
      $CS.nonMandateField(["WorkOrder_Fields_301_UDF_CHAR2"]);
    }
  
    function habilitarPersonaNatural() {
      $CS.enableField(["WorkOrder_Fields_301_UDF_CHAR2"]);
      $CS.mandateField(["WorkOrder_Fields_301_UDF_CHAR2"]);
      $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR3"]);
      $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR4"]);
      $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR5"]);
      $CS.nonMandateField(["WorkOrder_Fields_301_UDF_CHAR3"]);
      $CS.nonMandateField(["WorkOrder_Fields_301_UDF_CHAR4"]);
      $CS.nonMandateField(["WorkOrder_Fields_301_UDF_CHAR5"]);
    }
  
    function deshabilitarPersonerias() {
      $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR2"]);
      $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR3"]);
      $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR4"]);
      $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR5"]);
    }
  
    function infoPersoneriasObligatorio() {
      $CS.mandateField(["WorkOrder_Fields_301_UDF_CHAR6"]);
      $CS.mandateField(["WorkOrder_Fields_301_UDF_CHAR7"]);
      $CS.mandateField(["WorkOrder_Fields_301_UDF_CHAR8"]);
      $CS.mandateField(["WorkOrder_Fields_301_UDF_CHAR9"]);
      $CS.mandateField(["WorkOrder_Fields_301_UDF_CHAR10"]);
      $CS.mandateField(["WorkOrder_Fields_301_UDF_CHAR13"]);
      $CS.mandateField(["WorkOrder_Fields_301_UDF_CHAR16"]);
      $CS.mandateField(["WorkOrder_Fields_301_UDF_CHAR17"]);
      $CS.mandateField(["WorkOrder_Fields_301_UDF_CHAR18"]);
      $CS.mandateField(["WorkOrder_Fields_301_UDF_CHAR19"]);
    }
  
    //Funcion repuestos motos
    function deshabilitarCamposCLientes() {
      $CS.element("WorkOrder_Fields_301_UDF_CHAR148").select2("val", "");
      $CS.element("WorkOrder_Fields_301_UDF_CHAR148").select2("enable", false);
      $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR148"]);
      $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR212"]);
      $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR149"]);
      $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR150"]);
      $CS.element("WorkOrder_Fields_301_UDF_CHAR214").select2("val", "");
      $CS.element("WorkOrder_Fields_301_UDF_CHAR214").select2("enable", false);
      $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR214"]);
      $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR215"]);
      $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR128"]);
      $CS.element("WorkOrder_Fields_301_UDF_CHAR154").select2("val", "");
      $CS.element("WorkOrder_Fields_301_UDF_CHAR154").select2("enable", false);
      $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR154"]);
      $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR216"]);
      $CS.element("WorkOrder_Fields_301_UDF_CHAR217").select2("val", "");
      $CS.element("WorkOrder_Fields_301_UDF_CHAR217").select2("enable", false);
      $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR217"]);
      $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR218"]);
      $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR152"]);
      $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR151"]);
    }
  
    function habilitarRepuestosMotos(evento) {
      if (evento == "new") {
        resetValoresCriterios();
      }
      deshabilitarCamposCLientes();
      //Quitar campos obligatorios
      $CS.nonMandateField(["WorkOrder_Fields_301_UDF_CHAR211"]);
      $CS.nonMandateField(["WorkOrder_Fields_301_UDF_CHAR212"]);
      $CS.nonMandateField(["WorkOrder_Fields_301_UDF_CHAR213"]);
      $CS.nonMandateField(["WorkOrder_Fields_301_UDF_CHAR149"]);
      $CS.nonMandateField(["WorkOrder_Fields_301_UDF_CHAR150"]);
      $CS.nonMandateField(["WorkOrder_Fields_301_UDF_CHAR153"]);
  
      $CS.element("WorkOrder_Fields_301_UDF_CHAR148").select2("enable", true);
      $CS.enableField(["WorkOrder_Fields_301_UDF_CHAR148"]);
      $CS.element("WorkOrder_Fields_301_UDF_CHAR214").select2("enable", true);
      $CS.enableField(["WorkOrder_Fields_301_UDF_CHAR214"]);
      $CS.enableField(["WorkOrder_Fields_301_UDF_CHAR215"]);
      $CS.enableField(["WorkOrder_Fields_301_UDF_CHAR128"]);
      $CS.enableField(["WorkOrder_Fields_301_UDF_CHAR154"]);
      $CS.element("WorkOrder_Fields_301_UDF_CHAR154").select2("enable", true);
      $CS.enableField(["WorkOrder_Fields_301_UDF_CHAR216"]);
      $CS.element("WorkOrder_Fields_301_UDF_CHAR217").select2("enable", true);
      $CS.enableField(["WorkOrder_Fields_301_UDF_CHAR217"]);
      $CS.enableField(["WorkOrder_Fields_301_UDF_CHAR218"]);
    }
    //Funcion clientes motos
    function habilitarClientesMotos(evento) {
      if (evento == "new") {
        resetValoresCriterios();
      }
      deshabilitarCamposCLientes();
      //Quitar campos obligatorios
      $CS.nonMandateField(["WorkOrder_Fields_301_UDF_CHAR214"]);
      $CS.nonMandateField(["WorkOrder_Fields_301_UDF_CHAR215"]);
      $CS.nonMandateField(["WorkOrder_Fields_301_UDF_CHAR128"]);
      $CS.nonMandateField(["WorkOrder_Fields_301_UDF_CHAR216"]);
  
      $CS.element("WorkOrder_Fields_301_UDF_CHAR148").select2("enable", true);
      $CS.enableField(["WorkOrder_Fields_301_UDF_CHAR148"]);
      $CS.element("WorkOrder_Fields_301_UDF_CHAR154").select2("enable", true);
      $CS.enableField(["WorkOrder_Fields_301_UDF_CHAR154"]);
      $CS.enableField(["WorkOrder_Fields_301_UDF_CHAR152"]);
      $CS.enableField(["WorkOrder_Fields_301_UDF_CHAR151"]);
    }
  
  
    function resetValoresCriterios() {
      $CS.setValue("WorkOrder_Fields_301_UDF_CHAR148", "");
      $CS.setValue("WorkOrder_Fields_301_UDF_CHAR212", "");
      $CS.setValue("WorkOrder_Fields_301_UDF_CHAR149", "");
      $CS.setValue("WorkOrder_Fields_301_UDF_CHAR150", "");
      $CS.setValue("WorkOrder_Fields_301_UDF_CHAR214", "");
      $CS.setValue("WorkOrder_Fields_301_UDF_CHAR215", "");
      $CS.setValue("WorkOrder_Fields_301_UDF_CHAR128", "");
      $CS.setValue("WorkOrder_Fields_301_UDF_CHAR154", "");
      $CS.setValue("WorkOrder_Fields_301_UDF_CHAR216", "");
      $CS.setValue("WorkOrder_Fields_301_UDF_CHAR217", "");
      $CS.setValue("WorkOrder_Fields_301_UDF_CHAR218", "");
      $CS.setValue("WorkOrder_Fields_301_UDF_CHAR152", "");
      $CS.setValue("WorkOrder_Fields_301_UDF_CHAR151", "");
    }
  
    // Función para obtener la fecha del sistema en formato AAAMMDD
    function obtenerFechaSistema() {
      var today = new Date();
      var year = today.getFullYear().toString();
      var month = (today.getMonth() + 1).toString().padStart(2, '0');
      var day = today.getDate().toString().padStart(2, '0');
      return year + month + day;
    }
  
    //Inicio WMT
    $CS.element("WorkOrder_Fields_301_UDF_CHAR13").on('change', function () {
      var x = $CS.getValue("WorkOrder_Fields_301_UDF_CHAR13");
      fetch('/custom/scripts/WMT.json')
        .then(function (res) {
          res.json()
            .then(function (data) {
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR216", data[x]);
            });
        });
    });
    //Fin WMT
  
    //direccion
    // Obtener los campos de entrada
    var camposTest = ['WorkOrder_Fields_301_UDF_CHAR10', 'WorkOrder_Fields_301_UDF_CHAR157', 'WorkOrder_Fields_301_UDF_CHAR24'];
    // Iterar sobre cada campo de entrada
    camposTest.each(function (selector) {
      var campo = selector;
  
      // Crear el botón con el atributo data-filed1
      var boton = jQuery('<button>', {
        text: 'Insertar dirección',
        'data-field1': campo,
        'type': 'button'
      });
  
      // Insertar el botón después del campo de entrada
      jQuery('[data-field=' + selector + ']').after(boton);
    });
  
    jQuery('[data-field=WorkOrder_Fields_301_UDF_CHAR10],[data-field=WorkOrder_Fields_301_UDF_CHAR157],[data-field=WorkOrder_Fields_301_UDF_CHAR24]').attr("readonly", "true");
    jQuery(document).on('click', '[data-field1="WorkOrder_Fields_301_UDF_CHAR10"], [data-field1="WorkOrder_Fields_301_UDF_CHAR157"], [data-field1="WorkOrder_Fields_301_UDF_CHAR24"]', function () {
      var campoSel = jQuery(this).attr("data-field1");
      if (jQuery('#miDiv').length === 0) {
        var inputWidth = jQuery(this).outerWidth() * 2;
        var inputHeight = jQuery(this).outerHeight();
        var nuevoDiv = jQuery('<div>', {
          id: 'miDiv',
          html: '<div style="display: flex; justify-content: center"> <div style="display: flex; flex-direction: column; width: 90%"> <div style=" padding: 12px; display: flex; align-items: center; gap: 12px; flex-wrap: wrap; justify-content: center; " > <div><label for="DirGen48">VIA PRINCIPAL:</label></div> <div> <select id="DirGenc48" class="DirClass" onchange="getdir()"> <option value="" selected>Seleccione...</option> <option value="ADL">ADELANTE</option> <option value="AD">ADMINISTRACION</option> <option value="AER">AEROPUERTO</option> <option value="AG">AGENCIA</option> <option value="AGP">AGRUPACION</option> <option value="ALD">AL LADO</option> <option value="ALM">ALMACEN</option> <option value="AL">ALTILLO</option> <option value="APTDO">APARTADO</option> <option value="AP">APARTAMENTO</option> <option value="ATR">ATRÁS</option> <option value="AUT">AUTOPISTA</option> <option value="AV">AVENIDA</option> <option value="AC">AVENIDA CALLE</option> <option value="AK">AVENIDA CARRERA</option> <option value="BRR">BARRIO</option> <option value="BL">BLOQUE</option> <option value="BG">BODEGA</option> <option value="BLV">BOULEVAR</option> <option value="CL">CALLE</option> <option value="CN">CAMINO</option> <option value="CR">CARRERA</option> <option value="CRT">CARRETERA</option> <option value="CA">CASA</option> <option value="CAS">CASERIO</option> <option value="CEL">CELULA</option> <option value="CEN">CENTRO</option> <option value="CC">CENTRO COMERCIAL</option> <option value="CIR">CIRCULAR</option> <option value="CRV">CIRCUNVALAR</option> <option value="CD">CIUDADELA</option> <option value="CONJ">CONJUNTO</option> <option value="CON">CONJUNTO RESIDENCIAL</option> <option value="CS">CONSULTORIO</option> <option value="CRR">CORREGIMIENTO</option> <option value="DPTO">DEPARTAMENTO</option> <option value="DP">DEPOSITO</option> <option value="DS">DEPOSITO SOTANO</option> <option value="DG">DIAGONAL</option> <option value="ED">EDIFICIO</option> <option value="EN">ENTRADA</option> <option value="ESC">ESCALERA</option> <option value="ESQ">ESQUINA</option> <option value="ESTE">ESTE</option> <option value="ET">ETAPA</option> <option value="EX">EXTERIOR</option> <option value="FCA">FINCA</option> <option value="GJ">GARAJE</option> <option value="GS">GARAJE SOTANO</option> <option value="GT">GLORIETA</option> <option value="HC">HACIENDA</option> <option value="HG">HANGAR</option> <option value="IP">INSPECCION DE POLICIA</option> <option value="IPD">INSPECCION DEPARTAMENTAL</option> <option value="IPM">INSPECCION MUNICIPAL</option> <option value="IN">INTERIOR</option> <option value="KM">KILOMETRO</option> <option value="LC">LOCAL</option> <option value="LM">LOCAL MEZZANINE</option> <option value="LT">LOTE</option> <option value="MZ">MANZANA</option> <option value="MN">MEZZANINE</option> <option value="MD">MODULO</option> <option value="MJ">MOJON</option> <option value="MLL">MUELLE</option> <option value="MCP">MUNICIPIO</option> <option value="NORTE">NORTE</option> <option value="OCC">OCCIDENTE</option> <option value="OESTE">OESTE</option> <option value="OF">OFICINA</option> <option value="O">ORIENTE</option> <option value="(!)">OTRA NOMENCLATURA</option> <option value="PRJ">PARAJE</option> <option value="PA">PARCELA</option> <option value="PW">PARK WAY</option> <option value="PAR">PARQUE</option> <option value="PQ">PARQUEADERO</option> <option value="PJ">PASAJE</option> <option value="PS">PASEO</option> <option value="PH">PENTHOUSE</option> <option value="P">PISO</option> <option value="PL">PLANTA</option> <option value="POR">PORTERIA</option> <option value="POS">POSTE</option> <option value="PM">PLAZA DE MERCADO</option> <option value="PD">PREDIO</option> <option value="PN">PUENTE</option> <option value="PT">PUESTO</option> <option value="RP">ROUND POINT</option> <option value="SA">SALON</option> <option value="SC">SALON COMUNAL</option> <option value="SEC">SECTOR</option> <option value="SS">SEMISOTANO</option> <option value="SL">SOLAR</option> <option value="ST">SOTANO</option> <option value="SU">SUITE</option> <option value="SM">SUPERMANZANA</option> <option value="SUR">SUR</option> <option value="TER">TERMINAL</option> <option value="TZ">TERRAZA</option> <option value="TO">TORRE</option> <option value="TV">TRANSVERSAL</option> <option value="UN">UNIDAD</option> <option value="UR">UNIDAD RESIDENCIAL</option> <option value="URB">URBANIZACION</option> <option value="VTE">VARIANTE</option> <option value="VDA">VEREDA</option> <option value="VIA">VIA</option> <option value="NOMBRE DE LA VIA">VIAS DE NOMBRE COMUN</option> <option value="ZN">ZONA</option> <option value="ZF">ZONA FRANCA</option> </select> </div> <div> <input style=" background-color: white; color: black; border: 1px solid gray; padding: 4px; border-radius: 2px; appearance: none; -moz-appearance: textfield; padding: 6px; " type="text" id="DirGennc48" oninput="getdir()" placeholder="¿CON NOMBRE?" value="" /> </div> <div> <input style=" background-color: white; color: black; border: 1px solid gray; padding: 4px; border-radius: 2px; appearance: none; -moz-appearance: textfield; padding: 6px; " type="number" id="DirGenn48" oninput="getdir()" placeholder="#" value="" /> </div> <div> <select class="DirClass" id="DirGenbis48" onchange="getdir()" style="width: 100%; height: 36px" > <option value="" selected>Seleccione...</option> <option value="BIS">BIS</option> </select> </div> <div> <select class="DirClass" id="DirGenl48" onchange="getdir()" style="width: 100%; height: 36px" > <option value="" selected>Seleccione...</option> <option value="A">A</option> <option value="B">B</option> <option value="C">C</option> <option value="D">D</option> <option value="E">E</option> <option value="F">F</option> <option value="G">G</option> <option value="H">H</option> <option value="I">I</option> <option value="J">J</option> <option value="K">K</option> <option value="L">L</option> <option value="M">M</option> <option value="N">N</option> <option value="O">O</option> <option value="P">P</option> <option value="Q">Q</option> <option value="R">R</option> <option value="S">S</option> <option value="T">T</option> <option value="U">U</option> <option value="V">V</option> <option value="W">W</option> <option value="X">X</option> <option value="Y">Y</option> <option value="Z">Z</option> </select> </div> <div> <select class="DirClass" id="DirGenpc48" onchange="getdir()" style="width: 100%; height: 36px" > <option value="" selected>Seleccione...</option> <option value="N">NORTE</option> <option value="S">SUR</option> <option value="E">ESTE</option> <option value="O">OESTE</option> </select> </div> </div> <div style=" padding: 12px; display: flex; gap: 12px; align-items: center; flex-wrap: wrap; justify-content: center; " > <div><label for="DirGen48">VIA GENERADORA:</label></div> <div> <input style=" background-color: white; color: black; border: 1px solid gray; padding: 4px; border-radius: 2px; appearance: none; -moz-appearance: textfield; padding: 6px; " type="number" id="DirGennd48" oninput="getdir()" placeholder="NUMERO" /> </div> <div> <select class="DirClass" id="DirGenbisd48" onchange="getdir()" style="width: 100%; height: 36px" > <option value="" selected>Seleccione...</option> <option value="BIS">BIS</option> </select> </div> <div> <select class="DirClass" id="DirGenld48" onchange="getdir()" style="width: 100%; height: 36px" > <option value="" selected>Seleccione...</option> <option value="A">A</option> <option value="B">B</option> <option value="C">C</option> <option value="D">D</option> <option value="E">E</option> <option value="F">F</option> <option value="G">G</option> <option value="H">H</option> <option value="I">I</option> <option value="J">J</option> <option value="K">K</option> <option value="L">L</option> <option value="M">M</option> <option value="N">N</option> <option value="O">O</option> <option value="P">P</option> <option value="Q">Q</option> <option value="R">R</option> <option value="S">S</option> <option value="T">T</option> <option value="U">U</option> <option value="V">V</option> <option value="W">W</option> <option value="X">X</option> <option value="Y">Y</option> <option value="Z">Z</option> </select> </div> <div> <input style=" background-color: white; color: black; border: 1px solid gray; padding: 4px; border-radius: 2px; appearance: none; -moz-appearance: textfield; padding: 6px; " type="number" id="DirGenplaca48" oninput="getdir()" placeholder="PLACA" /> </div> <div> <select class="DirClass" id="DirGenpcd48" onchange="getdir()" style="width: 100%; height: 36px" > <option value="" selected>Seleccione...</option> <option value="N">NORTE</option> <option value="S">SUR</option> <option value="E">ESTE</option> <option value="O">OESTE</option> </select> </div> </div> <div style="display: flex; justify-content: center; margin-top: 12px"> <span style=" border-radius: 12px; border: solid black 1px; background-color: green; color: white; padding: 12px 24px; text-align: center; cursor: pointer; " class="cerrarDivDir" > Guardar Dirección </span> </div> </div> </div> <script> function getdir() { var nomenclatura = ""; var nomcalle = ""; var numerop = ""; var bis = " "; var letra = ""; var puntocardinal = ""; var numerod = ""; var bisd = ""; var letrad = ""; var placa = ""; var puntocardinald = ""; nomenclatura = jQuery("#DirGenc48").val(); nomcalle = jQuery("#DirGennc48").val(); numerop = jQuery("#DirGenn48").val(); bis = jQuery("#DirGenbis48").val(); letra = jQuery("#DirGenl48").val(); puntocardinal = jQuery("#DirGenpc48").val(); numerod = jQuery("#DirGennd48").val(); bisd = jQuery("#DirGenbisd48").val(); letrad = jQuery("#DirGenld48").val(); placa = jQuery("#DirGenplaca48").val(); puntocardinald = jQuery("#DirGenpcd48").val(); if (nomenclatura == null) { nomenclatura = ""; } if (nomcalle == null) { nomcalle = ""; } if (numerop == null) { numerop = ""; } if (bis == null) { bis = ""; } if (letra == null) { letra = ""; } if (puntocardinal == null) { puntocardinal = ""; } if (numerod == null) { numerod = ""; } if (bisd == null) { bisd = ""; } if (letrad == null) { letrad = ""; } if (placa == null) { placa = ""; } if (puntocardinald == null) { puntocardinald = ""; } let textcomplete = nomenclatura + " " + nomcalle + " " + numerop + letra + " " + bis + " " + puntocardinal + " " + numerod + letrad + " " + bisd + " " + placa + puntocardinald; textcomplete = textcomplete.split(" ").join(" "); $CS.setValue( "' + campoSel + '", textcomplete.replace(/ +/g, " ").toUpperCase() ); } jQuery(".DirClass").select2({ placeholder: "Seleccione...", allowClear: true, }); </script>'
        });
  
        nuevoDiv.css({
          'display': 'none',
          'border': '1px solid #000',
          'padding': '10px',
          'position': 'absolute',
          'width': '80vw',
          'top': jQuery(this).offset().top + jQuery(this).outerHeight() + 'px',
          'left': '10%',
          'z-index': '1000',
          'background-color': 'white',
          'border-radius': '24px',
          'box-shadow': '0px 0px 15px 3px rgba(0, 0, 0, 0.4)'
        });
  
        /*         nuevoDiv.find('.cerrarDivDir').css({
                       'position': 'absolute',
                       'bot': '5px',
                       'right': '50%',
                       'cursor': 'pointer'
                   });*/
        jQuery('body').append(nuevoDiv);
  
        nuevoDiv.fadeIn();
      }
  
  
      jQuery('body').on('click', '#miDiv .cerrarDivDir', function () {
        jQuery('#miDiv').fadeOut(function () {
          jQuery(this).remove();
        });
      });
    });
    //fin direccion 
  
    //inspector
    jQuery('[data-field=WorkOrder_Fields_301_UDF_CHAR7],[data-field=WorkOrder_Fields_301_UDF_CHAR2]').on('blur', function () {
  
      var tipoPer = $CS.getValue("WorkOrder_Fields_301_UDF_CHAR1");
      var Accion = $CS.getText("WorkOrder_Fields_301_UDF_CHAR82");
      var nit = $CS.getValue("WorkOrder_Fields_301_UDF_CHAR7");
  
      if (tipoPer == "2") {
        razonSocial = $CS.getValue("WorkOrder_Fields_301_UDF_CHAR2");
      } else {
        razonSocial = $CS.getValue("WorkOrder_Fields_301_UDF_CHAR5") + " "
          + $CS.getValue("WorkOrder_Fields_301_UDF_CHAR3") + " " + $CS.getValue("WorkOrder_Fields_301_UDF_CHAR4");
      }
  
      if (Accion === 'Creación' && nit !== '' && razonSocial !== '') {
        // URL de la API inspektor
        var apiUrl = 'https://inspektor.datalaft.com:2100/api/ConsultaPrincipal';
        // Token de autorización Bearer
        var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV1NfRmFuYWxjYSAgICAgICAgICAiLCJuYmYiOjE3MDI5NDA3MDIsImV4cCI6MTczNDQ5ODMwMiwiaWF0IjoxNzAyOTQwNzAyLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo0NDM5OC8iLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo0NDM5OC8ifQ.kIyjN8dVPAjEZaDlQAG7Rx3LX-HXnfynsT6gwc6whqg';
        // Datos en formato JSON que deseas enviar en el cuerpo de la solicitud
        var requestData = {
          nombre: razonSocial,
          identificacion: nit,
          cantidadPalabras: '',
          tienePrioridad_4: true
        };
  
        jQuery.ajax({
          url: apiUrl,
          type: 'POST',
          dataType: 'json',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json' // Indica que estás enviando datos JSON
          },
  
  
          data: JSON.stringify(requestData), // Convierte el objeto a JSON
          success: function (data) {
            // Maneja la respuesta JSON aquí
            if (data.cantCoincidencias !== 0) {
              alert('Este tercero se encuentra en almenos una lista restrictiva, se enviará una notificación de aprobación a un oficial de cumplimiento para continuar con la solicitud una vez esta se haya guardado.');
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR226", "SI");
            } else {
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR226", "OK");
            }
          },
          error: function (error) {
            // Maneja los errores aquí
            console.error('Error:', error);
          }
        });
      }
    });
  
  
    //select 2 general  
    var rand = Math.random();
    jQuery.ajax({
      url: '/custom/scripts/select2_ter2.json?v=' + rand,
      type: 'GET',
      dataType: 'json',
      success: async function (json) {
        try {
          for (const select2Item of json.select2) {
            const data = await new Promise((resolve, reject) => {
              jQuery.ajax({
                url: apiUrl,
                type: 'POST',
                headers: {
                  'Authorization': 'Basic ' + base64Credentials,
                  'Content-Type': 'application/json'
                },
                data: JSON.stringify(select2Item.query[0]),
                dataType: 'json',
                success: function (data) {
                  resolve(data);
                },
                error: function (xhr, textStatus, errorThrown) {
                  reject(errorThrown);
                }
              });
            });
  
            const select2Data = [];
            for (const row of data.row) {
              const value = row.value;
              const parts = value.split(';');
              if (select2Item.filter.length !== 0) {
                if (parts.length >= 4) {
                  const id = parts[2];
                  const text = parts[3];
                  const Allowed = select2Item.filter;
                  if (Allowed.includes(id)) {
                    select2Data.push({
                      id: id,
                      text: id + ' - ' + text
                    });
                  }
                }
              } else {
                if (parts.length >= 4) {
                  const id = parts[2];
                  const text = parts[3];
                  select2Data.push({
                    id: id,
                    text: id + ' - ' + text
                  });
                }
              }
            }
  
            select2Data.sort((a, b) => (a.id > b.id) ? 1 : -1);
  
            for (const queryFields of select2Item.fields) {
              $CS.element(queryFields).select2({
                data: select2Data,
                placeholder: select2Item.placeholder,
                allowClear: true
              });
            }
          }
  
          jQuery('#freezeAgentConfig').remove();
        } catch (error) {
          console.error('Error:', error);
        }
      },
      error: function (xhr, status, error) {
        console.error('Error al cargar el archivo JSON:', status, error);
      }
    });
  
  
    //obtener sucursales
    jQuery('[data-field=WorkOrder_Fields_301_UDF_CHAR7]').on('blur', function () {
  
      var nit = $CS.getValue("WorkOrder_Fields_301_UDF_CHAR7");
      var Accion = $CS.getText("WorkOrder_Fields_301_UDF_CHAR82");
      if (Accion !== 'Creación' && Accion !== 'Sin especificar' && nit !== '') {
        jQuery("body").append(miDiv);
  
  
        jQuery.ajax({
          url: apiUrl,
          type: 'POST',
          headers: {
            'Authorization': 'Basic ' + base64Credentials,
            'Content-Type': 'application/json'
          },
          data: JSON.stringify({
            "filter": "CONSULTAS_INT_GOBDAT",
            "maestro": "F201_ID_SUCURSAL",
            "cia": "1",
            "parametro": nit
          }),
          dataType: 'json',
          success: function (data) {
            const select2Data = [];
  
            if (Array.isArray(data.row) && data.row.length !== 0) {
              if (data.row.length !== 0) {
                for (const row of data.row) {
                  const value = row.value;
                  const parts = value.split(';');
                  if (parts.length > 1) {
                    const id = parts[1];
                    const text = parts[3];
                    select2Data.push({
                      id: id,
                      text: id + ' - ' + text
                    });
                  }
  
                }
                select2Data.sort((a, b) => (a.id > b.id) ? 1 : -1);
                // Obtener el id más grande
                const ultimoId = parseInt(select2Data[select2Data.length - 1].id);
  
                // Crear el nuevo id
                let nuevoId;
                if (ultimoId < 100) {
                  nuevoId = '00' + (ultimoId + 1);
                } else {
                  nuevoId = (ultimoId + 1).toString().padStart(3, '0');
                }
  
                // Agregar la nueva opción al objeto select2Data
                select2Data.push({
                  id: nuevoId,
                  text: nuevoId + ' - Nueva sucursal'
                });
                select2Data.sort((a, b) => (a.id > b.id) ? 1 : -1);
                $CS.element("WorkOrder_Fields_301_UDF_CHAR20").select2({
                  data: select2Data,
                  placeholder: "Seleccione sucursal...",
                  allowClear: true
                });
                $CS.enableField(["WorkOrder_Fields_301_UDF_CHAR20"]);
                jQuery('#freezeAgentConfig').remove();
  
                //seleccionar primera sucursal del retorno inicial
                const FirstSuc = data.row[0].value.split(';');
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR20", FirstSuc[1].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR21", FirstSuc[2].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR22", FirstSuc[3].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR23", FirstSuc[25].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR24", FirstSuc[26].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR25", FirstSuc[27]);
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR145", FirstSuc[29].trim() + "-" + FirstSuc[30].trim() + "-" + FirstSuc[31].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR28", FirstSuc[48].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR27", FirstSuc[33].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR26", FirstSuc[32].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR29", FirstSuc[35].trim());
                /////////////////
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR30", reemplazarCorreos(FirstSuc[36].trim()));
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR31", FirstSuc[4].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR32", FirstSuc[46].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR33", FirstSuc[5].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR34", FirstSuc[7].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR35", FirstSuc[9].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR36", FirstSuc[42].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR146", FirstSuc[10].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR147", FirstSuc[11].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR239", FirstSuc[37].trim());
                CriteriosSuc(FirstSuc[1], nit);
                verificarObligatorio("WorkOrder_Fields_301_UDF_CHAR27", "WorkOrder_Fields_301_UDF_CHAR28");
  
  
              }
            } else if (data.row.value) {
              var line = data.row.value.split(';');
              if (line.length !== 0) {
                const id = line[1];
                const text = line[3];
                select2Data.push({
                  id: id,
                  text: id + ' - ' + text
                });
                select2Data.sort((a, b) => (a.id > b.id) ? 1 : -1);
                // Obtener el id más grande
                const ultimoId = parseInt(select2Data[select2Data.length - 1].id);
  
                // Crear el nuevo id
                let nuevoId;
                if (ultimoId < 100) {
                  nuevoId = '00' + (ultimoId + 1);
                } else {
                  nuevoId = (ultimoId + 1).toString().padStart(3, '0');
                }
  
                // Agregar la nueva opción al objeto select2Data
                select2Data.push({
                  id: nuevoId,
                  text: nuevoId + ' - Nueva sucursal'
                });
                select2Data.sort((a, b) => (a.id > b.id) ? 1 : -1);
                $CS.element("WorkOrder_Fields_301_UDF_CHAR20").select2({
                  data: select2Data,
                  placeholder: "Seleccione sucursal...",
                  allowClear: true
                });
                $CS.enableField(["WorkOrder_Fields_301_UDF_CHAR20"]);
                jQuery('#freezeAgentConfig').remove();
  
                //seleccionar primera sucursal del retorno inicial
                const FirstSuc = line;
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR20", FirstSuc[1].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR21", FirstSuc[2].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR22", FirstSuc[3].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR23", FirstSuc[25].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR24", FirstSuc[26].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR25", FirstSuc[27].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR145", FirstSuc[29].trim() + "-" + FirstSuc[30].trim() + "-" + FirstSuc[31].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR28", FirstSuc[48].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR27", FirstSuc[33].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR26", FirstSuc[32].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR29", FirstSuc[35].trim());
                //////////////////
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR30", reemplazarCorreos(FirstSuc[36].trim()));
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR31", FirstSuc[4].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR32", FirstSuc[46].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR33", FirstSuc[5].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR34", FirstSuc[7].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR35", FirstSuc[9].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR36", FirstSuc[42].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR146", FirstSuc[10].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR147", FirstSuc[11].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR239", FirstSuc[37].trim());
                CriteriosSuc(FirstSuc[1], nit);
                verificarObligatorio("WorkOrder_Fields_301_UDF_CHAR27", "WorkOrder_Fields_301_UDF_CHAR28");
  
  
              }
            } else {
              $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR20"]);
              jQuery('#freezeAgentConfig').remove();
              alert("No se encontraron sucursales para este tercero");
            }
  
          },
          error: function (xhr, textStatus, errorThrown) {
            jQuery('#freezeAgentConfig').remove();
            alert("Error al intentar establecer comunicación con UNOEE. Por favor validar que el servicio web este activo y funcional");
          }
        });
  
        //punto de envio consulta
  
        var suc = $CS.getText("WorkOrder_Fields_301_UDF_CHAR20");
        jQuery.ajax({
          url: apiUrl,
          type: 'POST',
          headers: {
            'Authorization': 'Basic ' + base64Credentials,
            'Content-Type': 'application/json'
          },
          data: JSON.stringify({
            "filter": "CONSULTAS_INT_GOBDAT",
            "maestro": "F215_PUNTOS_ENV",
            "cia": "1",
            "parametro": nit,
            "anexo": suc
          }),
          dataType: 'json',
          success: function (data) {
            const select2Data = [];
  
            if (Array.isArray(data.row) && data.row.length !== 0) {
              if (data.row.length !== 0) {
                for (const row of data.row) {
                  const value = row.value;
                  const parts = value.split(';');
                  if (parts.length > 1) {
                    const id = parts[2];
                    const text = parts[3];
                    select2Data.push({
                      id: id,
                      text: id + ' - ' + text
                    });
                  }
  
                }
                select2Data.sort((a, b) => (a.id > b.id) ? 1 : -1);
                // Obtener el id más grande
                const ultimoId = parseInt(select2Data[select2Data.length - 1].id);
  
                // Crear el nuevo id
                let nuevoId;
                if (ultimoId < 100) {
                  nuevoId = '00' + (ultimoId + 1);
                } else {
                  nuevoId = (ultimoId + 1).toString().padStart(3, '0');
                }
  
                // Agregar la nueva opción al objeto select2Data
                select2Data.push({
                  id: nuevoId,
                  text: nuevoId + ' - Nuevo punto de envío'
                });
                select2Data.sort((a, b) => (a.id > b.id) ? 1 : -1);
                $CS.element("WorkOrder_Fields_301_UDF_CHAR155").select2({
                  data: select2Data,
                  placeholder: "Seleccione punto de envio...",
                  allowClear: true
                });
                $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR155"]);
                if (fileJS !== "CDCREPMOT_" && fileJS !== "CCCRM_") {
                  $CS.enableField(["WorkOrder_Fields_301_UDF_CHAR155"]);
                }
                jQuery('#freezeAgentConfig').remove();
  
                //seleccionar primera sucursal del retorno inicial
                const FirstPuEnv = data.row[0].value.split(';');
                /////////
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR155", FirstPuEnv[2].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR220", FirstPuEnv[3].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR156", FirstPuEnv[5].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR157", FirstPuEnv[6].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR158", FirstPuEnv[7].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR160", FirstPuEnv[9].trim() + "-" + FirstPuEnv[10].trim() + "-" + FirstPuEnv[11].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR159", FirstPuEnv[12].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR222", FirstPuEnv[19].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR162", FirstPuEnv[22].trim());
                ///////////
                var valorTelefono = FirstPuEnv[13];
                valorTelefono = valorTelefono.split(" ")
                var telefonoNuevo = valorTelefono[0];
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR161", telefonoNuevo.trim());
                //////////
                // var correoReemplazado = reemplazarCorreos(FirstPuEnv[16]);
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR163", reemplazarCorreos(FirstPuEnv[16].trim()));
                verificarObligatorio("WorkOrder_Fields_301_UDF_CHAR161", "WorkOrder_Fields_301_UDF_CHAR162");
  
              }
            } else if (data.row.value && data.row.value !== "ERROR 689-NO SE DETERMINARON REGISTROS PARA RETORNAR") {
              var line2 = data.row.value.split(';');
              if (line2.length !== 0) {
                const id = line2[2];
                const text = line2[3];
                select2Data.push({
                  id: id,
                  text: id + ' - ' + text
                });
                select2Data.sort((a, b) => (a.id > b.id) ? 1 : -1);
                // Obtener el id más grande
                const ultimoId = parseInt(select2Data[select2Data.length - 1].id);
  
                // Crear el nuevo id
                let nuevoId;
                if (ultimoId < 100) {
                  nuevoId = '00' + (ultimoId + 1);
                } else {
                  nuevoId = (ultimoId + 1).toString().padStart(3, '0');
                }
  
                // Agregar la nueva opción al objeto select2Data
                select2Data.push({
                  id: nuevoId,
                  text: nuevoId + ' - Nuevo punto de envío'
                });
                select2Data.sort((a, b) => (a.id > b.id) ? 1 : -1);
                $CS.element("WorkOrder_Fields_301_UDF_CHAR155").select2({
                  data: select2Data,
                  placeholder: "Seleccione punto de envio...",
                  allowClear: true
                });
                $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR155"]);
                if (fileJS !== "CDCREPMOT_" && fileJS !== "CCCRM_") {
                  $CS.enableField(["WorkOrder_Fields_301_UDF_CHAR155"]);
                }
                jQuery('#freezeAgentConfig').remove();
  
                //seleccionar primera sucursal del retorno inicial
                const FirstPuEnv = line2;
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR155", FirstPuEnv[2].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR220", FirstPuEnv[3].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR156", FirstPuEnv[5].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR157", FirstPuEnv[6].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR158", FirstPuEnv[7].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR160", FirstPuEnv[9].trim() + "-" + FirstPuEnv[10].trim() + "-" + FirstPuEnv[11].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR159", FirstPuEnv[12].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR222", FirstPuEnv[19].trim());
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR162", FirstPuEnv[22].trim());
                ///////////
                var valorTelefono = FirstPuEnv[13];
                valorTelefono = valorTelefono.split(" ")
                var telefonoNuevo = valorTelefono[0];
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR161", telefonoNuevo.trim());
                //////////
                /*
                reemplazarCorreos(FirstPuEnv[16]);
                              var correos = FirstPuEnv[16];
                console.log(correos);              
                console.log(FirstPuEnv);
                var correosNuevo = correos.replace("|", ';');
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR163", correosNuevo);
                */
                // var correoReemplazado = reemplazarCorreos(FirstPuEnv[16]);
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR163", reemplazarCorreos(FirstPuEnv[16].trim()));
                verificarObligatorio("WorkOrder_Fields_301_UDF_CHAR161", "WorkOrder_Fields_301_UDF_CHAR162");
                ////////////
              }
            } else {
              $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR155"]);
              jQuery('#freezeAgentConfig').remove();
              alert("No se encontraron puntos de envio para esta sucursal");
            }
          },
          error: function (xhr, textStatus, errorThrown) {
            jQuery('#freezeAgentConfig').remove();
            alert("Error al intentar establecer comunicación con UNOEE. Por favor validar que el servicio web este activo y funcional");
          }
        });
  
  
      }
  
    });
  
    function CriteriosSuc(Suc, nit) {
      //criterios sucursal
      var requestData = {
        "filter": "CONSULTAS_INT_GOBDAT",
        "maestro": "F207_ID_TERCERO",
        "cia": "1",
        "parametro": nit,
        "anexo": Suc
  
      };
  
      jQuery.ajax({
        url: apiUrl,
        type: 'POST',
        dataType: 'json',
        headers: {
          'Authorization': 'Basic ' + base64Credentials,
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(requestData), // Convierte el objeto a JSON
        success: function (data) {
          for (const row of data.row) {
            const values = row.value.split(';');
            const criterio = values[2].trim();
            switch (criterio) {
              case 'CL1':
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR148", values[3]);
                break;
              case 'ARE':
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR211", values[3]);
                break;
              case 'CAN':
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR212", values[3]);
                break;
              case 'INT':
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR213", values[3]);
                break;
              case 'ASV':
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR149", values[3]);
                break;
              case 'DST':
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR150", values[3]);
                break;
              case 'ZRP':
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR214", values[3]);
                break;
              case 'VE':
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR215", values[3]);
                break;
              case 'VP':
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR153", values[3]);
                break;
              case 'POS':
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR128", values[3]);
                break;
              case 'ACV':
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR154", values[3]);
                break;
              case 'WMT':
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR216", values[3]);
                break;
              case 'LPO':
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR217", values[3]);
                break;
              case 'TAG':
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR218", values[3]);
                break;
              case 'REG':
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR152", values[3]);
                break;
              case 'ZON':
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR151", values[3]);
                break;
              case 'P.C':
                $CS.setValue("WorkOrder_Fields_301_UDF_CHAR240", values[3]);
                break;
            }
  
          }
        },
        error: function (error) {
          // Maneja los errores aquí
          console.error('Error:', error);
        }
      });
  
    }
  
  
    //select2 punto de envio
    jQuery('[data-field=WorkOrder_Fields_301_UDF_CHAR155]').on('change', function () {
  
      var nit = $CS.getValue("WorkOrder_Fields_301_UDF_CHAR7");
      var suc = $CS.getValue("WorkOrder_Fields_301_UDF_CHAR20");
      var PunEnv = $CS.getValue("WorkOrder_Fields_301_UDF_CHAR155");
      var Accion = $CS.getText("WorkOrder_Fields_301_UDF_CHAR82");
      var NuevoPuEnv = jQuery(this).select2('data');
      console.log(NuevoPuEnv);
      var Nuevo = jQuery('[data-field=WorkOrder_Fields_301_UDF_CHAR20]').select2('data');
  
      if (Accion !== 'Creación' && Accion !== 'Sin especificar' && nit !== '') {
  
        if (!Nuevo.text.includes("- Nueva sucursal")) {
          if (!NuevoPuEnv.text.includes(" - Nuevo punto de envío")) {
            jQuery("body").append(miDiv);
            jQuery.ajax({
              url: apiUrl,
              type: 'POST',
              headers: {
                'Authorization': 'Basic ' + base64Credentials,
                'Content-Type': 'application/json'
              },
              data: JSON.stringify({
                "filter": "CONSULTAS_INT_GOBDAT",
                "maestro": "T215_PUNTOS_ENVIO",
                "cia": "1",
                "parametro": nit,
                "anexo": suc + "-" + PunEnv
              }),
              dataType: 'json',
              success: function (data) {
                const select2Data = [];
  
                if (data.row.value) {
                  var line = data.row.value.split(';');
                  if (line.length !== 0) {
  
                    jQuery('#freezeAgentConfig').remove();
  
                    //seleccionar primera sucursal del retorno inicial
                    const FirstPuEnv = line;
                    $CS.setValue("WorkOrder_Fields_301_UDF_CHAR220", FirstPuEnv[3].trim());
                    $CS.setValue("WorkOrder_Fields_301_UDF_CHAR156", FirstPuEnv[5].trim());
                    $CS.setValue("WorkOrder_Fields_301_UDF_CHAR157", FirstPuEnv[6].trim());
                    $CS.setValue("WorkOrder_Fields_301_UDF_CHAR158", FirstPuEnv[7].trim());
                    $CS.setValue("WorkOrder_Fields_301_UDF_CHAR160", FirstPuEnv[9].trim() + "-" + FirstPuEnv[10].trim() + "-" + FirstPuEnv[11].trim());
                    $CS.setValue("WorkOrder_Fields_301_UDF_CHAR159", FirstPuEnv[12].trim());
                    $CS.setValue("WorkOrder_Fields_301_UDF_CHAR222", FirstPuEnv[19].trim());
                    $CS.setValue("WorkOrder_Fields_301_UDF_CHAR162", FirstPuEnv[22].trim());
                    //////////////
                    var valorTelefono = FirstPuEnv[13];
                    valorTelefono = valorTelefono.split(" ")
                    var telefonoNuevo = valorTelefono[0];
                    $CS.setValue("WorkOrder_Fields_301_UDF_CHAR161", telefonoNuevo.trim());
                    $CS.setValue("WorkOrder_Fields_301_UDF_CHAR163", reemplazarCorreos(FirstPuEnv[16].trim()));
                    verificarObligatorio("WorkOrder_Fields_301_UDF_CHAR161", "WorkOrder_Fields_301_UDF_CHAR162");
                  }
                } else {
                  $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR155"]);
                  jQuery('#freezeAgentConfig').remove();
                  alert("No se encontraron puntos de envio para esta sucursal");
                }
              },
              error: function (xhr, textStatus, errorThrown) {
                jQuery('#freezeAgentConfig').remove();
                alert("Error al intentar establecer comunicación con UNOEE. Por favor validar que el servicio web este activo y funcional |Puntos de envio|");
              }
            });
          } else {
            $CS.setValue("WorkOrder_Fields_301_UDF_CHAR220", "");
            $CS.setValue("WorkOrder_Fields_301_UDF_CHAR156", "");
            $CS.setValue("WorkOrder_Fields_301_UDF_CHAR157", "");
            $CS.setValue("WorkOrder_Fields_301_UDF_CHAR158", "");
            $CS.setValue("WorkOrder_Fields_301_UDF_CHAR160", "");
            $CS.setValue("WorkOrder_Fields_301_UDF_CHAR159", "");
            $CS.setValue("WorkOrder_Fields_301_UDF_CHAR222", "");
            $CS.setValue("WorkOrder_Fields_301_UDF_CHAR162", "");
            $CS.setValue("WorkOrder_Fields_301_UDF_CHAR161", "");
            $CS.setValue("WorkOrder_Fields_301_UDF_CHAR163", "");
            //////////////
            var valorTelefono = FirstPuEnv[13];
            valorTelefono = valorTelefono.split(" ")
            var telefonoNuevo = valorTelefono[0];
            $CS.setValue("WorkOrder_Fields_301_UDF_CHAR161", telefonoNuevo.trim());
            $CS.setValue("WorkOrder_Fields_301_UDF_CHAR163", reemplazarCorreos(FirstPuEnv[16].trim()));
  
          }
        }
      }
    });
  
  
    //select2 sucursales
    jQuery('[data-field=WorkOrder_Fields_301_UDF_CHAR20]').on('change', function () {
  
      var nit = $CS.getValue("WorkOrder_Fields_301_UDF_CHAR7");
      var suc = $CS.getValue("WorkOrder_Fields_301_UDF_CHAR20");
      var Accion = $CS.getText("WorkOrder_Fields_301_UDF_CHAR82");
      var Nuevo = jQuery(this).select2('data');
      if (Accion !== 'Creación' && Accion !== 'Sin especificar' && nit !== '') {
        if (!Nuevo.text.includes("- Nueva sucursal")) {
          jQuery("body").append(miDiv);
          jQuery.ajax({
            url: apiUrl,
            type: 'POST',
            headers: {
              'Authorization': 'Basic ' + base64Credentials,
              'Content-Type': 'application/json'
            },
            data: JSON.stringify({
              "filter": "CONSULTAS_INT_GOBDAT",
              "maestro": "F201_ID_TERCERO",
              "cia": "1",
              "parametro": nit,
              "anexo": suc
            }),
            dataType: 'json',
            success: function (data) {
  
              //seleccionar primera sucursal del retorno inicial
              var FirstSuc = data.row.value.split(';');
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR21", FirstSuc[2].trim());
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR22", FirstSuc[3].trim());
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR23", FirstSuc[25].trim());
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR24", FirstSuc[26].trim());
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR25", FirstSuc[27].trim());
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR145", FirstSuc[29].trim() + "-" + FirstSuc[30].trim() + "-" + FirstSuc[31].trim());
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR28", FirstSuc[48].trim());
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR27", FirstSuc[33].trim());
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR26", FirstSuc[32].trim());
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR29", FirstSuc[35].trim());
              /////////////////////////
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR30", reemplazarCorreos(FirstSuc[36].trim()));
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR31", FirstSuc[4].trim());
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR32", FirstSuc[46].trim());
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR33", FirstSuc[5].trim());
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR34", FirstSuc[7].trim());
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR35", FirstSuc[9].trim());
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR36", FirstSuc[42].trim());
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR146", FirstSuc[10].trim());
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR147", FirstSuc[11].trim());
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR239", FirstSuc[37].trim());
              verificarObligatorio("WorkOrder_Fields_301_UDF_CHAR27", "WorkOrder_Fields_301_UDF_CHAR28");
            },
            error: function (xhr, textStatus, errorThrown) {
              jQuery('#freezeAgentConfig').remove();
              alert("Error al intentar establecer comunicación con UNOEE. Por favor validar que el servicio web este activo y funcional");
            }
  
          });
  
          //criterios sucursal
          CriteriosSuc(suc, nit);
  
          //punto de envio consulta
  
          var suc = $CS.getText("WorkOrder_Fields_301_UDF_CHAR20");
          jQuery.ajax({
            url: apiUrl,
            type: 'POST',
            headers: {
              'Authorization': 'Basic ' + base64Credentials,
              'Content-Type': 'application/json'
            },
            data: JSON.stringify({
              "filter": "CONSULTAS_INT_GOBDAT",
              //////////////////////
              "maestro": "F215_PUNTOS_ENV",
              //"maestro": "T215_PUNTOS_ENV",
              "cia": "1",
              "parametro": nit,
              "anexo": suc
            }),
            dataType: 'json',
            success: function (data) {
              const select2Data = [];
  
              if (Array.isArray(data.row) && data.row.length !== 0) {
                if (data.row.length !== 0) {
                  for (const row of data.row) {
                    const value = row.value;
                    const parts = value.split(';');
                    if (parts.length > 1) {
                      const id = parts[2];
                      const text = parts[3];
                      select2Data.push({
                        id: id,
                        text: id + ' - ' + text
                      });
                    }
  
                  }
                  // Obtener el id más grande
                  const ultimoId = parseInt(select2Data[select2Data.length - 1].id);
                  console.log(ultimoId);
  
                  // Crear el nuevo id
                  let nuevoId;
                  if (ultimoId < 100) {
                    nuevoId = '00' + (ultimoId + 1);
                  } else {
                    nuevoId = (ultimoId + 1).toString().padStart(3, '0');
                  }
  
                  // Agregar la nueva opción al objeto select2Data
                  select2Data.push({
                    id: nuevoId,
                    text: nuevoId + ' - Nuevo punto de envío'
                  });
                  select2Data.sort((a, b) => (a.id > b.id) ? 1 : -1);
                  $CS.element("WorkOrder_Fields_301_UDF_CHAR155").select2({
                    data: select2Data,
                    placeholder: "Seleccione punto de envio...",
                    allowClear: true
                  });
                  $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR155"]);
                  if (fileJS !== "CDCREPMOT_" && fileJS !== "CCCRM_") {
                    $CS.enableField(["WorkOrder_Fields_301_UDF_CHAR155"]);
                  }
                  jQuery('#freezeAgentConfig').remove();
  
                  //seleccionar primera sucursal del retorno inicial
                  const FirstPuEnv = data.row[0].value.split(';');
  
                  $CS.setValue("WorkOrder_Fields_301_UDF_CHAR155", FirstPuEnv[2].trim());
                  $CS.setValue("WorkOrder_Fields_301_UDF_CHAR220", FirstPuEnv[3].trim());
                  $CS.setValue("WorkOrder_Fields_301_UDF_CHAR156", FirstPuEnv[5].trim());
                  $CS.setValue("WorkOrder_Fields_301_UDF_CHAR157", FirstPuEnv[6].trim());
                  $CS.setValue("WorkOrder_Fields_301_UDF_CHAR158", FirstPuEnv[7].trim());
                  $CS.setValue("WorkOrder_Fields_301_UDF_CHAR160", FirstPuEnv[9].trim() + "-" + FirstPuEnv[10].trim() + "-" + FirstPuEnv[11].trim());
  
                  $CS.setValue("WorkOrder_Fields_301_UDF_CHAR159", FirstPuEnv[12]);
                  ////////////////
                  var valorTelefono = FirstPuEnv[13];
                  valorTelefono = valorTelefono.split(" ")
                  var telefonoNuevo = valorTelefono[0];
                  $CS.setValue("WorkOrder_Fields_301_UDF_CHAR161", telefonoNuevo.trim());
                  verificarObligatorio("WorkOrder_Fields_301_UDF_CHAR161", "WorkOrder_Fields_301_UDF_CHAR162");
                }
              } else if (data.row.value && data.row.value !== "ERROR 689-NO SE DETERMINARON REGISTROS PARA RETORNAR") {
                var line2 = data.row.value.split(';');
                if (line2.length !== 0) {
                  const id = line2[2];
                  const text = line2[3];
                  select2Data.push({
                    id: id,
                    text: id + ' - ' + text
                  });
                  // Obtener el id más grande
                  const ultimoId = parseInt(select2Data[select2Data.length - 1].id);
                  console.log(ultimoId);
  
                  // Crear el nuevo id
                  let nuevoId;
                  if (ultimoId < 100) {
                    nuevoId = '00' + (ultimoId + 1);
                  } else {
                    nuevoId = (ultimoId + 1).toString().padStart(3, '0');
                  }
  
                  // Agregar la nueva opción al objeto select2Data
                  select2Data.push({
                    id: nuevoId,
                    text: nuevoId + ' - Nuevo punto de envío'
                  });
                  select2Data.sort((a, b) => (a.id > b.id) ? 1 : -1);
                  $CS.element("WorkOrder_Fields_301_UDF_CHAR155").select2({
                    data: select2Data,
                    placeholder: "Seleccione punto de envio...",
                    allowClear: true
                  });
                  $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR155"]);
                  if (fileJS !== "CDCREPMOT_" && fileJS !== "CCCRM_") {
                    $CS.enableField(["WorkOrder_Fields_301_UDF_CHAR155"]);
                  }
                  jQuery('#freezeAgentConfig').remove();
  
                  //seleccionar primera sucursal del retorno inicial
                  const FirstPuEnv = line2;
                  $CS.setValue("WorkOrder_Fields_301_UDF_CHAR155", FirstPuEnv[2].trim());
                  $CS.setValue("WorkOrder_Fields_301_UDF_CHAR220", FirstPuEnv[3].trim());
                  $CS.setValue("WorkOrder_Fields_301_UDF_CHAR156", FirstPuEnv[5].trim());
                  $CS.setValue("WorkOrder_Fields_301_UDF_CHAR157", FirstPuEnv[6].trim());
                  $CS.setValue("WorkOrder_Fields_301_UDF_CHAR158", FirstPuEnv[7].trim());
                  $CS.setValue("WorkOrder_Fields_301_UDF_CHAR160", FirstPuEnv[9].trim() + "-" + FirstPuEnv[10].trim() + "-" + FirstPuEnv[11].trim());
                  $CS.setValue("WorkOrder_Fields_301_UDF_CHAR159", FirstPuEnv[12]);
                  ///////////
                  var valorTelefono = FirstPuEnv[13];
                  valorTelefono = valorTelefono.split(" ")
                  var telefonoNuevo = valorTelefono[0];
                  $CS.setValue("WorkOrder_Fields_301_UDF_CHAR161", telefonoNuevo.trim());
                  ///////////
                  $CS.setValue("WorkOrder_Fields_301_UDF_CHAR222", FirstPuEnv[21].trim());
                  verificarObligatorio("WorkOrder_Fields_301_UDF_CHAR161", "WorkOrder_Fields_301_UDF_CHAR162");
                }
              } else {
                $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR155"]);
                jQuery('#freezeAgentConfig').remove();
                alert("No se encontraron puntos de envio para esta sucursal");
              }
            },
            error: function (xhr, textStatus, errorThrown) {
              jQuery('#freezeAgentConfig').remove();
              alert("Error al intentar establecer comunicación con UNOEE. Por favor validar que el servicio web este activo y funcional");
            }
          });
  
        } else {
  
          // Obtiene la fecha de hoy
          var fecha = new Date();
          // Obtiene el año, mes y día
          var anio = fecha.getFullYear();
          var mes = ('0' + (fecha.getMonth() + 1)).slice(-2);
          var día = ('0' + fecha.getDate()).slice(-2);
          // Formatea la fecha en AAAAMMDD
          var fechaHoy = anio + mes + día;
  
          $CS.setValue("WorkOrder_Fields_301_UDF_CHAR21", "1");
          $CS.setValue("WorkOrder_Fields_301_UDF_CHAR22", "");
          $CS.setValue("WorkOrder_Fields_301_UDF_CHAR23", "");
          $CS.setValue("WorkOrder_Fields_301_UDF_CHAR24", "");
          $CS.setValue("WorkOrder_Fields_301_UDF_CHAR25", "");
          $CS.setValue("WorkOrder_Fields_301_UDF_CHAR145", "");
          $CS.setValue("WorkOrder_Fields_301_UDF_CHAR28", "");
          $CS.setValue("WorkOrder_Fields_301_UDF_CHAR27", "");
          $CS.setValue("WorkOrder_Fields_301_UDF_CHAR26", "");
          $CS.setValue("WorkOrder_Fields_301_UDF_CHAR29", "");
          $CS.setValue("WorkOrder_Fields_301_UDF_CHAR30", "");
          $CS.setValue("WorkOrder_Fields_301_UDF_CHAR31", "");
          $CS.setValue("WorkOrder_Fields_301_UDF_CHAR32", "9999");
          $CS.setValue("WorkOrder_Fields_301_UDF_CHAR33", "9999");
          $CS.setValue("WorkOrder_Fields_301_UDF_CHAR34", "CON");
          $CS.setValue("WorkOrder_Fields_301_UDF_CHAR35", "0");
          $CS.setValue("WorkOrder_Fields_301_UDF_CHAR36", fechaHoy);
          $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR36"]);
          $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR35"]);
          $CS.setValue("WorkOrder_Fields_301_UDF_CHAR146", "");
          $CS.setValue("WorkOrder_Fields_301_UDF_CHAR147", "");
          $CS.setValue("WorkOrder_Fields_301_UDF_CHAR239", fechaHoy);
  
          $CS.element("WorkOrder_Fields_301_UDF_CHAR155").select2("destroy");
          $CS.setValue("WorkOrder_Fields_301_UDF_CHAR155", "001");
          $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR155"]);
          $CS.setValue("WorkOrder_Fields_301_UDF_CHAR220", "");
          $CS.setValue("WorkOrder_Fields_301_UDF_CHAR156", "");
          $CS.setValue("WorkOrder_Fields_301_UDF_CHAR157", "");
          $CS.setValue("WorkOrder_Fields_301_UDF_CHAR158", "");
          $CS.setValue("WorkOrder_Fields_301_UDF_CHAR160", "");
          $CS.setValue("WorkOrder_Fields_301_UDF_CHAR159", "");
          $CS.setValue("WorkOrder_Fields_301_UDF_CHAR222", "");
          $CS.setValue("WorkOrder_Fields_301_UDF_CHAR162", "");
          $CS.setValue("WorkOrder_Fields_301_UDF_CHAR161", "");
          $CS.setValue("WorkOrder_Fields_301_UDF_CHAR163", "");
          $CS.setValue("WorkOrder_Fields_301_UDF_CHAR148", "");
        }
  
      }
    });
  
  
    //obtener barrios sucursal
  
    $CS.element("WorkOrder_Fields_301_UDF_CHAR145").on("change", function () {
      var selectedValues = jQuery(this).val();
      //select2 barrios
      var CurrentValue = selectedValues.replace(/-/g, '');
      if (CurrentValue !== "") {
        jQuery("body").append(miDiv);
        jQuery.ajax({
          url: apiUrl,
          type: 'POST',
          headers: {
            'Authorization': 'Basic ' + base64Credentials,
            'Content-Type': 'application/json'
          },
          data: JSON.stringify({
            "filter": "MAESTRO_GOBDAT",
            "maestro": "F015_ID_BARRIO",
            "anexo": CurrentValue,
            "cia": "1"
          }),
          dataType: 'json',
          success: function (data) {
            const select2Data = [];
            if (Array.isArray(data.row) && data.row.length !== 0) {
              for (const row of data.row) {
                const value = row.value;
                const parts = value.split(';');
                if (parts.length > 1) {
                  const id = parts[2];
                  const text = parts[3];
                  select2Data.push({
                    id: id,
                    text: text
                  });
                }
              }
              select2Data.sort((a, b) => (a.id > b.id) ? 1 : -1);
              $CS.element("WorkOrder_Fields_301_UDF_CHAR26").select2({
                data: select2Data,
                placeholder: "Seleccione barrio...",
                allowClear: true
              });
              $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR26"]);
              var Accion = $CS.getText("WorkOrder_Fields_301_UDF_CHAR82");
              if (fileJS !== "CDCREPMOT_" && fileJS !== "CCCRM_" && Accion !== "Inactivación" && Accion !== "Activación") {
                $CS.enableField(["WorkOrder_Fields_301_UDF_CHAR26"]);
              }
              jQuery('#freezeAgentConfig').remove()
            } else {
              jQuery('#freezeAgentConfig').remove();
              alert("No se encontraron barrios para esta ciudad");
            }
          },
          error: function (xhr, textStatus, errorThrown) {
            jQuery('#freezeAgentConfig').remove();
            alert("Error al intentar establecer comunicación con UNOEE. Por favor validar que el servicio web este activo y funcional");
          }
        });
      } else {
        $CS.element("WorkOrder_Fields_301_UDF_CHAR26").select2("destroy");
        $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR26"]);
        $CS.setValue("WorkOrder_Fields_301_UDF_CHAR26", "");
      }
    });
  
    //fin obtener barrio sucursal
  
    //obtener barrios
  
    $CS.element("WorkOrder_Fields_301_UDF_CHAR13").on("change", function () {
      var selectedValues = jQuery(this).val();
      //select2 barrios
      var CurrentValue = selectedValues.replace(/-/g, '');
      if (CurrentValue !== "") {
        jQuery("body").append(miDiv);
        jQuery.ajax({
          url: apiUrl,
          type: 'POST',
          headers: {
            'Authorization': 'Basic ' + base64Credentials,
            'Content-Type': 'application/json'
          },
          data: JSON.stringify({
            "filter": "MAESTRO_GOBDAT",
            "maestro": "F015_ID_BARRIO",
            "anexo": CurrentValue,
            "cia": "1"
          }),
          dataType: 'json',
          success: function (data) {
            const select2Data = [];
            if (Array.isArray(data.row) && data.row.length !== 0) {
              for (const row of data.row) {
                const value = row.value;
                const parts = value.split(';');
                if (parts.length > 1) {
                  const id = parts[2];
                  const text = parts[3];
                  select2Data.push({
                    id: id,
                    text: text
                  });
                }
  
              }
              select2Data.sort((a, b) => (a.id > b.id) ? 1 : -1);
              $CS.element("WorkOrder_Fields_301_UDF_CHAR12").select2({
                data: select2Data,
                placeholder: "Seleccione barrio...",
                allowClear: true
              });
              $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR12"]);
              var Accion = $CS.getText("WorkOrder_Fields_301_UDF_CHAR82");
              if (fileJS !== "CDCREPMOT_" && fileJS !== "CCCRM_" && Accion !== "Inactivación" && Accion !== "Activación") {
                $CS.enableField(["WorkOrder_Fields_301_UDF_CHAR12"]);
              }
              jQuery('#freezeAgentConfig').remove()
            } else {
              jQuery('#freezeAgentConfig').remove();
              alert("No se encontraron barrios para esta ciudad");
            }
  
          },
          error: function (xhr, textStatus, errorThrown) {
            jQuery('#freezeAgentConfig').remove();
            alert("Error al intentar establecer comunicación con UNOEE. Por favor validar que el servicio web este activo y funcional");
          }
        });
  
      } else {
        $CS.element("WorkOrder_Fields_301_UDF_CHAR12").select2("destroy");
        $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR12"]);
        $CS.setValue("WorkOrder_Fields_301_UDF_CHAR12", "");
      }
    });
  
  
    //fin obtener barrios 
  
    //obtener barrios p.envio
  
    $CS.element("WorkOrder_Fields_301_UDF_CHAR160").on("change", function () {
      var selectedValues = jQuery(this).val();
      //select2 barrios
      var CurrentValue = selectedValues.replace(/-/g, '');
      if (CurrentValue !== "") {
        jQuery("body").append(miDiv);
        jQuery.ajax({
          url: apiUrl,
          type: 'POST',
          headers: {
            'Authorization': 'Basic ' + base64Credentials,
            'Content-Type': 'application/json'
          },
          data: JSON.stringify({
            "filter": "MAESTRO_GOBDAT",
            "maestro": "F015_ID_BARRIO",
            "anexo": CurrentValue,
            "cia": "1"
          }),
          dataType: 'json',
          success: function (data) {
            const select2Data = [];
            if (Array.isArray(data.row) && data.row.length !== 0) {
              for (const row of data.row) {
                const value = row.value;
                const parts = value.split(';');
                if (parts.length > 1) {
                  const id = parts[2];
                  const text = parts[3];
                  select2Data.push({
                    id: id,
                    text: text
                  });
                }
  
              }
              select2Data.sort((a, b) => (a.id > b.id) ? 1 : -1);
              $CS.element("WorkOrder_Fields_301_UDF_CHAR159").select2({
                data: select2Data,
                placeholder: "Seleccione barrio...",
                allowClear: true
              });
              $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR159"]);
              var Accion = $CS.getText("WorkOrder_Fields_301_UDF_CHAR82");
              if (fileJS !== "CDCREPMOT_" && fileJS !== "CCCRM_" && Accion !== "Inactivación" && Accion !== "Activación") {
                $CS.enableField(["WorkOrder_Fields_301_UDF_CHAR159"]);
              }
              jQuery('#freezeAgentConfig').remove()
            } else {
              jQuery('#freezeAgentConfig').remove();
              alert("No se encontraron barrios para esta ciudad");
            }
  
          },
          error: function (xhr, textStatus, errorThrown) {
            jQuery('#freezeAgentConfig').remove();
            alert("Error al intentar establecer comunicación con UNOEE. Por favor validar que el servicio web este activo y funcional");
          }
        });
  
      } else {
        $CS.element("WorkOrder_Fields_301_UDF_CHAR159").select2("destroy");
        $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR159"]);
        $CS.setValue("WorkOrder_Fields_301_UDF_CHAR159", "");
      }
    });
  
  
    //fin obtener barrios p.envio 
  
  
    //fecha de ingreso automatica
    // Obtiene la fecha de hoy
    var fecha = new Date();
    // Obtiene el año, mes y día
    var anio = fecha.getFullYear();
    var mes = ('0' + (fecha.getMonth() + 1)).slice(-2);
    var día = ('0' + fecha.getDate()).slice(-2);
    // Formatea la fecha en AAAAMMDD
    var fechaHoy = anio + mes + día;
  
    // Establece la fecha en un elemento HTML 
    $CS.setValue("WorkOrder_Fields_301_UDF_CHAR239", fechaHoy);
    $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR239"]);
  
  
    //obtener datos para acciones diferentes a creacion
  
    $CS.element("WorkOrder_Fields_301_UDF_CHAR7").on('blur', function () {
      var Accion = $CS.getText("WorkOrder_Fields_301_UDF_CHAR82");
      var referencia = $CS.getValue("WorkOrder_Fields_301_UDF_CHAR7");;
      if (Accion !== 'Creación' && referencia !== '') {
        //cabecera tercero
        var requestData = {
          "filter": "CONSULTAS_INT_GOBDAT",
          "maestro": "F200_ID_TERCERO",
          "cia": "1",
          "parametro": referencia
        };
  
        jQuery.ajax({
          url: apiUrl,
          type: 'POST',
          dataType: 'json',
  
          headers: {
            'Authorization': 'Basic ' + base64Credentials,
            'Content-Type': 'application/json'
          },
          data: JSON.stringify(requestData), // Convierte el objeto a JSON
          success: function (data) {
            const rows = data.row;
            const values = rows.value.split(';');
            if (values[0] >= 0) {
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR6", values[2].trim());
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR1", values[3].trim());
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR2", values[4].trim());
  
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR3", values[5].trim());
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR4", values[6].trim());
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR5", values[7].trim());
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR8", values[8].trim());
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR9", values[15].trim());
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR10", values[16].trim());
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR11", values[17].trim());
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR13", values[19].trim() + "-" + values[20].trim() + "-" + values[21].trim());
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR12", values[22].trim());
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR14", values[23].trim());
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR15", values[24].trim());
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR16", values[26].trim());
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR221", values[30].trim());
              ///////////////////////
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR17", reemplazarCorreos(values[27].trim()));
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR19", values[29].trim());
              verificarObligatorio("WorkOrder_Fields_301_UDF_CHAR14", "WorkOrder_Fields_301_UDF_CHAR15");
            } else {
              alert("El tercero ingresado no existe");
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR6", "");
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR1", "");
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR2", "");
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR3", "");
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR4", "");
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR5", "");
              $CS.setValue("WorkOrder_Fields_301_UDF_CHAR8", "");
            }
          },
          error: function (error) {
            // Maneja los errores aquí
            console.error('Error:', error);
          }
        });
  
      }
    });
  
  
    $CS.hideField(["WorkOrder_Fields_301_UDF_CHAR37"]);
    $CS.element("WorkOrder_Fields_301_UDF_CHAR240").on('change', function () {
      var impuesto = $CS.getValue("WorkOrder_Fields_301_UDF_CHAR240");
      switch (impuesto) {
        case '0001':
          $CS.setValue("WorkOrder_Fields_301_UDF_CHAR37", "IMPUESTOS SOBRE LAS VENTAS");
          break;
        case '0002':
          $CS.setValue("WorkOrder_Fields_301_UDF_CHAR37", "GRAN CONTRIBUYENTE");
          break;
        case '0003':
          $CS.setValue("WorkOrder_Fields_301_UDF_CHAR37", "AUTORRETENEDOR");
          break;
        case '0004':
          $CS.setValue("WorkOrder_Fields_301_UDF_CHAR37", "RÉGIMEN SIMPLE  (NO RESPONSABLE DE IVA)");
          break;
        case '0005':
          $CS.setValue("WorkOrder_Fields_301_UDF_CHAR37", "MÚLTIPLES OPCIONES");
          break;
      }
    });
  
  
    //funcion para reemplazar | por ; en correos
    function reemplazarCorreos(correo) {
      var correosNuevo = correo.replace("|", ';');
      return correosNuevo;
    }
  
    //obtener acción marcada al cargar el formato /cambiar acción
    var acc = $CS.getText("WorkOrder_Fields_301_UDF_CHAR82");
    var arch = "";
    //llamar el archivo json correcto de acuerdo a la accion
  
    // Utilizar un switch para definir el comportamiento basado en la propiedad
    switch (acc) {
      // Definir casos para cada propiedad
      case "Sin especificar":
        arch = 0;
        if (fileJS !== "DDBDCRM_" && fileJS !== "" && fileJS != "AUADVENMOT_") {
          $CS.removeOptions("WorkOrder_Fields_301_UDF_CHAR82", ["Creación"]);
        }
        break;
      case "Creación":
        arch = 1;
        $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR225"]);
        break;
      case "Actualización":
        arch = 2;
        $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR225"]);
        $CS.disableField(["WorkOrder_Fields_301_UDF_CHAR82"]);
        break;
      default:
        arch = 3;
    }
    FieldControl(arch);
  
    //consultar json correspondiente a cada acción
    $CS.element("WorkOrder_Fields_301_UDF_CHAR82").on('change', function () {
      //obtener acción marcada al cargar el formato
      $CS.setText("WorkOrder_Fields_301_UDF_CHAR225", "");
      $CS.setValue("WorkOrder_Fields_301_UDF_CHAR225", "");
      var acc = $CS.getText("WorkOrder_Fields_301_UDF_CHAR82");
      var arch = "";
      //llamar el archivo json correcto de acuerdo a la accion
  
      // Utilizar un switch para definir el comportamiento basado en la propiedad
      switch (acc) {
        // Definir casos para cada propiedad
        case "Sin especificar":
          arch = 0;
          break;
        case "Creación":
          arch = 1;
          break;
        case "Actualización":
          arch = 2;
          break;
        default:
          arch = 3;
      }
  
      FieldControl(arch);
    });
  
    function FieldControl(arch) {
      var rand = Math.random();
  
      var ruta = "/custom/scripts/fields_terceros7_" + arch + ".json";
      if (fileJS !== "") {
        ruta = "/custom/scripts/TERCEROS_MOTOS/fields_terceros7_" + fileJS + arch + ".json";
      }
      jQuery.getJSON(ruta + "?v=" + rand, function (jsonData) {
        // Recorrer el JSON cargado
        jQuery.each(jsonData, function (key, value) {
          for (var prop in value) {
            var propValue = value[prop];
            // Utilizar un switch para definir el comportamiento basado en la propiedad
            switch (prop) {
              // Definir casos para cada propiedad
              case "required":
                if (propValue) {
                  $CS.mandateField([key]);
                } else {
                  $CS.nonMandateField([key]);
                }
                break;
              case "disabled":
                if (propValue) {
                  $CS.disableField([key]);
                } else {
                  $CS.enableField([key]);
                }
                break;
              case "value":
                $CS.setValue(key, propValue);
                break;
                // Añadir más casos según sea necesario para otras propiedades
              default:
                console.log("Propiedad no reconocida para", key, ":", prop);
            }
          }
        });
      });
    }
  
  
    //fix criterios
  
    var ac2 = $CS.getValue("WorkOrder_Fields_301_UDF_CHAR82");
    var xcd = $CS.getValue("WorkOrder_Fields_301_UDF_CHAR225");
  
    if (xcd !== "") {
      if (ac2 !== "Inactivación" && ac2 !== "Activación" && fileJS !== "DDBDCRM_" && fileJS !== "CDCREPMOT_") {
        console.log(xcd);
        if (xcd == 'Cliente Repuestos Motos') {
          habilitarRepuestosMotos("load");
        } else if (xcd == 'Cliente Motos') {
          habilitarClientesMotos("load");
        }
      }
    }
    //Inicio tipo cliente
    $CS.element("WorkOrder_Fields_301_UDF_CHAR225").on('change', function () {
      var y = $CS.getValue("WorkOrder_Fields_301_UDF_CHAR225");
      var ac3 = $CS.getValue("WorkOrder_Fields_301_UDF_CHAR82");
      if (ac3 !== "Inactivación" && ac3 !== "Activación" && fileJS !== "DDBDCRM_" && fileJS !== "CDCREPMOT_") {
        if (y == 'Cliente Repuestos Motos') {
          habilitarRepuestosMotos("new");
        } else if (y == 'Cliente Motos') {
          habilitarClientesMotos("new");
        }
      }
    });
    //Fin tipo cliente
  
    //validacion telefono celular al copiar editar solicitud.
    var valores = {
      "WorkOrder_Fields_301_UDF_CHAR14": "WorkOrder_Fields_301_UDF_CHAR15",
      "WorkOrder_Fields_301_UDF_CHAR27": "WorkOrder_Fields_301_UDF_CHAR28",
      "WorkOrder_Fields_301_UDF_CHAR161": "WorkOrder_Fields_301_UDF_CHAR162"
    };
  
    jQuery.each(valores, function (key, value) {
      verificarObligatorio(key, value);
    });
  
  }); 