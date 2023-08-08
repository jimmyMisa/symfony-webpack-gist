function getStaticCleDocuments(){
    return [
        "devis_assurance",
        "devis_conseil",
        "mandat_resiliation",
    ]
}

function getCustomCleDocuments(documents){
    var static_cle = getStaticCleDocuments();

    if(documents){
        return Object.keys(documents).filter((cle_document) => (
            static_cle.indexOf(cle_document) < 0
        ))
    }

    return [];
}

function getDocuments(documents){
    if(!documents){
        documents = {};
    }

    var static_cles = getStaticCleDocuments();

    var static_documents = [
        { cle_document: "devis_assurance", display: "Devis d'assurance"},
        { cle_document: "devis_conseil", display: "Devoir de conseil"},
        { cle_document: "mandat_resiliation", display: "Mandat de résiliation"},
    ];

    var custom_documents = [];

    Object.keys(documents).map((cle_document) => {
        if(static_cles.indexOf(cle_document) < 0){
            custom_documents.push({
                cle_document,
                display: documents[cle_document].parent.nom,
            })
        }
    })

    return [
        ...static_documents,
        ...custom_documents,
    ]
}

function getDisplay(documents){
    var custom_display = {};
    var static_display = {
        devis_assurance: "Devis d'assurance",
        devis_conseil: "Devoir de conseil",
        mandat_resiliation: "Mandat de résiliation",
    }

    var custom_cles = getCustomCleDocuments(documents);

    custom_cles.map((cle_document) => {
        var custom_document = documents[cle_document];
        custom_display[cle_document] = custom_document.parent.nom;
    })

    return {
        ...static_display,
        ...custom_display,
    }
}

function getCustomNextTree(documents){
    var espaces = ["carene", "client", "cachet"];
    var next_tree = staticNextTree_NotHas();

    var has_mandat_resiliation = (
        documents && 
        documents['mandat_resiliation']
    )

    if(has_mandat_resiliation){
        var next_tree = staticNextTree_Has();
    }

    var custom_cles = getCustomCleDocuments(documents);

    custom_cles.map((cle_document) => {
        next_tree['carene'][cle_document] = {}
        next_tree['client'][cle_document] = {}
        next_tree['cachet'][cle_document] = {}
    })

    espaces.map((espace) => {
        var next = 'devis_assurance';
        var nodes = Object.keys(next_tree[espace]).reverse();

        nodes.map((cle_document, index) => {
            next_tree[espace][cle_document] = {
                espace,
                cle_document: next,
            }

            next = cle_document;

            if((index == 0) && (espace == 'carene')){
                next_tree[espace][cle_document].espace = 'client';
                next_tree[espace][cle_document].switch = true;
            }
            else if((index == 0) && (espace == 'client')){
                next_tree[espace][cle_document].espace = 'cachet';
                next_tree[espace][cle_document].switch = true;
            }
            else if((index == 0) && (espace == 'cachet')){
                next_tree[espace][cle_document].finished = true;
                next_tree[espace][cle_document].cle_document = cle_document;
            }
        })
    })

    return next_tree;
}

function staticNextTree_NotHas(){
    return {
        carene: {
            devis_assurance: {
                espace: 'carene',
                cle_document: 'devis_conseil',
            },
            devis_conseil: {
                switch: true,
                espace: 'client',
                cle_document: 'devis_assurance',
            }
        },
        client: {
            devis_assurance: {
                espace: 'client',
                cle_document: 'devis_conseil',
            },
            devis_conseil: {
                switch: true,
                espace: 'cachet',
                cle_document: 'devis_assurance',
            }
        },
        cachet: {
            devis_assurance: {
                espace: 'cachet',
                cle_document: 'devis_conseil',
            },
            devis_conseil: {
                finished: true,
                espace: 'cachet',
                cle_document: 'devis_conseil',
            }
        }
    }
}

function staticNextTree_Has(){
    return {
        carene: {
            devis_assurance: {
                espace: 'carene',
                cle_document: 'devis_conseil',
            },
            devis_conseil: {
                switch: true,
                espace: 'client',
                cle_document: 'devis_assurance',
            }
        },
        client: {
            devis_assurance: {
                espace: 'client',
                cle_document: 'devis_conseil',
            },
            devis_conseil: {
                espace: 'client',
                cle_document: 'mandat_resiliation',
            },
            mandat_resiliation: {
                switch: true,
                espace: 'cachet',
                cle_document: 'mandat_resiliation',
            }
        },
        cachet: {
            devis_assurance: {
                espace: 'cachet',
                cle_document: 'devis_conseil',
            },
            devis_conseil: {
                espace: 'cachet',
                cle_document: 'mandat_resiliation',
            },
            mandat_resiliation: {
                finished: true,
                espace: 'cachet',
                cle_document: 'mandat_resiliation',
            }
        }
    }
}

export {
    getDisplay,
    getDocuments,
    getCustomNextTree,
}
