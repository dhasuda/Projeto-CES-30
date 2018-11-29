$(document).ready(function() {
    $('#btn-submit-hide').hide()
    
    $('.btn-create').on('click', () => {
        if ($('#name').val().length > 0) {
            $('#add').modal('show')
        }
    })

    $('#upload-input').change(function() {
        
         var propostaName = $('#name').val()
         $.ajax({
            url: '/professor/proposta/subir',
            type: 'POST',
            data: {
                nome: propostaName
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
                        text: "Já existe uma proposta com esse nome!",
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