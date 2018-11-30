function fetchData(id, onSuccess) {
    var url = '/professor/prova/getCriterios/';

    $.ajax({
        url: url,
        type: "GET",
        data: { id: id },
        success: onSuccess
    })
}

$(document).ready(function() {

    var id = $('#id_prova').text()
    console.log(id)

    var criterios;

    fetchData(id, data => {
        data = JSON.parse(data)
        criterios = data
        data.forEach(c => {
            var campo = '<div data-id="' + c.id_criterio + '" id="' + c.id_criterio + '"class="form-group"><input type="text" pattern="^\d+(\.\d+)?" class="form-control" id="name" placeholder="' + c.nome + '" required></div>'
            $('#criterios_notas').append(campo)
        })

    })
})

    
$('#create_button').on('click', function() {
    
    var id = $('#id_prova').text()
    var allValues = []
    var criterios = []
    $('#criterios_notas').children().each(el => {
        allValues.push($('#criterios_notas').children().eq(el).children().eq(0).val())
        criterios.push($('#criterios_notas').children().eq(el).attr('id'))
    })

     $.ajax({
        url: '/professor/prova/notas',
        type: 'POST',
        data: {
            allValues: allValues,
            criterios: criterios,
            idProva: id
        },
        success: function(data) {
            
            if(data.success) {
                swal({
                    text: "Upload realizado!",
                    icon: "success",
                    timer: 2000,
                    closeOnEsc: false,
                    closeOnClickOutside: false,
                    buttons: false
                }).then(function() {
                    window.location.href = '/professor/prova/disponibilizadas'
                })
            } else {
                swal({
                    title: "Problema!",
                    text: "Algo deu errado",
                    icon: "warning",
                    timer: 3000,
                    closeOnEsc: false,
                    closeOnClickOutside: false,
                    buttons: false
                }).then(function() {
                    location.reload();
                })
            }
        }
    });
});