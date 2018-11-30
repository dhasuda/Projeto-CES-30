function fetchData(header, onSuccess) {
    var url = '/professor/turma/visualizar';

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
        var turmas = data.turmas

        table.clear();
        table.draw();
        turmas.forEach(turma => {
            table.row.add([
                turma.turma,
                turma.redacoes,
                '<div class="progress"><div id="progress_bar" class="progress-bar" style="width:' + turma.nao_submetidas*100/turma.redacoes + '%">' + turma.nao_submetidas + '</div></div>',
                '<div class="progress"><div id="progress_bar" class="progress-bar" style="width:' + turma.nao_corrigidas*100/turma.redacoes + '%">' + turma.nao_corrigidas + '</div></div>',
                '<div class="progress"><div id="progress_bar" class="progress-bar" style="width:' + turma.em_correcao*100/turma.redacoes + '%">' + turma.em_correcao + '</div></div>',
                '<div class="progress"><div id="progress_bar" class="progress-bar" style="width:' + turma.corrigidas*100/turma.redacoes + '%">' + turma.corrigidas + '</div></div>',
                '<div class="progress"><div id="progress_bar" class="progress-bar" style="width:' + turma.publicadas*100/turma.redacoes + '%">' + turma.publicadas + '</div></div>'
            ]).draw(false);
        })
        
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
        }
    });

})