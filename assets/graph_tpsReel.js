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

let graph;
let data_retrieved = [];
let data_index = [];
let data_all = [];



let displayChart = () => {
    graph = new Chart(
        document.getElementById('canvas_graph'),
        config
    )
}

/**DATA
 * Récupérer les données
 * Maj en temps réel des données
 * Afficher les données dans le graphe
 */

let updateData = () => {
    // let res = xhr.response;
    // let data = JSON.parse(res);
    // let new_data = data[data.length-1];

    // console.log(data);

    // data.forEach(el => {
    //     data_index.push(el[0]);
    //     data_retrieved.push(parseInt(el[1]));
    // });

    // data_index.push(1);
    // data_retrieved.push(20);

    graph.update();

    console.log('update is ok');
    setTimeout(function(){updateData()}, 1000);
}

let updateFetch = () => {
    fetch('https://canvasjs.com/services/data/datapoints.php')
    .then(res => res.json(), err => console.log(err))
    .then(data => display(data), err => console.log(err));
    
    console.log('update fetch');
    setTimeout(function(){updateFetch()}, 1000);
}

updateFetch();

// fetch('https://canvasjs.com/services/data/datapoints.php')
// .then(res => res.json(), err => console.log(err))
// .then(data => display(data), err => console.log(err));

let display = (data) => {
    // setTimeout(function(){updateData()}, 1000);
    data.forEach(el => {
        // console.log(el[0] + ' ' + el[1]);

        // mettre les paires de key/value sous forme d'objet dans le nouveau tableau
        // data_retrieved.push(
        //     {
        //         // key est maintenant déterminé comme étant une coordonnée avec sa valeur correspondante
        //         x: el[0],
        //         y: parseInt(el[1])
        //     }
        // );

        data_index.push(el[0]);
        data_retrieved.push(parseInt(el[1]));
    });

    // data_all.push(data_index, data_retrieved);
    // console.log(data_all);

    displayChart();
    
    // updateData();
};

const labels = data_index;
// console.log(data_all);
// console.log(data_all[0]);
// console.log(data_all[1]);
// data_all.forEach(el => {console.log(el)})

const data = {
    labels: labels,
    datasets: [
        {
            label: 'Crime stat',
            backgroundColor: 'rgb(255, 150, 31)',
            borderColor: 'rgb(255, 150, 31)',
            data: data_retrieved,
            tension : 0.3
        }
    ]
}

const config = {
    type: 'line',
    data: data,
    options: {}
}