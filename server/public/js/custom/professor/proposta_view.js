function fetchData(onSuccess) {
    var url = '/professor/proposta/visualizar';
    console.log('HEREEEE')
    $.ajax({
        url: url,
        type: "GET",
        data: { json: true },
        success: onSuccess
    })
}

function getProposta(id, onSuccess) {
    var url = '/professor/proposta/buscar/' + id;

    $.ajax({
        url: url,
        type: "GET",
        data: { json: true },
        success: onSuccess
    })
}

$(document).ready(function() {
    var modal_table = $('#modal_table').DataTable({
        lengthChange: false,
        responsive: true,
        buttons: [
            { extend: 'copy', text: 'Copiar' },
            { extend: 'excel',   text: 'Excel' },
            { extend: 'pdf', text: 'PDF' }
        ],
        columnDefs: [
            {
                "targets": [0, 5],
                "visible": false
            },
            {
                "orderData": [5],
                "targets": [4]
            },
            {   
                "targets": [1],
                "type": 'natural'
            }
        ],
        language: {
            url: "/json/datatables/portuguese-brasil.json"
        },
        initComplete: function(settings, json) {
            modal_table.buttons().container().appendTo('#table_wrapper .col-md-6:eq(0)');
        },
        fnDrawCallback: function() {
            $('.identify-id[data-target="#delete"]').on('click', function () {
                var elementId = $(this).data('id');
                $('#submitDelete').attr('element-id', elementId);
            });
            $('.identify-id[data-target="#add"]').on('click', function () {
                var elementId = $(this).data('id');
                $('#submitUpload').attr('element-id', elementId);
            });
            $('[data-toggle="tooltip"]').tooltip();
        }
    });

    fetchData((data) => {
        data = JSON.parse(data);

        table.clear();
        table.draw();
        for(var i = 0; i < data.length; i++) {
            table.row.add([
                '<a>' + data[i].nome + '</a>',
                '<a>' + data[i].quantidade_provas + '</a>'
            ]).draw(false);
        }

        $('.ui.segment.card-body.dimmable').dimmer('hide');
        $('.ui.segment.card-body.dimmable .dimmer').removeClass('active');
    });

    var table = $('#table').DataTable({
        //ordering: false,
        lengthChange: false,
        buttons: [
            { extend: 'copy', text: 'Copiar' },
            { extend: 'excel',   text: 'Excel' },
            { extend: 'pdf', text: 'PDF' }
        ],
        columnDefs: [
            {
                "targets": [1],
                "width": "20%"
            }
        ],
        responsive: true,
        language: {
            url: "/json/datatables/portuguese-brasil.json"
        },
        initComplete: function(settings, json) {
            table.buttons().container().appendTo('#table_wrapper .col-md-6:eq(0)');
        },
        fnDrawCallback: function() {
            $('.identify-id[data-target="#delete"]').click(function () {
                var elementId = $(this).data('id');
                $('#submitEdit').attr('element-id', elementId);

                getProposta(elementId, (data) => {
                    data = JSON.parse(data)
                    $('#nome').val(data[0].nome)
                })
            });
            $('[data-toggle="tooltip"]').tooltip();
        }
    });

})