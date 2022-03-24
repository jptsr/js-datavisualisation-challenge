/**MODE D'EMPLOI
 * Intégrer le canvas dans l'html => OK
 *      - const parent
 *      - createElement
 * Afficher un graphe => OK
 * Récupérer les données avec Ajax => OK
 * Implenter les données récupérées dans le graphe => OK
 * Faire le temps réel sur base du tuto => EN COURS
 * Pimper le graphe
 * Faire les bonus
 */



const prev_child_div = document.getElementById('bodyContent');
const canvas = document.createElement('canvas');
canvas.setAttribute('id', 'canvas_graph');
const parent = prev_child_div.parentNode;
parent.insertBefore(canvas, prev_child_div);

let index = 0;
let data_retrieved = [];
let data_index = [];
let data_all = [];
let graph_exist = false;



const labels = data_index;

const data = {
    labels: labels,
    datasets: [
        {
            label: 'Crime stat',
            backgroundColor: 'rgb(255, 150, 31)',
            borderColor: 'rgb(255, 150, 31)',
            data: data_retrieved,
            tension : 0.1
        }
    ]
}

const config = {
    type: 'line',
    data: data,
    options: {}
}

// let displayChart = () => {
//     graph = new Chart(
//         document.getElementById('canvas_graph'),
//         config
//     )
//     graph_exist = true;
// }

let graph = new Chart(
    document.getElementById('canvas_graph'),
    config
)

// displayChart();

/**DATA
 * Récupérer les données
 * Maj en temps réel des données
 * Afficher les données dans le graphe
 */

let updateData = () => {
    graph.update();
    setTimeout(function(){updateData()}, 1000);
    // graph.reset();
   
}

let updateFetch = () => {
    fetch('https://canvasjs.com/services/data/datapoints.php', {cache: "no-cache"})
    .then(res => res.json(), err => console.log(err))
    .then(data => display(data), err => console.log(err))
    
    // setTimeout(function(){updateFetch()}, 1000)
}

// updateFetch();
setInterval(updateFetch, 5000)

let display = (data) => {
    console.log(data)

    data.forEach(el => {
        // graph.update();
        index++;
        // data_index.push(el[0]);
        data_index.push(index);
        data_retrieved.push(parseInt(el[1]));
        // graph.data.datasets[0].data.push(parseInt(el[1]))
        // graph.update();
        // console.log('data retrieved  ', data_retrieved)
        // console.log('graph data   ', graph.data.datasets[0].data)
        // displayChart();
        // if(!graph_exist){
        //     displayChart();
        // }
        updateData();
        // graph.reset();
       
    });

    // displayChart();
    // updateData(); 
};

// console.log('????');