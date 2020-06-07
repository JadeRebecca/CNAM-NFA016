
var prixPack1 = new Array(
    {
        montant : 720,
        saison : 'hauteSaison',
        duree : '1s',
        logement : 'bungalow',
        pack : 'coaching'
    }, 
    {
        montant : 600,
        saison : 'basseSaison',
        duree : '1s',
        logement : 'bungalow',
        pack : 'coaching'
    },
    {
        montant : 1020,
        saison : 'hauteSaison',
        duree : '2s',
        logement : 'bungalow',
        pack : 'coaching'
    }, 
    {
        montant : 780,
        saison : 'basseSaison',
        duree : '2s',
        logement : 'bungalow',
        pack : 'coaching'
    }
    ,
    {
        montant : 650,
        saison : 'hauteSaison',
        duree : '1s',
        logement : 'chambre',
        pack : 'coaching'
    }, 
    {
        montant : 545,
        saison : 'basseSaison',
        duree : '1s',
        logement : 'chambre',
        pack : 'coaching'
    },
    {
        montant : 895,
        saison : 'hauteSaison',
        duree : '2s',
        logement : 'chambre',
        pack : 'coaching'
    }, 
    {
        montant : 700,
        saison : 'basseSaison',
        duree : '2s',
        logement : 'chambre',
        pack : 'coaching'
    },
    {
        montant : 440,
        saison : 'hauteSaison',
        duree : '1s',
        logement : 'lit',
        pack : 'coaching'
    }, 
    {
        montant : 400,
        saison : 'basseSaison',
        duree : '1s',
        logement : 'lit',
        pack : 'coaching'
    },
    {
        montant : 540,
        saison : 'hauteSaison',
        duree : '2s',
        logement : 'lit',
        pack : 'coaching'
    }, 
    {
        montant : 460,
        saison : 'basseSaison',
        duree : '2s',
        logement : 'lit',
        pack : 'coaching'
    }
) ;


//contient tous les prix du tableau pack2 = pack trip
var prixPack2 = new Array(
    {
        montant : 630,
        saison : 'hauteSaison',
        duree : '1s',
        logement : 'bungalow',
        pack : 'trip'
    }, 
    {
        montant : 510,
        saison : 'basseSaison',
        duree : '1s',
        logement : 'bungalow',
        pack : 'trip'
    },
    {
        montant : 930,
        saison : 'hauteSaison',
        duree : '2s',
        logement : 'bungalow',
        pack : 'trip'
    }, 
    {
        montant : 690,
        saison : 'basseSaison',
        duree : '2s',
        logement : 'bungalow',
        pack : 'trip'
    }
    ,
    {
        montant : 560,
        saison : 'hauteSaison',
        duree : '1s',
        logement : 'chambre',
        pack : 'trip'
    }, 
    {
        montant : 455,
        saison : 'basseSaison',
        duree : '1s',
        logement : 'chambre',
        pack : 'trip'
    },
    {
        montant : 805,
        saison : 'hauteSaison',
        duree : '2s',
        logement : 'chambre',
        pack : 'trip'
    }, 
    {
        montant : 610,
        saison : 'basseSaison',
        duree : '2s',
        logement : 'chambre',
        pack : 'trip'
    },
    
    {
        montant : 350,
        saison : 'hauteSaison',
        duree : '1s',
        logement : 'lit',
        pack : 'trip'
    }, 
    {
        montant : 310,
        saison : 'basseSaison',
        duree : '1s',
        logement : 'lit',
        pack : 'trip'
    },
    {
        montant : 450,
        saison : 'hauteSaison',
        duree : '2s',
        logement : 'lit',
        pack : 'trip'
    }, 
    {
        montant : 370,
        saison : 'basseSaison',
        duree : '2s',
        logement : 'lit',
        pack : 'trip'
    }
) ;
    



var prixPack3 = new Array(
    {
        montant : 420,
        saison : 'hauteSaison',
        duree : '1s',
        logement : 'bungalow',
        pack : 'free'
    }, 
    {
        montant : 300,
        saison : 'basseSaison',
        duree : '1s',
        logement : 'bungalow',
        pack : 'free'
    },
    {
        montant : 720,
        saison : 'hauteSaison',
        duree : '2s',
        logement : 'bungalow',
        pack : 'free'
    }, 
    {
        montant : 480,
        saison : 'basseSaison',
        duree : '2s',
        logement : 'bungalow',
        pack : 'free'
    }
    ,
    {
        montant : 350,
        saison : 'hauteSaison',
        duree : '1s',
        logement : 'chambre',
        pack : 'free'
    }, 
    {
        montant : 245,
        saison : 'basseSaison',
        duree : '1s',
        logement : 'chambre',
        pack : 'free'
    },
    {
        montant : 595,
        saison : 'hauteSaison',
        duree : '2s',
        logement : 'chambre',
        pack : 'free'
    }, 
    {
        montant : 400,
        saison : 'basseSaison',
        duree : '2s',
        logement : 'chambre',
        pack : 'free'
    },
    {
        montant : 140,
        saison : 'hauteSaison',
        duree : '1s',
        logement : 'lit',
        pack : 'free'
    }, 
    {
        montant : 100,
        saison : 'basseSaison',
        duree : '1s',
        logement : 'lit',
        pack : 'free'
    },
    {
        montant : 240,
        saison : 'hauteSaison',
        duree : '2s',
        logement : 'lit',
        pack : 'free'
    }, 
    {
        montant : 160,
        saison : 'basseSaison',
        duree : '2s',
        logement : 'lit',
        pack : 'free'
    }
) ;

/*var sousTab  = prixPack3.filter(word => word.montant=302);
console.log("ok"+sousTab+"ok");*/