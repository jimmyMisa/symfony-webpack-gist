import { rechercheContratPdl, getConsommationAnnuelle, saveConsentementEnedis } from 'api/sge_tiers/sge-tiers-api';

function isValiderNumeroDisabled(params){
    return function(){
        return !getValueInput("numero-pdl");
    }
}

function toggleValiderNumeroPdl(params){
    var {configValider} = params;
    
    return function(value){
        configValider().disabled = !value;
    }
}

function resetConsentementEnedis(params){
    var {configNumero, configValider} = params;

    return function(){
        saveConsentementEnedis('valider-numero-pdl', false);
        updateValuePDL(params)(configNumero(), '')
        updateValuePDL(params)(configValider(), undefined, undefined, undefined, false)
        window.updateJsxAll();
    }
}

function updateValuePDL(params){
    return function(config, value, valid, choose, checked){
        if(value !== undefined){
            config.value = value;
        }

        if(checked !== undefined){
            config.checked = checked;

            if(!checked){
                choose = false;
            }
            else {
                choose = true;
            }
        }

        config.valid = valid;

        var func = choose ? window.globalProgress.choose : window.globalProgress.unchoose;
        func(config.defintion, config.line, config.response);
        
        window.updateValueGlobal(null, choose, config, choose ? config.value : '');
    }
}

function toggleConsommationLoading(params){
    var {configLoading} = params;

    return function(value, text){
        var erreurText = "Nous sommes désolés, nous n'avons pas réussi à joindre Enedis. Sélectionnez une autre option";
        var loadingText = "Chargement de vos données de consommation annuelle";

        var config = configLoading();
        config.value = null;

        if(value == "loading"){
            config.value = value;
            config.content = loadingText;
        }
        else if(value == "error"){
            config.value = value;
            config.content = text ?? erreurText;
        }
    }
}

function searchPDL(params) {
    var {configNumero, configValider} = params;

    return function(value){
        if(!value){
            saveConsentementEnedis('valider-numero-pdl', false, () => {
                updateValuePDL(params)(configNumero(), '')
                updateValuePDL(params)(configValider(), undefined, undefined, undefined, false)
                window.updateJsxAll();
            })
        }
        else {
            var config = configNumero();
            var enabled = (config && config.value) ? true : false;

            toggleValiderNumeroPdl(params)(enabled);
            window.updateJsxAll();

            rechercheContratPdl((result) => {
                if(result && (result.status == 200)){
                    var config = configNumero();

                    if(config && !config.value){
                        updateValuePDL(params)(config, result.PDL, true, true)
                        toggleValiderNumeroPdl(params)(result.PDL)
                        window.updateJsxAll()
                    }
                }
            });
        }
    }
}

function consommationAnnuelle(params){ 
    var {configNumero, configValider, configEffacer, configConsommationTotal, configConsommationHP, configConsommationHC} = params;
    return function(value){
        if(!value){
            saveConsentementEnedis('valider-numero-pdl', false)
            
            updateValuePDL(params)(configNumero(), '')
            updateValuePDL(params)(configValider(), undefined, undefined, undefined, false)

            updateValuePDL(params)(configConsommationTotal(), '')
            updateValuePDL(params)(configConsommationHP(), '')
            updateValuePDL(params)(configConsommationHC(), '')

            toggleValiderNumeroPdl(params)(null)
            toggleConsommationLoading(params)('loading')

            configEffacer().checked = false;
            window.updateJsxAll();
        }
        else {
            toggleConsommationLoading(params)('loading')
            window.updateJsxAll();

            saveConsentementEnedis('valider-numero-pdl', true, () => {
                var PDL = configNumero().value;

                getConsommationAnnuelle(PDL, (result) => {
                    if(result && (result.status == 200)){
                        updateValuePDL(params)(configConsommationTotal(), (result.HP + result.HC).toLocaleString(), true, true)
                        updateValuePDL(params)(configConsommationHP(), result.HP.toLocaleString(), true, true)
                        updateValuePDL(params)(configConsommationHC(), result.HC.toLocaleString(), true, true)

                        toggleConsommationLoading(params)(null)
                        window.updateJsxAll();
                    }
                    else {
                        var error = result ? result.message : null;

                        toggleConsommationLoading(params)('error', error)
                        window.updateJsxAll();
                    }
                });
            })
        }
    }
}

export {
    searchPDL,
    updateValuePDL,
    consommationAnnuelle,
    toggleValiderNumeroPdl,
    isValiderNumeroDisabled,
    resetConsentementEnedis,
    toggleConsommationLoading,
}
