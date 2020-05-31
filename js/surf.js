/*********************             CARTE PRESENTATION DES PACKAGES     ************************************/
var cartes = document.getElementsByClassName('presaPackSingle');

for(var i = 0;i < cartes.length;i++){
//console.log(i);
  cartes[i].addEventListener("mouseover", function() {
		//couleur de fond
         this.style.backgroundColor="#fefefe";
		 //couleur du titre		 
		 var titres = this.querySelectorAll('h2');
		 for(var j = 0;j < titres.length;j++){
			titres[j].style.color="#F4B52E";
		 }
		 //couleur du bouton
		 var buttons = this.querySelectorAll('button');
		 for(var j = 0;j < buttons.length;j++){
			buttons[j].style.backgroundColor="#356E99";
			buttons[j].style.borderColor="#356E99";
			buttons[j].style.color="#ffffff";
		 }
  });
  cartes[i].addEventListener("mouseout", function() {
         this.style.backgroundColor="rgba(237, 237, 237, 1)";
		 var titres = this.querySelectorAll('h2');
		 for(var j = 0;j < titres.length;j++){
			titres[j].style.color="#356E99";
		 }
		 var buttons = this.querySelectorAll('button');
		 for(var j = 0;j < buttons.length;j++){
			buttons[j].style.backgroundColor="#ffffff";
			buttons[j].style.borderColor="#356E99";
			buttons[j].style.color="#356E99";
		 }
  });
}

/********************INIT DE LA FICHE DU PRODUIT******************************/
//initialement non visible
document.getElementById('produit').style.display = "none";

//evenements au survol du tableau (indépendant du package choisi)
document.getElementById("bungalow").addEventListener("mouseover", function() {
	document.getElementsByClassName("imgDynamique")[0].setAttribute("src", "imagetp2/photo/bungalow.jpg");
});

document.getElementById("chambre").addEventListener("mouseover", function() {
	document.getElementsByClassName("imgDynamique")[0].setAttribute("src", "imagetp2/photo/chambre.jpg");
});
document.getElementById("lit").addEventListener("mouseover", function() {
	document.getElementsByClassName("imgDynamique")[0].setAttribute("src", "imagetp2/photo/lit.jpg");
});
//evenement à la sortie du survol du tableau
document.getElementById("tablePrix").addEventListener("mouseout", function( event ) {   
  	document.getElementsByClassName("imgDynamique")[0].setAttribute("src", "imagetp2/packs/pack_debutant.jpg");
});

//remplissage de la liste des dates de dispo (indépendant du package choisi)
remplirDateDispo();



/********************AFFICHAGE DE LA FICHE DU PRODUIT******************************/

surfPack.forEach(function(item){
	var el = document.getElementsByClassName(item.classEl);
	for( var i=0; i<el.length; i++){
		el[i].addEventListener("click", function() {
		document.getElementById('ancre').innerHTML = item.titre;
		document.getElementById('packSubTitle').innerHTML = item.sousTitre;
		document.getElementById('packDescription').innerHTML = item.description;
		document.getElementsByClassName("imgDynamique")[0].setAttribute("src", item.photo);
		//remplissage tableau des prix
		remplirTabPrix(item.prix);
		//cache le carousel
		document.getElementById('carousel').style.display = "none";
		//rend visible la fiche produit
		document.getElementById('produit').style.display = "block";
		})
	}
});



/*****************TABLEAU DES PRIX*********************************************/
function remplirTabPrix(tabPrix)
{
	var classTab = '';
	var montant = 0;
	i=0;
	for( var i=0; i<tabPrix.length; i++){
		classTab = tabPrix[i].logement+" "+tabPrix[i].duree+" "+tabPrix[i].saison;
		montant = Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(tabPrix[i].montant);
		document.getElementsByClassName(classTab)[0].getElementsByTagName("span")[0].innerHTML = montant;
	}

}


/**********************      DISPONIBILITES               **************************************************/

/***ajout des éléments dans la liste des dates de dispo*/
function remplirDateDispo(){
	for( var i=0; i<dispo.length; i++){
		var dateDispo = document.createElement("option"); // Création d'un élément li
		dateDispo.id = i; // Définition de son identifiant
		dateDispo.value = i; // Définition de son identifiant
		dateDispo.textContent = dispo[i].debut; // Définition de son contenu textuel
		document.getElementsByClassName("dispoDate")[0].appendChild(dateDispo); // Insertion du nouvel élément
	}
}


/***event si l'utilisateur choisit une date  ---->  mise à jour dynamique des propriétés des cases du tableau (background + contenu)*****/
document.getElementsByClassName("dispoDate")[0].addEventListener("input", function (e) {
    var sem = e.target.value; // valeur choisi dans la liste déroulant
	var semSuivante = parseInt(sem)+1;
	var saison = '';
	var elt;
	var nbDispo=0;
    //1- on grise les produits hors saison
	if(dispo[sem].saison == 'HS'){
		saison = 'hauteSaison';
		//fond gris pour les cases de la classe basseSaison + ne rien afficher
		elt = document.getElementsByClassName("basseSaison"); 
		for (var j = 0 ; j < elt.length ; j++) {
			elt[j].style.backgroundColor = "#8F8F8F"; 
			elt[j].getElementsByTagName("button")[0].style.display = "none";			
		}
	}
	else{
		saison = 'basseSaison';
		//fond gris pour les cases de la classe hauteSaison + ne rien afficher
		elt = document.getElementsByClassName("hauteSaison"); 
		for (var j = 0 ; j < elt.length ; j++) {
			elt[j].style.backgroundColor = "#8F8F8F";   
			elt[j].getElementsByTagName("button")[0].style.display = "none";			
		}
	}
	
	//2-pour chaque produit (bungalow, chambre, lit), on adapte le backgroundColor selon la dispo
	
	/*********************BUNGALOW**************************************************/
	elt1s = document.getElementsByClassName(saison+" bungalow 1s"); 
	elt2s = document.getElementsByClassName(saison+" bungalow 2s"); 
	//objet contenant les produits
	/*var produit = new Array(
	{
		id : 1,
		nom : 'bungalow'
	}, 
	{
		id : 2,
		nom : 'chambre'
	},
	{
		id : 3,
		nom : 'lit'
	}) ;*/
//TODO EVOLUTION : faire une boucle sur les 3 produits pour minimiser le code
	if(dispo[sem].bungalow <1){
		//fond rouge pour le bungalow + pas de bouton
		//si semaine1 pas dispo, produit pas dispo
		for (var j = 0 ; j < elt1s.length ; j++) {
			elt1s[j].style.backgroundColor = "#E93163";
			elt1s[j].getElementsByTagName("button")[0].style.display = "none";
			elt1s[j].getElementsByTagName("p")[0].innerHTML = "";
			elt2s[j].style.backgroundColor = "#E93163";
			elt2s[j].getElementsByTagName("button")[0].style.display = "none";
			elt2s[j].getElementsByTagName("p")[0].innerHTML = "";
		}
		//console.log("ok"+dispo[sem].bungalow);
	}
	else{
		//fond vert + afficher le nombre de place restante + bouton achat
		for (var j = 0 ; j < elt1s.length ; j++) {
			elt1s[j].style.backgroundColor = "#659E7D";
			elt1s[j].getElementsByTagName("button")[0].style.display = "inline";
			elt1s[j].getElementsByTagName("p")[0].innerHTML = "plus que "+dispo[sem].bungalow+" bungalow(s) disponible(s)";
		}
		for (var j = 0 ; j < elt2s.length ; j++) {
			//console.log("semaine actuelle : "+sem+" // suivante : "+semSuivante+" "+dispo[semSuivante].bungalow);
			if(dispo[semSuivante].bungalow <1){
				elt2s[j].style.backgroundColor = "#E93163";
				elt2s[j].getElementsByTagName("button")[0].style.display = "none";
				elt2s[j].getElementsByTagName("p")[0].innerHTML = "";
			}
			else{
				nbDispo = (Math.min(dispo[sem].bungalow, dispo[semSuivante].bungalow));
				//parseInt(dispo[sem].bungalow)-dispo[sem].bungalow;
				elt2s[j].style.backgroundColor = "#659E7D";
				elt2s[j].getElementsByTagName("button")[0].style.display = "inline";
				elt2s[j].getElementsByTagName("p")[0].innerHTML = "plus que "+nbDispo+" bungalow(s) disponible(s) ["+dispo[sem].bungalow+","+dispo[semSuivante].bungalow+"]";
				console.log("dispo 2 semaines");
			}
		}
	}
	
	/*********************CHAMBRE**************************************************/
	elt1s = document.getElementsByClassName(saison+" chambre 1s"); 
	elt2s = document.getElementsByClassName(saison+" chambre 2s"); 
	
	if(dispo[sem].chambre <1){
		for (var j = 0 ; j < elt.length ; j++) {
			elt1s[j].style.backgroundColor = "#E93163";
			elt1s[j].getElementsByTagName("button")[0].style.display = "none";
			elt1s[j].getElementsByTagName("p")[0].innerHTML = "";
			elt2s[j].style.backgroundColor = "#E93163";
			elt2s[j].getElementsByTagName("button")[0].style.display = "none";
			elt2s[j].getElementsByTagName("p")[0].innerHTML = "";

		}
	}
	else{
		for (var j = 0 ; j < elt1s.length ; j++) {
			elt1s[j].style.backgroundColor = "#659E7D";
			elt1s[j].getElementsByTagName("button")[0].style.display = "inline";
			elt1s[j].getElementsByTagName("p")[0].innerHTML = "plus que "+dispo[sem].chambre+" chambre(s) disponible(s)";
		}
		for (var j = 0 ; j < elt2s.length ; j++) {
			if(dispo[semSuivante].chambre <1){
				elt2s[j].style.backgroundColor = "#E93163";
				elt2s[j].getElementsByTagName("button")[0].style.display = "none";
				elt2s[j].getElementsByTagName("p")[0].innerHTML = "";
			}
			else{
				nbDispo = (Math.min(dispo[sem].chambre, dispo[semSuivante].chambre));
				elt2s[j].style.backgroundColor = "#659E7D";
				elt2s[j].getElementsByTagName("button")[0].style.display = "inline";
				elt2s[j].getElementsByTagName("p")[0].innerHTML = "plus que "+nbDispo+" chambre(s) disponible(s) ["+dispo[sem].chambre+","+dispo[semSuivante].chambre+"]";
				console.log("dispo 2 semaines");
			}
		}
	}
	/*********************LIT**************************************************/
	elt1s = document.getElementsByClassName(saison+" lit 1s"); 
	elt2s = document.getElementsByClassName(saison+" lit 2s"); 
	
	if(dispo[sem].lit <1){
		for (var j = 0 ; j < elt.length ; j++) {
			elt1s[j].style.backgroundColor = "#E93163";
			elt1s[j].getElementsByTagName("button")[0].style.display = "none";
			elt1s[j].getElementsByTagName("p")[0].innerHTML = "";
			elt2s[j].style.backgroundColor = "#E93163";
			elt2s[j].getElementsByTagName("button")[0].style.display = "none";
			elt2s[j].getElementsByTagName("p")[0].innerHTML = "";

		}
	}
	else{
		for (var j = 0 ; j < elt1s.length ; j++) {
			elt1s[j].style.backgroundColor = "#659E7D";
			elt1s[j].getElementsByTagName("button")[0].style.display = "inline";
			elt1s[j].getElementsByTagName("p")[0].innerHTML = "plus que "+dispo[sem].lit+" lit(s) disponible(s)";
		}
		for (var j = 0 ; j < elt2s.length ; j++) {
			if(dispo[semSuivante].lit <1){
				elt2s[j].style.backgroundColor = "#E93163";
				elt2s[j].getElementsByTagName("button")[0].style.display = "none";
				elt2s[j].getElementsByTagName("p")[0].innerHTML = "";
			}
			else{
				nbDispo = (Math.min(dispo[sem].lit, dispo[semSuivante].lit));
				elt2s[j].style.backgroundColor = "#659E7D";
				elt2s[j].getElementsByTagName("button")[0].style.display = "inline";
				elt2s[j].getElementsByTagName("p")[0].innerHTML = "plus que "+nbDispo+" lit(s) disponible(s) ["+dispo[sem].lit+","+dispo[semSuivante].lit+"]";
				console.log("dispo 2 semaines");
			}
		}
	}

});

/********************INIT DU CAROUSEL******************************/
//caché si fiche du package visible 
/*console.log(document.getElementById('produit').style.display);
if(document.getElementById('produit').style.display == "block"){
	
	
}
else{
	
}*/




$(function () {
	$('[data-toggle="tooltip"]').tooltip()
  })
  
  function	changerOn()
  {
	  document.getElementById('card1').style.backgroundColor="#fefefe";
	  document.getElementById('cardTitle1').style.color="#F4B52E";
	  document.getElementById('button1').style.backgroundColor="#356E99";
	  document.getElementById('button1').style.borderColor="#356E99";
	  document.getElementById('button1').style.color="#ffffff";
  }
  function	changerOff()
  {
	  document.getElementById('card1').style.backgroundColor="rgba(237, 237, 237, 1)";
	  document.getElementById('cardTitle1').style.color="#356E99";
	  document.getElementById('button1').style.backgroundColor="#ffffff";
	  document.getElementById('button1').style.borderColor="#356E99";
	  document.getElementById('button1').style.color="#356E99";
  }

//reload de la page si clique sur tous les packages ("Nos packs")
var el = document.getElementsByClassName("nosPacks");
for( var i=0; i<el.length; i++){
	el[i].addEventListener("click", function() {
		//console.log("avant  "+this.className);
		this.className+= " active ";
		//console.log("apres : "+this.className);
		document.getElementById('produit').style.display = "none";
		document.getElementById('carousel').style.display = "block";
		//document.location.reload(true);
	})
}


//******EVOLUTIONS******* */	
//to do : ajouter le nb de pdt dispo. Stocker les prix dans un tableau avant.
//to do : addEventListener sur le bouton pour ouvrir une popin qui demande si on veut ajouter ce produit à notre panier
//ajouter une icone panier dans le header avec le nombre de produit mis au panier
//to do :créer un .js pour stocker les data du tableau (price) et générer dynamiquement le tableau
//quand le tableau sera fini, ajouter un bouton "+ pension complete"
/*let root = document.documentElement;
  console.log(root.style.getPropertyValue('--aqua'));*/
  


