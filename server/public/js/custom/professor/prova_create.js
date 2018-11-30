function fetchData(header, onSuccess) {
    var url = '/professor/prova/disponibilizar';

    $.ajax({
        url: url,
        type: "GET",
        data: { json: true },
        success: onSuccess
    })
}

$.fn.dataTable.ext.buttons.all = {
    className: 'buttons-select-all',
    action: function(e, dt, node, config) {
        dt.rows({ search: 'applied' }).every(function() {
            this.nodes().to$().addClass('selected')
        })
    }
}

$.fn.dataTable.ext.buttons.clean = {
    className: 'buttons-clean-all',
    action: function(e, dt, node, config) {
        dt.rows().every(function() {
            this.nodes().to$().removeClass('selected')
        })
    }
}

$(document).ready(function() {
    fetchData({}, (data) => {
        data = JSON.parse(data);

        // coletaneas
        $('#spColetanea').empty();
        for(var i = 0; i < data.coletaneas.length; i++) {
            $('#spColetanea').append('<option value="' + data.coletaneas[i].id_proposta + '">' + data.coletaneas[i].nome + '</option>');
        }
        $('#spColetanea').selectpicker('refresh');

        // categorias
        $('#spCategoria').empty();
        for(var i = 0; i < data.categorias.length; i++) {
            $('#spCategoria').append('<option value="' + data.categorias[i].id_categoria + '">' + data.categorias[i].nome + '</option>');
        }
        $('#spCategoria').selectpicker('refresh');

        // turmas
        $('#spTurmas').empty();
        for(var i = 0; i < data.turmas.length; i++) {
            $('#spTurmas').append('<option value="' + data.turmas[i].turma + '">' + data.turmas[i].turma + '</option>');
        }
        $('#spTurmas').selectpicker('refresh');

        $('.ui.segment.card-body.dimmable').dimmer('hide');
        $('.ui.segment.card-body.dimmable .dimmer').removeClass('active');
    });

    $('.bs-select-all').text('Todas')
    $('.bs-deselect-all').text('Nenhuma')

    // selectable table
    var columns = [
        { "title": "Id" },
        { "title": "Nome" },
        { "title": "Turma" }
    ];

    var table = $('#table').DataTable({
        lengthChange: false,
        ordering: false,
        search: {
            regex: true,
            smart: false
        },
        columns: columns,
        columnDefs: [
            {
                "targets": [0],
                "visible": false
            }
        ],
        language: {
            url: "/json/datatables/portuguese-brasil.json"
        },
        initComplete: function(settings, json) {
            table.buttons().container().appendTo('#table_wrapper .col-md-6:eq(0)');
        }
    });

    // datetime picker
    $('#dateInput').datetimepicker({
        minDate: moment(),
        format: 'DD/MM/YYYY HH:mm'
    });

    // form submission
    $('#frmCreateRedacao').submit(function(e) {
        var selected_alunos = [];
        var coletanea;
        var categoria;
        var datalimite;
        var url;
        var semana;
        var turmas;

        for(var i = 0; i < table.rows('.selected').data().length; i++) {
            selected_alunos.push(table.rows('.selected').data()[i][0]);
        }
        turmas = $('#spTurmas').val()
        coletanea = $('#spColetanea').val();
        categoria = $('#spCategoria').val();
        semana = $('#semana').val()
        datalimite = convertDateToUTC(moment($('#date').val(), 'DD/MM/YYYY HH:mm')).format('DD/MM/YYYY HH:mm').toString();
        url = '/professor/aluno/delegar';

        $.ajax({
            type: "POST",
            url: url,
            data: {
                coletanea: coletanea,
                categoria: categoria,
                arquivo: '',
                datalimite: datalimite,
                semana: semana,
                turmas: turmas
            },
            success: function() {
                swal({
                    text: "Provas Disponibilizadas!",
                    icon: "success",
                    timer: 2000,
                    closeOnEsc: false,
                    closeOnClickOutside: false,
                    buttons: false
                }).then(function() {
                    $('#frmCreateRedacao').trigger('reset');
                    location.reload();
                })
            }
        })
    
        e.preventDefault();
    });

    // button to populate table
    $('#btnExibirAlunos').click(function () {
        if($('#spTurmas').val() == "") {
            swal("Ops!", "Nenhuma turma selecionada");
        } else {
            var turmas = $('#spTurmas').val();
            var url = '/professor/aluno/turma';
            $.ajax({
                url: url,
                type: "GET",
                data: {
                    turmas: turmas
                },
                success: function(data) {
                    var info = JSON.parse(data)
                    var results_qty = info.length
                    
                    table.clear();
                    table.draw();
                    for(var i = 0; i < results_qty; i++) {
                        table.row.add([
                            info[i].id_aluno,
                            info[i].nome,
                            info[i].turma
                        ]).draw(false);
                    }
                }
            })
        }
    });
    
})

function convertDateToUTC(date) {
    date = date.toDate();
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);
    
    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();
    
    newDate.setHours(hours + offset);
    
    return moment(newDate);   
}