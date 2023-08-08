import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import frLocale from '@fullcalendar/core/locales/fr';

import flatpickr from "flatpickr";
import { French } from "flatpickr/dist/l10n/fr.js";
import "flatpickr/dist/flatpickr.min.css";

import moment from "moment";

//Deprecated : a lot of files are using it, beware to not remove this directly
if(!window.Dropzone){
    window.Dropzone = require('dropzone/dist/min/dropzone.min');
    window.Dropzone.autoDiscover = false;
}

window.jsx = {};

function registerJsx(instance, code){
	setTimeout(() =>{
		code = code ? code : (new Date()).valueOf();
		if(!instance.jsxRegistered){
			instance.jsxRegistered = true;
			window.jsx[code] = instance;
		}
	},5)
}

function updateJsxAll(instance){
    Object.keys(window.jsx).forEach(function(key){
        if(instance != window.jsx[key]){
			window.jsx[key].update()
		}
    });
}

function getJsxInstance(code){
    if(window.jsx[code]){
        return window.jsx[code];
    }
}

function getMoment(){
    moment.locale('fr-ca');
    return moment;
}

function getDropzone(){
    return Dropzone;
}

function getFlatpickr(){
    flatpickr.localize(French);
    return flatpickr;
}

function getFullCalendar(){
    return {
        Calendar: Calendar,
        frLocale: frLocale, 
        plugins: [
            dayGridPlugin, 
            interactionPlugin, 
            timeGridPlugin, 
            listPlugin
        ],
    }
}

function handleModalScrolling(){
    $(document).on('hidden.bs.modal', '.modal', () => {
        setTimeout(() => {
            if($('.modal:visible').length){
                $('body').toggleClass('modal-open', true);
            }
        }, 500);
    })
}

export {
    registerJsx,
    updateJsxAll,
    getJsxInstance,
    getMoment,
    getDropzone,
    getFullCalendar,
    getFlatpickr,
    handleModalScrolling,
}