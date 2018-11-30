function fetchData(header, onSuccess) {
    var url = '/professor/aluno/criar';

    $.ajax({
        url: url,
        type: "GET",
        data: { json: true },
        success: onSuccess
    })
}

$(document).ready(function() {

    fetchData({}, data => {
        data = JSON.parse(data)
        
        $('#spUnidade').empty()
        data.unidades.forEach(u => {
            $('#spUnidade').append('<option value="' + u.id_unidade + '">' + u.nome + '</option>')
        })
        $('#spUnidade').selectpicker('refresh')

    })
    
    $('#create_button').on('click', function() {
        
        var nome = $('#name').val()
        var turma = $('#turma').val()
        var idUnidade = $('#spUnidade').val()

         $.ajax({
            url: '/professor/aluno/criar',
            type: 'POST',
            data: {
                nome: nome,
                turma: turma,
                idUnidade: idUnidade
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
                        location.reload()
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
})