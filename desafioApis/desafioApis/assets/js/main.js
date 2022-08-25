let myChart
async function getValue(infoDolar){
    var res,resultDollar
    try{
       res = await fetch( "https://mindicador.cl/api/" + infoDolar);
        resultDollar = await res.json();
    }catch(e){
        document.getElementById('msjError').innerHTML = 'El error es: ' + e
    }
    return resultDollar
}

async function calculate(){
    let amount          = document.getElementById("amount").value;
    let typeCurrency    = document.getElementById('currency').value
    let valores         =  await getValue(typeCurrency)
    let dolarHoy        = Math.round(valores.serie[0].valor)
    let total           = amount * dolarHoy
    document.getElementById('result').innerHTML = '<p> Su ' + typeCurrency +' hoy es: ' + total + '<p>'
    renderGrafica(valores,typeCurrency);
}
async function renderGrafica(valores,typeCurrency) {
    const   arrSeries       = valores.serie.slice(0,10)
    let fechas              = Array();
    let values              = Array()
    arrSeries.forEach(a => {
        fechas.push(a.fecha.substring(0, 10))
        values.push(Math.round(a.valor))
    });
    /// grafico
    const tipoDeGrafico = 'line'
    const colorDeLinea = 'red'
    const titulo = typeCurrency
    const config = {
        type: tipoDeGrafico,
        borderWidth: 1,// Ancho del borde
        data: {
            labels:fechas,
            datasets: [
                    {
                    label: titulo,
                    backgroundColor: colorDeLinea,
                    data: values
                    }
                ]}
            }


    const chartDOM = document.getElementById("myChart")
    
    if(myChart){
        myChart.destroy()
    }
    myChart = new Chart(chartDOM, config)
}