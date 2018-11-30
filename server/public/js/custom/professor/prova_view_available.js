function fetchData(onSuccess) {
    var url = '/professor/prova/disponibilizadas/';

    $.ajax({
        url: url,
        type: "GET",
        data: { json: true },
        success: onSuccess
    })
}

$(document).ready(function() {
    fetchData((data) => {
        data = JSON.parse(data);
        
        table.clear();
        table.draw();
        for(var i = 0; i < data.length; i++) {
            table.row.add([
                data[i].id,
                'Prova ' + data[i].semana,
                '<a>' + data[i].coletanea + '</a>' +
                '</br><span style="opacity: 0.5"> ' + data[i].categoria + '</span>',
                data[i].nome_aluno + '</br><span style="opacity: 0.5"> ' + data[i].aluno + '</span>',
                data[i].turma,
                data[i].estado,
                '<a class="btn btn-secondary mb-1" href="/professor/prova/correcao/' + data[i].id + '" role="button"><i class="fa fa-check" data-toggle="tooltip" title="Atribuir nota"></i></a>'
            ]).draw(false);
        }

        $('.ui.segment.card-body.dimmable').dimmer('hide');
        $('.ui.segment.card-body.dimmable .dimmer').removeClass('active');
    });

    $('#table thead tr').clone(true).appendTo( '#table thead' );
    $('#table thead tr:eq(1) th').each(function(i) {
        var title = $(this).text();
        $(this).html( '<input type="text" class="form-control" placeholder="' + title + '" />' );
 
        $('input', this).on('keyup change', function() {
            if(table.column(i).search() !== this.value) {
                table
                    .column(i)
                    .search(this.value, true, false)
                    .draw();
            }
        });
    });

    var table = $('#table').DataTable({
        lengthChange: false,
        ordering: false,
        search: {
            regex: true,
            smart: false
        },
        columnDefs: [
            {
                "targets": [0],
                "visible": false
            },
            {
                "targets": [6],
                "orderable": false
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
            table.buttons().container().appendTo('#table_wrapper .col-md-6:eq(0)');
            table.buttons().container().find('.buttons-redelegate').prop('disabled', true);

            $('#table_wrapper .col-md-6:eq(0)').removeClass('col-md-6').addClass('col-md-9')
            $('#table_wrapper .col-md-6:eq(0)').removeClass('col-md-6').addClass('col-md-3')
        },
        fnDrawCallback: function(feat) {
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

})