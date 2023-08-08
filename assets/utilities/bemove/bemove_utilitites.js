import moment from "moment/moment.js"

function formatTime(time){
    if(time.indexOf('entre') > -1){
        return time
            .split('entre ')
            .join('')
            .split(' et ')
            .join('-');
    }
    return time;
}

function toTimestamp(time, date){
    date = date ? date : new Date();

    var h_m = time.split('h');
    return moment({
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDay(),
        hour: h_m[0],
        minute: h_m[1] ? h_m[1] : 0
    }).unix();
} 

function getIntervalDelta(time, date){
    var today = (date == moment(new Date()).format('DD/MM/YYYY'));
    date = today ? new Date() : moment(date, 'DD/MM/YYYY').toDate();

    var min = null
    var max = null

    var limits = time.split('-');
    if (limits[0]) {
        min = toTimestamp(limits[0], date);
    }
    if (limits[1]) {
        max = toTimestamp(limits[1], date);
    }

    var current = moment({
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDay(),
        hour: date.getHours(),
        minute: date.getMinutes(),
    }).unix();


    if(min && current < min){
        return +1;
    }
    else if(max && current > max) {
        return -1;
    }
    else {
        return 0;
    }
}

function handleDates(currentDate){
    if (!currentDate) {
        return false;
    }
    var currentYear = new Date().getFullYear();
    var disabledDates = [
        "01.01."+currentYear, 
        "08.03."+currentYear,
        "01.11."+currentYear,
        "25.12."+currentYear,
        "31.12."+currentYear,
    ];

    var dayNr = currentDate.getDay();

    if (dayNr == 6 || dayNr == 0) {
        return false;
    }

    if(disabledDates.length > 0){
        for (var i=0; i<disabledDates.length; i++) {                        
            if(moment(currentDate).unix() == moment(disabledDates[i],'DD.MM.YYYY').unix()){
                return false;
           }
        }
    }

    return true;
}

function currentDateString(date){
    date = date ? date : new Date();
    switch (new Date().getDay()) {
        case 6:
            date.setDate(date.getDate() + 2);
        break;
        case 0:
            date.setDate(date.getDate() + 1);
        break;
        default:
            date.setDate(date.getDate());
    }
    return moment(date).format('DD/MM/YYYY');
}

function nextDateString(date){
    date = date ? date : new Date();

    switch (new Date().getDay()) {
        case 0:
            date.setDate(date.getDate() + 1);
        break;
        case 5:
            date.setDate(date.getDate() + 3);
        break;
        case 6:
            date.setDate(date.getDate() + 2);
        break;
        default:
            date.setDate(date.getDate() + 1);
    }

    return moment(date).format('DD/MM/YYYY');
}

function getCreneauTelcoEnergie() {
    window.telcoEnergieDateTime = [];
    if(window.creneaux_user_exists) {
        var isDateCreneau = false;
        window.creneaux_user_exists.map((cr) => {
            if (cr.creneau_heure && !isPastDate(cr.creneau_date)) {
                var time = formatTime(cr.creneau_heure);
                var delta = getIntervalDelta( 
                    time,
                    cr.creneau_date
                )
                if(!isDateCreneau && delta >= 0) {
                    isDateCreneau = true;
                    window.telcoEnergieDateTime = [
                        cr.creneau_date,
                        cr.creneau_heure
                    ];
                }
            }
        })
    }
    return window.telcoEnergieDateTime;
}

function isPastDate(dateDMY){
    if(dateDMY){
        var now = new Date();
        var date = moment(dateDMY, 'DD/MM/YYYY').toDate();

        if(now <= date){
            return false;
        }
    }

    return true;
}

function isBoxOrMobileOrEnergy(nom_contrat){

    var name_contrats_not_static_times = [
        'contract-box',
        'contract-mobile',
        'contract-energy',
        "contract-energy-electricite",
        "contract-energy-gaz",
        "v2contract-new-box",
        "v2contract-new-mobile",
    ]

    var result = false ;

    if (
        nom_contrat && 
        name_contrats_not_static_times.indexOf(nom_contrat) != -1
    ) {
        result = true ;
    }
    
    return result ;
}

function isBoxMobile(nom_contrat){

    var name_contrats_not_static_times = [
        'contract-box',
        'contract-mobile',
        "v2contract-new-box",
        "v2contract-new-mobile",
    ]

    var result = false ;

    if (
        nom_contrat && 
        name_contrats_not_static_times.indexOf(nom_contrat) != -1
    ) {
        result = true ;
    }
    
    return result ;
}

function isGazElectriciteEnergy(nom){

    var name_contrats = [
        'contract-energy',
        "contract-energy-electricite",
        "contract-energy-gaz",
    ]

    var result = false ;

    if (
        nom && 
        name_contrats.indexOf(nom) != -1
    ) {
        result = true ;
    }
    
    return result ;
}

function getStaticTimes(){ 
    return {
        9: "9h-11h",
        11: "11h-12h30",
        13: "13h30-15h",
        15: "15h-17h",
    }
}

function formatDate(date){
    return date.getFullYear() + '-' + pad( date.getMonth() + 1 , 2) + '-' + pad( date.getDate() , 2)
}

function parseDate(date){
    var sp = date.split('/')
    var d = new Date()
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    if(sp[0] !== undefined){
        day = sp[0]
    }
    if(sp[1] !== undefined){
        month = sp[1]
    }
    if(sp[2] !== undefined){
        year = sp[2]
    }
    return new Date(year,month - 1,day)
}

function formatingDate(date) {
    return formatDate(parseDate(date))
}

function formatingPhone(phone) {
    return phone.replace(/\./g,'').replace(/,/g,'').replace(/ /g,'')
}

function getTimesByContract(content,then){
    // content = json_encode(content);
    $.ajax({
        method: "POST",
        url: window.v2_api_gestionnaire_test_attribution_get_creneau_dispo_url,
        data : content
    }).always(
        function(result) {
            if(result && result.status && result.status == 200){
                then(result);
            }
            else {
                then({
                    status: 500,
                })
            }
        }
    );
}

export {
    formatTime,
    handleDates,
    isBoxOrMobileOrEnergy,
    getStaticTimes,
    nextDateString,
    getIntervalDelta,
    formatingDate,
    formatingPhone,
    getTimesByContract,
    currentDateString,
    getCreneauTelcoEnergie,
    isGazElectriciteEnergy,
    isBoxMobile,
}
