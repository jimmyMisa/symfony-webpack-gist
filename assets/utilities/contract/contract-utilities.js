function getContractName(contra_nom){
    const NAME = {
        "contract-housing": "Contrat Assurance Habitation",
        "contract-housing-secondaire": "Contrat Assurance Habitation",
        "contract-housing-locative": "Contrat Assurance Habitation",
        "contract-borrower": "Contrat Assurance Emprunteur",
        "v2contract-new-borrower": "Contrat Assurance Emprunteur",
        "assurance-2roues": "Contrat Assurance 2 roues",
        "contract-auto-insurance": "Contrat Assurance Véhicule",
        "contract-energy": "Contrat Énergie",
        "contract-box": "Contrat Box",
        "contract-mobile": "Contrat Mobile",
        "v2contract-new-box": "Contrat Box",
        "v2contract-new-mobile": "Contrat Mobile",
        "contract-energy-electricite": "Contrat Énergie",
        "contract-energy-gaz": "Contrat Énergie",
    };

    return NAME[contra_nom];
}

function getContractType(contra_nom){
    const TYPE = {
        "contract-housing": "assurance",
        "contract-housing-secondaire": "assurance",
        "contract-housing-locative": "assurance",
        "contract-borrower": "assurance",
        "v2contract-new-borrower": "assurance",
        "assurance-2roues": "assurance",
        "contract-auto-insurance": "assurance",
        "contract-energy": "énergie",
        "contract-box": "box & mobile",
        "contract-mobile": "box & mobile",
        "v2contract-new-box": "box & mobile",
        "v2contract-new-mobile": "box & mobile",
        "contract-energy-electricite": "énergie",
        "contract-energy-gaz": "énergie",
    };

    return TYPE[contra_nom];
}

function getContractTypeTask(contra_nom){
    const TYPE = {
        "contract-housing": "Assurance Habitation",
        "contract-housing-secondaire": "Assurance Habitation Sécondaire",
        "contract-housing-locative": "Assurance Habitation Locative",
        "contract-borrower": "Assurance Emprunteur",
        "v2contract-new-borrower": "Assurance Emprunteur",
        "assurance-2roues": "Assurance Deux Roues",
        "contract-auto-insurance": "Assurance Auto",
        "contract-box": "Abonnement Box",
        "contract-mobile": "Abonnement Mobile",
        "v2contract-new-box": "Abonnement Box",
        "v2contract-new-mobile": "Abonnement Mobile",
        "contract-energy": "Abonnement Energie",
        "contract-energy-gaz": "Abonnement Gaz",
        "contract-energy-electricite": "Abonnement Electricité",
    };

    return TYPE[contra_nom];
}

function typeMesRendezVous(contra_nom){
    const TYPE = {
        "contract-housing": "Assurance Habitation",
        "contract-housing-secondaire": "Assurance Habitation",
        "contract-housing-locative": "Assurance Habitation",
        "contract-borrower": "Assurance Emprunteur",
        "v2contract-new-borrower": "Assurance Emprunteur",
        "assurance-2roues": "Assurance Deux Roues",
        "contract-auto-insurance": "Assurance Auto",
        "contract-box": "Abonnement Box",
        "contract-mobile": "Abonnement Mobile",
        "v2contract-new-box": "Abonnement Box",
        "v2contract-new-mobile": "Abonnement Mobile",
        "contract-energy": "Abonnement Energie",
        "contract-energy-gaz": "Abonnement Gaz",
        "contract-energy-electricite": "Abonnement Electricité",
    };

    return TYPE[contra_nom];
}

function getContractCode(contra_nom){
    const CODE = {
        "contract-housing": "assurance",
        "contract-housing-secondaire": "assurance",
        "contract-housing-locative": "assurance",
        "contract-borrower": "assurance",
        "v2contract-new-borrower": "assurance",
        "assurance-2roues": "assurance",
        "contract-auto-insurance": "assurance",
        "contract-energy": "energie",
        "contract-box": "telco",
        "contract-mobile": "telco",
        "v2contract-new-box": "telco",
        "v2contract-new-mobile": "telco",
        "contract-energy-electricite": "energie",
        "contract-energy-gaz": "energie",
    };

    return CODE[contra_nom];
}

function getCRMContractTab(contra_nom){
    var result = "all-tab"
    const CODE = {
        "contract-housing": "assurance-tab",
        "contract-housing-secondaire": "assurance-tab",
        "contract-housing-locative": "assurance-tab",
        "contract-borrower": "assurance-tab",
        "v2contract-new-borrower": "assurance-tab",
        "assurance-2roues": "assurance-tab",
        "contract-auto-insurance": "assurance-tab",
        "contract-box": "abonnement-box-mobile-tab",
        "contract-mobile": "abonnement-box-mobile-tab",
        "v2contract-new-box": "abonnement-box-mobile-tab",
        "v2contract-new-mobile": "abonnement-box-mobile-tab",
        "contract-energy": "abonnement-energie-tab",
        "contract-energy-electricite": "abonnement-energie-tab",
        "contract-energy-gaz": "abonnement-energie-tab",
    };

    if (CODE[contra_nom]) {
        result = CODE[contra_nom]
    }

    return result;
}

function getContractGroup(contra_nom){
    const CODE = {
        "contract-housing": "housing",
        "contract-housing-secondaire": "housing",
        "contract-housing-locative": "housing",
        "contract-borrower": "borrower",
        "v2contract-new-borrower": "borrower",
        "assurance-2roues": "auto",
        "contract-auto-insurance": "auto",
        "contract-energy": "energy",
        "contract-box": "box",
        "contract-mobile": "mobile",
        "v2contract-new-box": "box",
        "v2contract-new-mobile": "mobile",
        "contract-energy-electricite": "energy",
        "contract-energy-gaz": "energy",
    };

    return CODE[contra_nom];
}

function is2Roues(contra_nom){
    if(contra_nom == "assurance-2roues"){
        return true;
    }
    return false;
}

function getContractBaseUrl(contra_nom){
    const URL = {
        "contract-housing": window.url_contrat_mrh,
        "contract-housing-secondaire": window.url_contrat_mrh,
        "contract-housing-locative": window.url_contrat_mrh,
        "contract-borrower": window.url_contrat_borrower ,
        "v2contract-new-borrower": window.url_v2_contrat_borrower ,
        "contract-auto-insurance": window.url_contrat_auto,
        "assurance-2roues": "auto",
        "contract-energy": window.url_contrat_energy,
        "contract-energy-gaz": window.url_contrat_energy_gaz,
        "contract-energy-electricite": window.url_contrat_energy_electricite,
        "contract-box": window.url_contrat_box,
        "contract-mobile": window.url_contrat_mobile,
        "v2contract-new-box": window.url_v2_contrat_box,
        "v2contract-new-mobile": window.url_v2_contrat_mobile,
    };

    return URL[contra_nom];
}

function getContractUrl(contrat){
    var url = getContractBaseUrl(contrat.nom);

    url = url.replace('contrat_id', contrat.id);
    url = url.replace('contrat_nom', contrat.nom);
    url = url.replace('contrat_type', contrat.contrat_home_nom);

    return url;
}

function isContractMrhAuto(contra_nom){
    const MRH_AUTO = [
        "contract-housing",
        "contract-housing-secondaire",
        "contract-housing-locative",
        "contract-auto-insurance"
    ];
       
    if(contra_nom && (0 <= MRH_AUTO.indexOf(contra_nom))){
        return true;
    }

    return false;
}

function isContractAssurance(contra_nom){
    if(contra_nom){
        return getContractCode(contra_nom) == 'assurance';
    }

    return false;
}

function isRemoveTelcoEnergie(contra_nom){
    if(contra_nom){
        var code = getContractCode(contra_nom);
        return (code == 'telco' || code == 'energie');
    }

    return false;
}

function isContractEnergie(contra_nom){
    var CODE_ENERGIE = [
        "contract-energy",
        "contract-energy-electricite",
        "contract-energy-gaz",
        "contract-box",
        "contract-mobile",
        "v2contract-new-box",
        "v2contract-new-mobile",
    ];
    if(contra_nom && (0 <= CODE_ENERGIE.indexOf(contra_nom))){
        return true;
    }

    return false;
}

function isContractTelcoBalioriser(contra_nom){
    var CODE_TELCO = [
        "contract-box",
        "contract-mobile",
        "v2contract-new-box",
        "v2contract-new-mobile",
    ];
    if(contra_nom && (0 <= CODE_TELCO.indexOf(contra_nom))){
        return true;
    }

    return false;
}

export {
    getContractUrl,
    getContractName,
    getContractType,
    getContractCode,
    getContractGroup,
    getContractTypeTask,
    isContractMrhAuto,
    isContractAssurance,
    isContractEnergie,
    is2Roues,
    getCRMContractTab,
    isRemoveTelcoEnergie,
    typeMesRendezVous,
    isContractTelcoBalioriser,
}
