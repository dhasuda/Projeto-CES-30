function fetchData(header, onSuccess) {
    var url = '/professor/criterio/criar/';

    $.ajax({
        url: url,
        type: "GET",
        data: { json: true },
        success: onSuccess
    })
}

$(document).ready(function() {
    fetchData({}, (data) => {
        data = JSON.parse(data);
        $('#category').empty();

        for(var i = 0; i < data.length; i++) {
            $('#category').append('<option value=' + data[i].id_categoria + '>' + data[i].nome + '</option>');
        }

        $('#category').selectpicker('refresh');

        $('.ui.segment.card-body.dimmable').dimmer('hide');
        $('.ui.segment.card-body.dimmable .dimmer').removeClass('active');
    });

    $('#submitCreateCriterio').submit(function(e) {
        var category = $('#category').val();
        var name = $('#name').val();
        var description = $('#description').val();
        var totalgrade = $('#totalgrade').val();
        var passo = $('#passo').val();
        var url = '/professor/criterio/criar';

        $.ajax({
            type: "POST",
            url: url,
            data: {
                category: category,
                name: name,
                description: description,
                totalgrade: totalgrade,
                passo: passo
            },
            success: function() {
                swal({
                    text: "Cadastro realizado!",
                    icon: "success",
                    timer: 2000,
                    closeOnEsc: false,
                    closeOnClickOutside: false,
                    buttons: false
                }).then(function() {
                    $('#submitCreateCriterio').trigger('reset');
                    location.reload();
                })
            }
        });

        e.preventDefault();
    });
})