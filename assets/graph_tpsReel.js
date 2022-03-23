/**MODE D'EMPLOI
 * Intégrer le canvas dans l'html => OK
 *      - const parent
 *      - createElement
 * Afficher un graphe => OK
 * Récupérer les données avec Ajax => EN COURS
 * Implenter les données récupérées dans le graphe
 * Faire le temps réel sur base du tuto
 * Pimper le graphe
 * Faire les bonus
 */



const prev_child_div = document.getElementById('bodyContent');
// console.log(prev_child_div);
const canvas = document.createElement('canvas');
canvas.setAttribute('id', 'canvas_graph');
const parent = prev_child_div.parentNode;
// console.log(parent);
parent.insertBefore(canvas, prev_child_div);
console.log('hello2');
let graph;


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

const xhr = new XMLHttpRequest();
let data_retrieved = [];

xhr.onreadystatechange = whatSstate = () => {
    if(xhr.readyStage == 4){
        console.log('Request is complete');
    }
}

xhr.onload = getData = () => {
    // récupére les données et les mettre au format json
    let res = xhr.response;
    // console.log(res);
    let data = JSON.parse(res); // tableau de tableaux contenant des paires de key/value
    // console.log(data);

    // accéder à chaque paire de key/value
    data.forEach(el => {
        console.log(el[0] + ' ' + el[1]);
        // mettre les paires de key/value dans le nouveau tableau
        // data_retrieved.push(
        //     {
        //         // key est maintenant déterminé comme étant une coordonnée avec sa valeur correspondante
        //         x: el[0],
        //         y: parseInt(el[1])
        //     }
        // );
        data_retrieved.push(parseInt(el[1]))
    });
    console.log(data_retrieved);

    displayChart();
}

xhr.open('GET', 'https://canvasjs.com/services/data/datapoints.php', true);
xhr.send();

xhr.onerror = error = () => {
    console.log('ERROR');
}



/**GRAPHE
 * axe x : ?
 * axe y : ?
 */

const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
]

const data = {
    labels: labels,
    datasets: [
        {
            label: 'Crime stat',
            backgroundColor: 'rgb(255, 150, 31)',
            borderColor: 'rgb(255, 150, 31)',
            // data: [0, 10, 5, 2, 20, 30, 45],    // données en temps réel
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