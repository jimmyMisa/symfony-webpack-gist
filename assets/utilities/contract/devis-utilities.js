import { getContractGroup } from "./contract-utilities.js";

function getDocumentsSignables(){
    return [
        {
            code: "devis_assurance",
            title: "Sélectionner le Devis d'assurance",
            required: true,
        },
        {
            code: "devis_conseil",
            title: "Sélectionner le Devoir de conseil",
            required: true,
        },
        {
            code: "mandat_resiliation",
            title: "Sélectionner le Mandat de résiliation",
            required: false,
        },
    ];
}

function getDocumentsTelcoEnergies(){
    return [
        {
            code: "devis_telco_energie",
            title: "Sélectionner le Devis telco énergie",
        },
    ];
}

function getDocumentsNonSignables(){
    return [
        {
            code: "generales",
            title: "Sélectionner les dispositions générales",
            required: true,
        },
        {
            code: "fiche_produit",
            title: "Sélectionner la fiche produit",
            required: true,
        },
    ];
}

function getStaticCleDocuments(){
    return [
        "devis_assurance",
        "devis_conseil",
        "mandat_resiliation",

        "generales",
        "fiche_produit",
    ];
}

function getStaticCleDocumentsTelcoEnergies(){
    return [
        "devis_telco_energie",
    ];
}

function getDocumentGroup(cle_document){
    return {
        devis_assurance: 'signables',
        devis_conseil: 'signables',
        mandat_resiliation: 'signables',

        generales: 'non_signables',
        fiche_produit: 'non_signables',
    }[cle_document];
}

function getDevisDocuments(){
    return [
        ...getDocumentsSignables(),
        ...getDocumentsNonSignables()
    ];
}

function getDevisDocumentsGroup(){
    return {
        signables: getDocumentsSignables(),
        non_signables: getDocumentsNonSignables(),
    }
}

function getAttestionCode(contrat_nom, key){
    var CODES = {
        'housing': {
            typeFile: "habitation-attestations-gestionnaire",
            cleDocument: "document-habitation-attestations-gestionnaire",
        },
        'borrower': {
            typeFile: "emprunteur-attestations-gestionnaire",
            cleDocument: "document-emprunteur-attestations-gestionnaire",
        },
        'auto': {
            typeFile: "auto-attestations-gestionnaire",
            cleDocument: "document-auto-attestations-gestionnaire",
        },
        'energy': {
            typeFile: "telecharger-devis-energie-gestionnaire",
            cleDocument: "document-telecharger-devis-energie-gestionnaire",
        },
    }

    var group = getContractGroup(contrat_nom);

    if(CODES[group]){
        if(key && CODES[group][key]){
            return CODES[group][key];
        }
        return CODES[group];
    }

    return {};
}

function nameToCode(name, custom_type){
    if(name){
        if(name.length > 30){
            name = name.substring(30);
        }

        var code = name;
        code = code.toLowerCase();
        code = code.replace(/[^a-z0-9]+/gi, "_");

        if(custom_type == "signables_custom"){
            code = "signable_" + code;
        }
        else if(custom_type == "non_signables_custom"){
            code = "non_signable_" + code;
        }

        return code;
    }

    return '';
}

export {
    nameToCode,
    getDevisDocuments,
    getDevisDocumentsGroup,
    getDocumentGroup,
    getDocumentsSignables,
    getDocumentsNonSignables,
    getAttestionCode,
    getStaticCleDocuments,
    getDocumentsTelcoEnergies,
    getStaticCleDocumentsTelcoEnergies,
}
