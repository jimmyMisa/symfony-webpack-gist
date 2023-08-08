function getDisplayName(contract){
    var names = {
        "contract-auto-insurance": "Assurance Auto",
        "assurance-2roues": "Assurance 2 roues",
        "contract-housing": "Résidence Principale",
        "contract-housing-secondaire": "Résidence Secondaire",
        "contract-housing-locative": "Résidence Locative",
        "contract-energy": "Énergie",
        "contract-mobile": "Mobile",
        "contract-box": "Abonnement Box",
        "contract-borrower": "Emprunteur",
        "v2contract-new-borrower": "Emprunteur",
        "v2contract-new-mobile": "Mobile",
        "v2contract-new-box": "Abonnement Box",
        "contract-energy-electricite": "Énergie",
        "contract-energy-gaz": "Énergie",
    };
    return contract ? names[contract.nom] : null;
}

function getDisplayNameFull(contract){
    var names = {
        "contract-auto-insurance": "Automobile",
        "assurance-2roues": "Assurance 2 roues",
        "contract-housing": "Résidence Principale",
        "contract-housing-secondaire": "Résidence Secondaire",
        "contract-housing-locative": "Résidence Locative",
        "contract-energy": "Abonnemment Energie",
        "contract-mobile": "Abonnemment Mobile",
        "contract-box": "Abonnemment Box",
        "contract-borrower": "Assurance Emprunteur",
        "v2contract-new-borrower": "Assurance Emprunteur",
        "v2contract-new-mobile": "Abonnemment Mobile",
        "v2contract-new-box": "Abonnemment Box",
        "contract-energy-electricite": "Abonnemment Energie",
        "contract-energy-gaz": "Abonnemment Energie",
    };
    return contract ? names[contract.nom] : null;
}

function getBoxRubrics(){
    return {
        title: 'Mon contrat <strong>box</strong>',
        indexes : [0, 1, 2],
        rubrics: [
            {
                title: 'Information <strong>box</strong>',
                icon_default: '/assets/img/_picto/contract/box.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/box.svg',
            },
            {
                title: 'Caractéristiques <strong>contrat actuel</strong>',
                icon_default: '/assets/img/_picto/contract/caracteristique2.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/caracteristique.svg',
            },
            {
                title: 'Vos besoins et <strong>priorités</strong>',
                icon_default: '/assets/img/_picto/contract/besoin.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/besoin.svg',
            }
        ]
    }
}

function getMobileRubrics(){
    return {
        title: 'Mon contrat <strong>mobile</strong>',
        indexes : [0, 1, 2, 3],
        rubrics: [
            {
                title: 'Information <strong>mobile</strong>',
                icon_default: '/assets/img/_picto/contract/mobile2.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/mobile.svg',
            },
            {
                title: 'Usage <strong>mobile</strong>',
                icon_default: '/assets/img/_picto/contract/description.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/description.svg',
            },
            {
                title: 'Caractéristiques <strong>forfait actuel</strong>',
                icon_default: '/assets/img/_picto/contract/caracteristique2.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/caracteristique.svg',
            },
            {
                title: 'Vos besoins et <strong>priorités</strong>',
                icon_default: '/assets/img/_picto/contract/besoin.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/besoin.svg',
            }
        ]
    }
}

function getEnergyRubrics(){
    return {
        title: 'Mon contrat <strong>énergie</strong>',
        indexes : [0, 1, 2, 3, 4, 5],
        rubrics: [
            {
                title: 'Energie du logement <strong>et documents</strong>',
                icon_default: '/assets/img/_picto/contract/flash2.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/energie1.svg',
            },
            {
                title: "Ma consommation <strong>d'électricité</strong>",
                icon_default: '/assets/img/_picto/contract/description.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/description.svg',
            },
            {
                title: 'Ma consommation <strong>de gaz</strong>',
                icon_default: '/assets/img/_picto/contract/gaz2.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/energie3.svg',
            },
            {
                title: 'Estimation de <strong>votre consommation</strong>',
                icon_default: '/assets/img/_picto/contract/description.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/description.svg',
            },
            {
                title: 'Caractéristiques <strong>contrat actuel</strong>',
                icon_default: '/assets/img/_picto/contract/caracteristique2.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/caracteristique.svg',
            },
            {
                title: 'Vos besoins et <strong>priorités</strong>',
                icon_default: '/assets/img/_picto/contract/besoin.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/besoin.svg',
            }
        ]
    }
}

function getBorrowerRubrics(){
    return {
        title: 'Mon contrat <strong>emprunteur</strong>',
        indexes : [0, 1, 2, 3],
        rubrics: [
            {
                title: "Bien concerné et <strong>type d'analyse",
                icon_default: '/assets/img/_picto/contract/emprunteur/emprunteur1.svg',
                icon_completed: '/assets/img/_picto/contract/emprunteur/emprunteur1-check.svg',
            },
            {
                title: 'Description du <strong>prêt</strong>',
                icon_default: '/assets/img/_picto/contract/description.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/description.svg',
            },
            {
                title: 'Caractéristiques <strong>contrat actuel</strong>',
                icon_default: '/assets/img/_picto/contract/caracteristique2.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/caracteristique.svg',
            },
            {
                title: 'Vos besoins et <strong>priorités</strong>',
                icon_default: '/assets/img/_picto/contract/besoin.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/besoin.svg',
            }
        ]
    }
}

function getAutoRubrics(){
    return {
        title: 'Mon contrat <strong>véhicule</strong>',
        indexes : [0, 1, 2, 3, 4, 5, 6, 7],
        rubrics: [
            {
                title: 'Mode de transmission <strong>des données</strong>',
                icon_default: '/assets/img/_picto/contract/type_besoin.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/type_besoin.svg',
            },
            {
                title: 'Description <strong>du véhicule</strong>',
                icon_default: '/assets/img/_picto/contract/description.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/auto2.svg',
            },
            {
                title: 'Usage <strong>du véhicule</strong>',
                icon_default: '/assets/img/_picto/contract/usage.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/auto3.svg',
            },
            {
                title: '<strong>Conducteurs</strong>',
                icon_default: '/assets/img/_picto/contract/personnage2.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/auto4.svg',
            },
            {
                title: 'Conducteur principal',
                icon_default: null,
                icon_completed: null,
            },
            {
                title: 'Conducteur secondaire',
                icon_default: null,
                icon_completed: null,
            },
            {
                title: 'Caractéristiques <strong>contrat actuel</strong>',
                icon_default: '/assets/img/_picto/contract/caracteristique2.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/auto5.svg',
            },
            {
                title: 'Vos besoins et <strong>priorités</strong>',
                icon_default: '/assets/img/_picto/contract/besoin_nouveau_contrat.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/auto6.svg',
            }
        ]
    }
}

function getHousingPSRubrics(){
    return {
        title: 'Mon contrat <strong>habitation</strong>',
        indexes : [0, 1, 2, 3, 4],
        rubrics: [
            {
                title: 'Mode de transmission <strong>des données</strong>',
                icon_default: '/assets/img/_picto/contract/besoin-habitation.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/mrh1.svg',
            },
            {
                title: 'Description <strong>du bien</strong>',
                icon_default: '/assets/img/_picto/contract/description.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/mrh2.svg',
            },
            {
                title: 'Caractéristiques <strong>contrat actuel</strong>',
                icon_default: '/assets/img/_picto/contract/caracteristique2.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/mrh3.svg',
            },
            {
                title: 'Vos besoins et <strong>priorités</strong>',
                icon_default: '/assets/img/_picto/contract/besoin_nouveau_contrat.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/mrh4.svg',
            },
            {
                title: 'Personnalisation <strong>des options</strong>',
                icon_default: '/assets/img/_picto/contract/cogs.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/mrh5.svg',
            }
        ]
    }
}

function getHousingLRubrics(){
    return {
        title: 'Mon contrat <strong>habitation</strong>',
        indexes : [0, 1, 2, 3],
        rubrics: [
            {
                title: 'Mode de transmission <strong>des données</strong>',
                icon_default: '/assets/img/_picto/contract/besoin-habitation.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/mrh1.svg',
            },
            {
                title: 'Description <strong>du bien</strong>',
                icon_default: '/assets/img/_picto/contract/description.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/mrh2.svg',
            },
            {
                title: 'Caractéristiques <strong>contrat actuel</strong>',
                icon_default: '/assets/img/_picto/contract/caracteristique2.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/mrh3.svg',
            },
            {
                title: 'Vos besoins et <strong>priorités</strong>',
                icon_default: '/assets/img/_picto/contract/besoin_nouveau_contrat.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/mrh4.svg',
            }
        ]
    }
}

function getV2BorrowerRubrics() {
    return {
        title: 'Mon contrat <strong>emprunteur</strong>',
        indexes : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        rubrics: [
            {
                title: "Bien concerné et <strong>type d'analyse",
                icon_default: '/assets/img/_picto/contract/emprunteur/emprunteur1.svg',
                icon_completed: '/assets/img/_picto/contract/emprunteur/emprunteur1-check.svg',
            },
            {
                title: 'Prêts immobiliers',
                icon_default: '/assets/img/_picto/contract/description.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/description.svg',
            },
            {
                title: 'Description du prêt 1',
                icon_default: null,
                icon_completed: null,
            },
            {
                title: 'Description du prêt 2',
                icon_default: null,
                icon_completed: null,
            },
            {
                title: 'Description du prêt 3',
                icon_default: null,
                icon_completed: null,
            },
            {
                title: 'Description du prêt 4',
                icon_default: null,
                icon_completed: null,
            },
            {
                title: 'Mes informations',
                icon_default: '/assets/img/_picto/contract/caracteristique2.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/caracteristique.svg',
            },
            {
                title: 'Mon co-emprunteur',
                icon_default: '/assets/img/_picto/contract/besoin.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/besoin.svg',
            },
            {
                title: 'Caractéristiques <strong>contrat actuel</strong>',
                icon_default: '/assets/img/_picto/contract/caracteristique2.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/caracteristique.svg',
            },
            {
                title: 'Vos besoins et <strong>priorités</strong>',
                icon_default: '/assets/img/_picto/contract/besoin.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/besoin.svg',
            }
        ]
    }
}

function getEnergyElectriciteRubrics(){
    return {
        title: 'Mon contrat <strong>énergie électricité</strong>',
        indexes : [0, 1, 2, 3, 4],
        rubrics: [
            {
                title: 'Energie du logement <strong>et documents</strong>',
                icon_default: '/assets/img/_picto/contract/flash2.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/energie1.svg',
            },
            {
                title: "Ma consommation <strong>d'électricité</strong>",
                icon_default: '/assets/img/_picto/contract/description.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/description.svg',
            },
            {
                title: 'Estimation de <strong>votre consommation</strong>',
                icon_default: '/assets/img/_picto/contract/description.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/description.svg',
            },
            {
                title: 'Caractéristiques <strong>contrat actuel</strong>',
                icon_default: '/assets/img/_picto/contract/caracteristique2.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/caracteristique.svg',
            },
            {
                title: 'Vos besoins et <strong>priorités</strong>',
                icon_default: '/assets/img/_picto/contract/besoin.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/besoin.svg',
            }
        ]
    }
}

function getEnergyGazRubrics(){
    return {
        title: 'Mon contrat <strong>énergie gaz</strong>',
        indexes : [0, 1, 2, 3, 4],
        rubrics: [
            {
                title: 'Energie du logement <strong>et documents</strong>',
                icon_default: '/assets/img/_picto/contract/flash2.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/energie1.svg',
            },
            {
                title: 'Ma consommation <strong>de gaz</strong>',
                icon_default: '/assets/img/_picto/contract/gaz2.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/energie3.svg',
            },
            {
                title: 'Estimation de <strong>votre consommation</strong>',
                icon_default: '/assets/img/_picto/contract/description.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/description.svg',
            },
            {
                title: 'Caractéristiques <strong>contrat actuel</strong>',
                icon_default: '/assets/img/_picto/contract/caracteristique2.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/caracteristique.svg',
            },
            {
                title: 'Vos besoins et <strong>priorités</strong>',
                icon_default: '/assets/img/_picto/contract/besoin.svg',
                icon_completed: '/assets/img/_picto/contract/bleu_clair/besoin.svg',
            }
        ]
    }
}

function getPathBlueIconsOfContrat(contract){
    var names = {
        "contract-auto-insurance": "/images/icons/icon_auto.webp",
        "assurance-2roues": "/images/icons/icon_2_roues.webp",
        "contract-housing": "/images/icons/icon_habitation.webp",
        "contract-housing-secondaire": "/images/icons/icon_habitation.webp",
        "contract-housing-locative": "/images/icons/icon_habitation.webp",
        "contract-energy": "/images/icons/icon_elec_gaz.webp",
        "contract-mobile": "/images/icons/icon_mobile.webp",
        "contract-box": "/images/icons/icon_box.webp",
        "contract-borrower": "/images/icons/icon_borrower.webp",
        "v2contract-new-borrower": "/images/icons/icon_borrower.webp",
        "v2contract-new-mobile": "/images/icons/icon_mobile.webp",
        "v2contract-new-box": "/images/icons/icon_box.webp",
        "contract-energy-electricite": "/images/icons/icon_elec.webp",
        "contract-energy-gaz": "/images/icons/icon_gaz.webp",
    };
    return contract ? names[contract.nom] : null;
}

function getContractRubrics(contract){
    if(contract.nom == 'contract-box' || contract.nom == 'v2contract-new-box'){
        return getBoxRubrics();
    }
    else if(contract.nom == 'contract-mobile' || contract.nom == 'v2contract-new-mobile'){
        return getMobileRubrics();
    }
    else if(contract.nom == 'contract-energy'){
        return getEnergyRubrics();
    }
    else if(contract.nom == 'contract-borrower'){
        return getBorrowerRubrics();
    }
    else if(contract.nom == 'contract-auto-insurance'){
        return getAutoRubrics();
    }
    else if(contract.nom == 'contract-housing'){
        return getHousingPSRubrics();
    }
    else if(contract.nom == 'contract-housing-secondaire'){
        return getHousingPSRubrics();
    }
    else if(contract.nom == 'contract-housing-locative'){
        return getHousingLRubrics();
    }
    else if(contract.nom == 'v2contract-new-borrower'){
        return getV2BorrowerRubrics();
    }
    else if(contract.nom == 'contract-energy-electricite'){
        return getEnergyElectriciteRubrics();
    }
    else if(contract.nom == 'contract-energy-gaz'){
        return getEnergyGazRubrics();
    }
    else {
        return null
    }
}

export {
    getDisplayName,
    getDisplayNameFull,
    getContractRubrics,
    getPathBlueIconsOfContrat,
}
