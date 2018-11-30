function fetchData(header, onSuccess) {
    var url = '/professor/aluno/visualizar'

    $.ajax({
        url: url,
        type: "GET",
        data: { json: true },
        success: onSuccess
    })
}

$(document).ready(function() {
    fetchData({}, (data) => {
        data = JSON.parse(data)

        table.clear()
        table.draw()
        for(var i = 0; i < data.length; i++) {
            table.row.add([
                data[i].rm_aluno,
                data[i].nome,
                data[i].turma,
                data[i].unidade
            ]).draw(false)
        }

        $('.ui.segment.card-body.dimmable').dimmer('hide')
        $('.ui.segment.card-body.dimmable .dimmer').removeClass('active')
    })
    
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
            table.buttons().container().appendTo('#table_wrapper .col-md-6:eq(0)')
        }
    })

})