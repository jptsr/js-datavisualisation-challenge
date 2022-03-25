const prev_child_div = document.getElementById('bodyContent')
const canvas = document.createElement('canvas')
canvas.setAttribute('id', 'canvas_graph')
const parent = prev_child_div.parentNode
parent.insertBefore(canvas, prev_child_div)

let data_retrieved = []
let data_index = [], index = 0
let graph_exist = false



const labels = data_index

let data = {
    labels: labels,
    datasets: [
        {
            label: 'Crime stat',
            backgroundColor: 'rgb(255, 150, 31)',
            borderColor: 'rgb(255, 150, 31)',
            data: data_retrieved,
            tension : 0.1,
            pointRadius: 1.5,
            borderWidth: 1.5
        }
    ]
}

const config = {
    type: 'line',
    data: data,
    options: {}
}

const graph = new Chart(
    document.getElementById('canvas_graph'),
    config
)

let updateFetch = () => {
    fetch('https://canvasjs.com/services/data/datapoints.php', {cache: "no-cache"})
    .then(res => res.json(), err => console.log(err))
    .then(data => display(data), err => console.log(err))   
}

updateFetch()
setInterval(updateFetch, 10000)

let display = (data) => {
    console.log(data)
    data.forEach((el, i) => {
        setTimeout(() => {
            index++
            data_index.push(index)
            data_retrieved.push(parseInt(el[1]))
            console.log(parseInt(el[1]))
            graph.update()
        }, i * 1000)
    })
}