function getDocumentsWithClient_Auto(){
    return [
        {
            code: "carte_grise",
            files: [
                { index: "xx", name: "Carte Grise" }
            ]
        },
        {
            code: "cin_passeport",
            files: [
                { index: "xx", name: "CNI / Passeport" }
            ]
        },
        {
            code: "releve_information",
            files: [
                { index: "xx", name: "Relevé <br> d'information" }
            ]
        },
        {
            code: "permis",
            files: [
                { index: "xx", name: "Permis <br> de conduire" }
            ]
        },
    ]
}

function getDocumentsWithoutClient_Auto(){
    return [
        {
            code: "disposition_particuliere",
            files: [
                { index: "xx", name: "Dispositions particulières" }
            ]
        },
        {
            code: "echeancier",
            files: [
                { index: "xx", name: "Échéancier" }
            ]
        },
        {
            code: "avenants",
            files: [
                { index: "xx", name: "Avenants" }
            ]
        },
    ]
}

function getDocumentsWithClient_Mrh(){
    return [
        {
            code: "cin_passeport_permis",
            files: [
                { index: "xx", name: "CNI / Passeport <br> Permis de conduire" },
                { index: "xx", name: "CNI / Passeport <br> Permis de conduire" }
            ]
        },
    ]
}

function getDocumentsWithoutClient_Mrh(){
    return [
        {
            code: "disposition_particuliere",
            files: [
                { index: "xx", name: "Dispositions <br> particulières" }
            ]
        },
        {
            code: "echeancier",
            files: [
                { index: "xx", name: "Échéancier" }
            ]
        },
        {
            code: "avenants",
            files: [
                { index: "xx", name: "Avenants" }
            ]
        },
    ]
}

function getDocumentsWithoutClient_Borrower(){
    return [
        {
            code: "disposition_particuliere",
            files: [
                { index: "xx", name: "Dispositions <br> particulières" }
            ]
        },
        {
            code: "avenants",
            files: [
                { index: "xx", name: "Avenants" }
            ]
        },
    ]
}

export {
    getDocumentsWithClient_Auto,
    getDocumentsWithoutClient_Auto,
    getDocumentsWithClient_Mrh,
    getDocumentsWithoutClient_Mrh,
    getDocumentsWithoutClient_Borrower,
}
