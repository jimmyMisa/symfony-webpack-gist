function isContractTelcoEnergie(contra_nom){
    var TELCO_ENERGIE = [
        "contract-energy",
        "contract-energy-electricite",
        "contract-energy-gaz",
        "contract-box",
        "contract-mobile",
        "v2contract-new-box",
        "v2contract-new-mobile",
    ];
    if(contra_nom && (0 <= TELCO_ENERGIE.indexOf(contra_nom))){
        return true;
    }

    return false;
}

function isEnergieGazElec(contra_nom){
    var ENERGIE = [
        "contract-energy",
        "contract-energy-electricite",
        "contract-energy-gaz",
    ];
    if(contra_nom && (0 <= ENERGIE.indexOf(contra_nom))){
        return true;
    }

    return false;
}

function isTelcoBoxMobile(contra_nom){
    var TELCO = [
        "contract-box",
        "contract-mobile",
        "v2contract-new-box",
        "v2contract-new-mobile",
    ];
    if(contra_nom && (0 <= TELCO.indexOf(contra_nom))){
        return true;
    }

    return false;
}

export {
    isEnergieGazElec,
    isTelcoBoxMobile,
    isContractTelcoEnergie,
}