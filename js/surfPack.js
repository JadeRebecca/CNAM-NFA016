//variables
var nbArticle = 0;
var urlPhoto =  '';
var sem ='';

/*********************             CARTES PRESENTATION DES PACKAGES     ************************************/
var cartes = document.getElementsByClassName('presaPackSingle');
//au survol de la carte : changement de style du titre et du bouton
for(var i = 0;i < cartes.length;i++){
  cartes[i].addEventListener("mouseover", function() {
         this.style.backgroundColor="#fefefe"; 
		 var titres = this.querySelectorAll('h2');
		 for(var j = 0;j < titres.length;j++){
			titres[j].style.color="#F4B52E";
		 }
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

/********************   CREATION DU CAROUSSEL ******************************/
//pour chaque object du tableau carousselData
var i = 0;
carousselData.forEach(function(item){
	
console.log(item.src)
	var newLi = document.createElement("li"); 
	if(i == 0){
		newLi.classList="active"
	}
	newLi.dataset.target = "#carouselInt" ;
	newLi.dataset.slideTo = i ;
	document.getElementById("carouselList").appendChild(newLi)
	
	var newDiv = document.createElement("div"); 
	if(i == 0){
		newDiv.classList="carousel-item active"
	}
	else{
		newDiv.classList="carousel-item"
	}
	var newImg = document.createElement("img")
	newImg.classList= "d-block w-100"
	newImg.src = item.src
	newImg.alt = item.alt
	newDiv.appendChild(newImg)
	document.getElementById("carouselPhoto").appendChild(newDiv);	
	i++;
});


/********************           INIT DE LA FICHE DU PRODUIT ******************************/
//initialement non visible
document.getElementById('detailPack').style.display = "none";

//evenements au survol du tableau des prix (indépendant du package choisi)
document.getElementById("bungalow").addEventListener("mouseover", function() {
	document.getElementsByClassName("imgDynamique")[0].setAttribute("src", "images/photo/hebergement/bungalow.jpg");
});

document.getElementById("chambre").addEventListener("mouseover", function() {
	document.getElementsByClassName("imgDynamique")[0].setAttribute("src", "images/photo/hebergement/chambre.jpg");
});
document.getElementById("lit").addEventListener("mouseover", function() {
	document.getElementsByClassName("imgDynamique")[0].setAttribute("src", "images/photo/hebergement/lit.jpg");
});
//evenement à la sortie du survol du tableau des prix
document.getElementById("tablePrix").addEventListener("mouseout", function( event ) {   
  	document.getElementsByClassName("imgDynamique")[0].setAttribute("src", urlPhoto);
});

//remplissage de la liste des dates de dispo (indépendant du package choisi)
remplirDateDispo();



/********************AFFICHAGE DE LA FICHE DU PRODUIT******************************/
//pour chaque object du tableau surfPack
surfPackData.forEach(function(item){
	//chaque objet du tableau surfPack a un attribut classEl qui contient le nom de la classe du bouton CTA permettant de sélectionner un package pour afficher sa fiche
	var el = document.getElementsByClassName(item.classEl);
	//pour chaque élément de la classe
	for( var i=0; i<el.length; i++){
		el[i].addEventListener("click", function() {
			//remplissage de la fiche produit
			document.getElementById('ancre').innerHTML = item.titre;
			document.getElementById('packSubTitle').innerHTML = item.sousTitre;
			document.getElementById('packDescription').innerHTML = item.description;
			document.getElementsByClassName("imgDynamique")[0].setAttribute("src", item.photo);
			urlPhoto = item.photo;
			//remplissage tableau des prix
			remplirTabPrix(item.prix);
			//cache le carousel
			document.getElementById('carousel').style.display = "none";
			//rend visible la fiche produit
			document.getElementById('detailPack').style.display = "block";
			
			//mise à jour du menu
			resetClassMenu(); //désactive tous les éléments du menu
			let classTempo = item.classEl+' menuItem';
			document.getElementsByClassName(classTempo)[0].classList.add("active"); //active l'élément du menu correspondant au package sélectionné
		})
	}
});



/***************** TABLEAU DES PRIX*********************************************/
function remplirTabPrix(tabPrix)
{
	var classTab = '';
	var montant = 0;
	i=0;
	for( var i=0; i<tabPrix.length; i++){
		classTab = tabPrix[i].logement+" "+tabPrix[i].duree+" "+tabPrix[i].saison;
		montant = Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(tabPrix[i].montant);
		document.getElementsByClassName(classTab)[0].getElementsByTagName("span")[0].innerHTML = montant;
		if(sem ===''){
			document.getElementsByClassName(classTab)[0].getElementsByTagName("button")[0].style.display = "none";
		}
		
		document.getElementsByClassName(classTab)[0].getElementsByTagName("button")[0].addEventListener("click", function (e) {
			ajoutPanier();
		});
	}

}


/**********************      DISPONIBILITES               **************************************************/
/***ajout des éléments dans la liste des dates de dispo avec les data contenues dans les attribut de l'object dispoData*/
function remplirDateDispo(){
	for( var i=0; i<dispoData.length -1; i++){
		var dateDispo = document.createElement("option"); // Création d'un élément li
		dateDispo.id = i; 
		dateDispo.value = i; 
		dateDispo.textContent = dispoData[i].debut; 
		document.getElementsByClassName("dispoDate")[0].appendChild(dateDispo); // Insertion du nouvel élément
	}
}


/***event si l'utilisateur choisit une date  ---->  mise à jour dynamique des propriétés des cases du tableau (background + contenu)*****/
document.getElementsByClassName("dispoDate")[0].addEventListener("input", function (e) {
    sem = e.target.value; // valeur choisi dans la liste déroulante
	var semSuivante = parseInt(sem)+1;
	var saisonClassAffiche = '';
	var nbDispo=0;
	//1- on cache les prix hors saison
	var eltTitreSaison = document.getElementsByClassName('titreSaison'); 
	for (var j = 0 ; j < eltTitreSaison.length ; j++) {   
		eltTitreSaison[j].style.display = "none";	
	}
	var eltTitreSemaine = document.getElementsByClassName('titreSemaine'); 
	for (var j = 0 ; j < eltTitreSemaine.length ; j++) {   
		eltTitreSemaine[j].colSpan = "2";
		//eltTitreTarif[0].rowSpan = "1";			
	}
	var eltTitreTarif = document.getElementsByClassName('titreTarif'); 
	eltTitreTarif[0].rowSpan = "1";	
		
	if(dispoData[sem].saison == 'HS'){
		saisonClassAffiche = 'hauteSaison';
		saisonClassCache = 'basseSaison';
	}
	else{
		saisonClassAffiche = 'basseSaison';
		saisonClassCache = 'hauteSaison';
	}
	eltAffiche = document.getElementsByClassName(saisonClassAffiche);
	eltCache = document.getElementsByClassName(saisonClassCache); 
	for (var j = 0 ; j < eltAffiche.length ; j++) {   
		eltAffiche[j].style.display = "table-cell";	
		eltAffiche[j].colSpan = "2";
		eltCache[j].style.display = "none";	
		
	}

	//2-pour chaque produit (bungalow, chambre, lit), on adapte le backgroundColor selon la dispo
	const produit = ['bungalow','chambre','lit'];

	produit.forEach(function(el){
		var classe = saisonClassAffiche+" "+el;
		var nomProduit = el;
		elt1s = document.getElementsByClassName(classe+" 1s"); 
		elt2s = document.getElementsByClassName(classe+" 2s"); 

		if(dispoData[sem][nomProduit] <1){
			//fond rouge pour le bungalow + pas de bouton
			//si semaine1 pas dispo, produit pas dispo
			for (var j = 0 ; j < elt1s.length ; j++) {
				elt1s[j].className = elt1s[j].className.replace( /(?:^|\s)dispo(?!\S)/g , "" )
				elt1s[j].className += " indispo";
				elt1s[j].getElementsByTagName("span")[1].getElementsByTagName("button")[0].style.display = "none";
				elt1s[j].getElementsByTagName("p")[0].innerHTML = "";
				elt2s[j].className = elt2s[j].className.replace( /(?:^|\s)dispo(?!\S)/g , "" )
				elt2s[j].className += " indispo";
				elt2s[j].getElementsByTagName("span")[1].getElementsByTagName("button")[0].style.display = "none";
				elt2s[j].getElementsByTagName("p")[0].innerHTML = "";
			}
		}
		else{
			//fond vert + afficher le nombre de place restante + bouton achat
			for (var j = 0 ; j < elt1s.length ; j++) {
				elt1s[j].className = elt1s[j].className.replace( /(?:^|\s)indispo(?!\S)/g , "" )
				elt1s[j].className += " dispo";
				elt1s[j].getElementsByTagName("span")[1].getElementsByTagName("button")[0].style.display = "inline";
				elt1s[j].getElementsByTagName("p")[0].innerHTML = dispoData[sem][nomProduit]+" dispo.";
			}
			for (var j = 0 ; j < elt2s.length ; j++) {
				if(dispoData[semSuivante][nomProduit] <1){
					elt2s[j].className = elt2s[j].className.replace( /(?:^|\s)dispo(?!\S)/g , "" )
					elt2s[j].className += " indispo";
					elt2s[j].getElementsByTagName("span")[1].getElementsByTagName("button")[0].style.display = "none";
					elt2s[j].getElementsByTagName("p")[0].innerHTML = "";
				}
				else{
					nbDispo = (Math.min(dispoData[sem][nomProduit], dispoData[semSuivante][nomProduit]));
					elt2s[j].className = elt2s[j].className.replace( /(?:^|\s)indispo(?!\S)/g , "" )
					elt2s[j].className += " dispo";
					elt2s[j].getElementsByTagName("span")[1].getElementsByTagName("button")[0].style.display = "inline";
					elt2s[j].getElementsByTagName("p")[0].innerHTML = nbDispo+" dispo.";
				}
			}
		}
	});
});



$(function () {
	$('[data-toggle="tooltip"]').tooltip()
})
  

//update de la page si clique sur tous les packages ("Nos packs")
var el = document.getElementsByClassName("nosPacks");
for( var i=0; i<el.length; i++){
	el[i].addEventListener("click", function() {
		resetClassMenu();
		document.getElementsByClassName("menuItem nosPacks")[0].classList.add("active");
		document.getElementById('detailPack').style.display = "none";
		document.getElementById('carousel').style.display = "block";
	})
}

//reset des classes du menu
function resetClassMenu() {
	var elClassChange = document.getElementsByClassName('menuItem');
	for( var i=0; i<elClassChange.length; i++){
		elClassChange[i].classList.remove("active");
	}
}

function ajoutPanier(){
	nbArticle++;
	toastr.success('Votre panier contient '+nbArticle+' article(s)', 'Le pack a été ajouté à votre panier !');
}
