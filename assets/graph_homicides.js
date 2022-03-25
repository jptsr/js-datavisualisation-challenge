//CREATE CANVAS DOM----------------------------
//On crée une variable table2 qui pointe vers l'id table2 du dom
let table2 = document.getElementById('table2');
//crée une variable canvas qui va créer un élement canvas dans le dom
let canvas= document.createElement('canvas');
//On lui assigne des attributs : id role et label
canvas.setAttribute("id",'barCanvas');
canvas.setAttribute("role","img")
canvas.setAttribute("aria-label","chart")

//INSERT DOM
//on creer une variable parent qui renvoie au parent de table2
let parent=table2.parentNode
//On insert le canvas avant le parent de table 2
parent.insertBefore(canvas, table2);

// VARIABLE DONNEES-------------------------
//on crée des variables qui contiennent des tableaux vide
let pays=[];
let data1=[];
let data2=[];
//on creer une variable td qui pointe vers les td de table2
let td=table2.querySelectorAll("td");
//on va en profondeur dans le table en ne pointant que les td
td=[...td];

//BOUCLE DATA
//pour chaque element (i) qui est égale a 0, dont la longeur est inférieur a la taille du td, on ajoute +1 à l'élément à chaque fois
for(let i = 0; i<td.length;i++){
	//modullo de 3 pour avoir une ligne sur 3 sur l'élement de chaque td pour chaque données
	if(i%3 == 0) {
		pays.push(td[i].innerText)
	}
	if (i%3 == 1){
		data1.push(td[i].innerText)
	}
	if (i%3 == 2) {
		data2.push(td[i].innerText)
	}
}
//--------------------------------------------

//CREATE GRAPH:------------------------
//on créer un lien vers l'id canvas
let barCanvas=document.getElementById('barCanvas');
//on créer le graphique dans le canva de type bar, 
// - on lui assigne le label x = pays
// - le label x a des données (datasets=>data qui on un label(catégorie graph))
let mixedChart = new Chart(barCanvas,{
	type:"bar",
	data: {
		labels:pays,
		
		datasets:[{
			label:"2007-09",
			data: data1,
			backgroundColor:['lightpink'],
			
	}, {
		label: "2010-12",
		data: data2,
		backgroundColor:['#DA5CC5'],
        
	}],

},
	options:{
		
		plugins:{
			title:{
				display:true,
				text: 'Prison population average per year, 2007-09 and 2010-12 ',
				padding:{
					top:10,
					bottom:30,
					},
				
			
		 	       },
			subtitle:{
					display:true,
					text:"(per 100,000 inhabitants)",
				},
			
		},
		scales: {
			y:{
				suggestedMax:350,
				ticks:{
					font:{
						size: 15,
					}
				}
			},
			x:{
				ticks:{
					font:{
						size:11,
					}
				}
			}
		},
	
	
	}
})
//---------------------------------------------


