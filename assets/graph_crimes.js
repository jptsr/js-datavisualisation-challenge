// Création de tableaux pour receuillir les données du tableau html  
let table1C = []
let table1Y   = []
let data1 = []
// Récupération des données du tableau html
const table1 = document.getElementById('table1');
let getData1 = table1.querySelectorAll('tr');
getData1 = [...getData1]

// Push les données
// Récupération du texte contenu dans les tr
for(let i = 0; i < getData1 .length; i++){
    data1.push(getData1 [i].textContent)
}

// regex qui permet d'enlever les espaces
for(let i = 0; i < data1.length; i++){
    data1[i] = data1[i].replace(/\s+/g, ' ').trim();
    data1[i] = data1[i].split(' ');
    data1[i].shift();

    
    for(let j = 1; j < data1[i].length; j++){
        data1[i][j] = parseFloat(data1[i][j])
    }
}
for(let i = 0; i < data1.length; i++){
    table1C.push(data1[i][0]);
    data1[i].shift();
}

// push les années 
table1Y.push(getData1[1].textContent)
table1Y[0] = table1Y[0].replace(/\s+/g, ' ').trim();
table1Y = table1Y[0].split(' ')

const labels = [...table1Y];
let graph1 = [
    {
        labels: labels,
        datasets: []
    }
];
// Cache les données non importantes
table1C.shift(); // enlève '2003'
table1C.shift(); // enlève "Country"

// Couleur aléatoire
// change les données en héxadécimal 
for(let i = 0; i < table1C.length; i++){
    let color = Math.floor(Math.random() * 16777215).toString(16);
    
    graph1[0].datasets.push(
        {
            label: table1C[i],
            backgroundColor: '#' + color,
            borderColor: '#' + color,
            data: [...data1[i]]
        }
    )
}
// Type de graphique + animation 
const config = {
    type: 'line',
    data: graph1[0],
    options: {
        animation: {
            tension: {
                duration: 1000,
                easing: 'linear',
                from: 1,
                to: 0,
                loop: true
            },
            transitions:{
                show: {
                    animatation: {
                        x:{
                            from:0
                        },
                        y:{
                            from:0
                        }
                    }
                },
                hide: {
                    animatation:{
                        x: {
                            to: 0
                        },
                        y: {
                            to: 0
                        }
                    }
                }
            }
        },
    }
};

// Création d'un canva + insertion dans l'html
const canvas1 = document.createElement('canvas');
canvas1.setAttribute('id', 'canvas1');
const parent1 = table1.parentNode;
parent1.insertBefore(canvas1, table1);

const chartOne = new Chart(document.getElementById('canvas1'), config);