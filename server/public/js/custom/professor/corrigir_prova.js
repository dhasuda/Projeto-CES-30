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

    fetchData(id, data => {
        data = JSON.parse(data)
        
        data.forEach(c => {
            var campo = '<div id="criterio' + c.id_criterio + '"class="form-group"><input type="text" class="form-control" id="name" placeholder="' + c.nome + '" required></div>'
            $('#criterios_notas').append(campo)
        })

    })
    
    $('#create_button').on('click', function() {
        console.log('HERREEEEE')
        // var nome = $('#name').val()
        // var turma = $('#turma').val()
        // var idUnidade = $('#spUnidade').val()

        //  $.ajax({
        //     url: '/professor/aluno/criar',
        //     type: 'POST',
        //     data: {
        //         nome: nome,
        //         turma: turma,
        //         idUnidade: idUnidade
        //     },
        //     success: function(data) {
                
        //         if(data.success) {
        //             swal({
        //                 text: "Upload realizado!",
        //                 icon: "success",
        //                 timer: 2000,
        //                 closeOnEsc: false,
        //                 closeOnClickOutside: false,
        //                 buttons: false
        //             }).then(function() {
        //                 location.reload()
        //             })
        //         } else {
        //             swal({
        //                 title: "Problema!",
        //                 text: "Algo deu errado",
        //                 icon: "warning",
        //                 timer: 3000,
        //                 closeOnEsc: false,
        //                 closeOnClickOutside: false,
        //                 buttons: false
        //             }).then(function() {
        //                 location.reload();
        //             })
        //         }
        //     }
        // });
    });
})