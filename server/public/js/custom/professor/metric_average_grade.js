function fetchData(onSuccess) {
    var url = '/professor/metrica/nota/media/';

    $.ajax({
        url: url,
        type: "GET",
        data: { json: true },
        success: onSuccess
    })
}

$(document).ready(function() {

    $('#filtro').val(0)
    $('#filtro').selectpicker('refresh')

    var data

    fetchData(result => {
        data = JSON.parse(result)
        drawChartByCorretor(data)      
    })

    $('#filtro').on('change', e => {
        $('#flux_chart').remove()
        $('#chart_container').append('<canvas id="flux_chart" class="chartjs-render-monitor">')

        var value = $(this).find("option:selected").val()
        if (value == 0) {
            drawChartByCorretor(data)
        } else if (value == 1) {
            drawChartByTurma(data)
        } else if (value == 2) {
            drawChartByCategoria(data)
        }
    })
})

function getBackgroundColors(n) {
    var allColors = [
        'rgba(255, 50, 50, 1)', // red
        'rgba(0, 157, 255, 1)', // blue
        'rgba(13, 255, 124, 1)', // green
        'rgba(255, 118, 42, 1)', // orange
        'rgba(147, 76, 255, 1)', // purple
        'rgba(154, 255, 92, 1)' // yellow-green
    ]
    colors = []
    for (var i=0; i<n; i++) {
        colors.push(allColors[i%n])
    }
    return colors
}

function drawChartByCorretor(data) {
    var labels =[]
    var values = []

    data.corretores.forEach(c => {
        labels.push(c.nome)
        values.push((Math.round(c.nota_media * 100) / 100).toFixed(2))
    })
    drawChart(labels, values, 'Corretor')
}

function drawChartByTurma(data) {
    var labels =[]
    var values = []

    data.turmas.forEach(c => {
        labels.push(c.turma)
        // values.push((Math.round(c.media * 100) / 100).toFixed(2))
        values.push(c.media.toFixed(2).toString())
    })
    drawChart(labels, values, 'Turma')
}

function drawChartByCategoria(data) {
    var labels =[]
    var values = []

    data.categorias.forEach(c => {
        labels.push(c.categoria)
        // values.push((Math.round(c.media * 100) / 100).toFixed(2))
        values.push(c.media.toFixed(2).toString())
    })
    drawChart(labels, values, 'Categoria')
}

function drawChart(labels, values, xName) {
    var columnsColors = getBackgroundColors(labels.length)

    var ctx = document.getElementById("flux_chart").getContext('2d');
    var fluxChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: columnsColors 
            }]
        },
        options: {
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        return tooltipItem.yLabel.toFixed(2).toString()
                    }
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        suggestedMax: 10
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Nota média em escala de 10'
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: xName
                    }
                }]
            },
            legend: {
                display: false
            }
        }
    })
}