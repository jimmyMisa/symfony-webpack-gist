function getPropositionFiles(){
    return [
        {
            code: "devis_assurance",
            title: "Sélectionner le Devis d'assurance",
            required: true,
        },
        {
            code: "devis_conseil",
            title: "Sélectionner le Devis de conseil",
            required: true,
        },
        {
            code: "mandat_sepa",
            title: "Sélectionner le Mandat de prélèvement SEPA",
            required: false,
        },
        {
            code: "mandat_resiliation",
            title: "Sélectionner le Mandat de résiliation",
            required: false,
        },
        {
            code: "mandat_hamon",
            title: "Sélectionner le Mandat Hamon",
            required: false,
        },
        {
            code: "cg",
            title: "Sélectionner les Conditions générales",
            required: true,
        },
        {
            code: "info_produit",
            title: "Sélectionner le document d'information",
            required: true,
        },
        {
            code: "notice_info",
            title: "Sélectionner la notice d'information",
            required: true,
        }
    ]
}

export {
    getPropositionFiles,
}
