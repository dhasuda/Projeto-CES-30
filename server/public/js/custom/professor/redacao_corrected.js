function fetchData(header, onSuccess) {
    var url = '/professor/prova/correcao/finalizada';

    $.ajax({
        url: url,
        type: "GET",
        data: { json: true },
        success: onSuccess
    })
}
$(document).ready(function() {
    fetchData({}, (response) => {
        allData = JSON.parse(response)
        
        data = allData.data

        table.clear();
        table.draw();
        for(var i = 0; i < data.length; i++) {
            var prova = data[i];
            var nota = prova.nota.toFixed(1)

            var newRow = table.row.add([
                prova.id,
                'Redação ' + prova.semana + 
                ' </br><span style="opacity: 0.5"> ' + moment.utc(prova.pacote).tz(getTimezone()).fromNow() + '</span>',
                '<a>' + prova.coletanea + '</a>' +
                '</br><span style="opacity: 0.5"> ' + prova.categoria + '</span>',
                prova.nome_aluno + '</br><span style="opacity: 0.5"> ' + prova.aluno + '</span>',
                prova.turma,
                nota,
                prova.categoria
            ]).draw(false);
            newRow
            index = newRow.index()
        }

        // activate()
        $('.ui.segment.card-body.dimmable').dimmer('hide');
        $('.ui.segment.card-body.dimmable .dimmer').removeClass('active');
    });

    // table filter on header
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
                "targets": [0, 6],
                "visible": false
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
            this.api().columns().every(function() {
                var column = this;

                var select = $('<select class="filter-search"><option value=""></option></select>')
                    .appendTo($(column.footer()).empty())
                    .on('change', function() {
                        column
                            .search($(this).val())
                            .draw();
                    });

                column.data().unique().sort().each( function(d, j) {
                    select.append( '<option value="'+d+'">'+d+'</option>' )
                });
                select.append( '<option value="">Todos</option>' )
            });
        },
        fnDrawCallback: function() {
            $('[data-toggle="tooltip"]').tooltip();
        }
    });
    
    // datetime picker
    $('#dateInput').datetimepicker({
        locale: 'pt-BR',
        minDate: moment(),
        format: 'DD/MM/YYYY HH:mm'
    })

    $('.identify-id').click(e => {
        var elementId = $(this).data('id')
        $('#submitReescrita').attr('element-id', elementId)
    })

});