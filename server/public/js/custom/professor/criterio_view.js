function fetchData(onSuccess) {
    var url = '/professor/criterio/visualizar/';

    $.ajax({
        url: url,
        type: "GET",
        data: { json: true },
        success: onSuccess
    })
}

// function getCriterio(id, onSuccess) {
//     var url = '/professor/criterio/buscar/' + id;

//     $.ajax({
//         url: url,
//         type: "GET",
//         data: { json: true },
//         success: onSuccess
//     })
// }

$(document).ready(function() {
    fetchData((data) => {
        data = JSON.parse(data);

        table.clear();
        table.draw();
        for(var i = 0; i < data.length; i++) {
            table.row.add([
                data[i].categoria,
                data[i].criterio,
                data[i].nota
            ]).draw(false);
        }

        $('.ui.segment.card-body.dimmable').dimmer('hide');
        $('.ui.segment.card-body.dimmable .dimmer').removeClass('active');
    });

    var table = $('#table').DataTable({
        lengthChange: false,
        buttons: [
            { extend: 'copy', text: 'Copiar' },
            { extend: 'excel',   text: 'Excel' },
            { extend: 'pdf', text: 'PDF' }
        ],
        responsive: true,
        language: {
            url: "/json/datatables/portuguese-brasil.json"
        },
        initComplete: function(settings, json) {
            table.buttons().container().appendTo('#table_wrapper .col-md-6:eq(0)');
        },
        fnDrawCallback: function() {
            // $('.identify-id').click(function () {
            //     var elementId = $(this).data('id');
            //     $('#submitEdit').attr('element-id', elementId);

            //     getCriterio(elementId, (data) => {
            //         data = JSON.parse(data)
            //         $('#name').val(data[0].nome)
            //         $('#description').val(data[0].descricao)
            //         $('#totalgrade').val(data[0].nota_total)
            //         $('#passo').val(data[0].passo)
            //     })
            // });
            $('[data-toggle="tooltip"]').tooltip();
        }
    });
    
    $('#submitEdit').submit(function(e) {
        var id_criterio = $('#submitEdit').attr('element-id');
        var url = '/coordenador/criterio/editar';

        $.ajax({
            type: "POST",
            url: url,
            data: {
                id_criterio: id_criterio,
                nome: $("#name").val(),
                descricao: $("#description").val(),
                nota_total: $("#totalgrade").val(),
                passo: $("#passo").val()
            },
            success: function() {
                swal({
                    text: "Edição realizada!",
                    icon: "success",
                    timer: 2000,
                    closeOnEsc: false,
                    closeOnClickOutside: false,
                    buttons: false
                }).then(function() {
                    $('#submitEdit').trigger('reset');
                    location.reload();
                })
            }
        });

        e.preventDefault();
    });

    $('#btn-delete').click(() => {
        var id_criterio = $('#submitEdit').attr('element-id');
        var url = '/coordenador/criterio/remover';

        swal({
            title: "Tem certeza?",
            text: "Não será possível recuperar tal critério depois!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
              if (willDelete) {
                $.ajax({
                    type: "DELETE",
                    url: url,
                    data: {
                        id_criterio: id_criterio
                    },
                    success: function(data) {
                        if(data.success) {
                            swal({
                                text: "Exclusão realizada!",
                                icon: "success",
                                timer: 2000,
                                closeOnEsc: false,
                                closeOnClickOutside: false,
                                buttons: false
                            }).then(function() {
                                $('#submitEdit').trigger('reset');
                                location.reload();
                            })
                        } else {
                            swal({
                                title: "Problema ao excluir!",
                                text: "",
                                icon: "warning",
                                timer: 3000,
                                closeOnEsc: false,
                                closeOnClickOutside: false,
                                buttons: false
                            }).then(function() {
                                $('#submitEdit').trigger('reset');
                                location.reload();
                            })
                        }
                    }
                })
            } else {
                swal("Exclusão cancelada!");
            }
        })
    })
})