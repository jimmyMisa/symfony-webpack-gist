var addressJson = {};

function initGoogleMapInput(
	getConfig,
    elementId,
    parentClass=null,
    then
){
    var input = document.getElementById(elementId);
    const google = window.google = window.google ? window.google : {};
    if (!then) {
        then = (input) =>{}
    }

    if (input) {
	    var searchBox = new google.maps.places.Autocomplete(input);
	    searchBox.setComponentRestrictions({
	        country: ["fr"],
	    });
	    searchBox.input = input;
        searchBox.addListener("place_changed", () => {
    		var AddJSon = {};
    		var checkZipcode = false;
		    var ville = "";
		    var zipcode = "";
		    var street_number = "";
            var places = [searchBox.getPlace()];
            if (!places || places.length == 0) {
                return;
            }

            if(places[0] && places[0].address_components){
              for (var i = 0; i < places[0].address_components.length; i++) {
                for (var j = 0; j < places[0].address_components[i].types.length; j++) {
                    if( places[0].address_components[i].types[j] == "postal_code") {
                        checkZipcode = true;
                    }           
                  }
              }
            }
            if (parentClass) {
                $(".lst_i_desc.principal_address").find('.invalid-feedback').removeClass('show');
            }
            if(!checkZipcode) {
                if (parentClass) {
                    $(".lst_i_desc.principal_address").find('.invalid-feedback').text("Votre adresse n'est pas reconnue, pensez à entrer le code postal");
                    $(".lst_i_desc.principal_address").find('.invalid-feedback').addClass('show');
                }
                setAdressJson({})
                return false;
            }
            places.map((place) => {
                if (place.geometry === undefined) {
                    return;
                }

                var address_components = place.address_components;
                for (var i = 0; i < address_components.length; i++) {
                    for (
                        var j = 0;
                        j < address_components[i].types.length;
                        j++
                    ) {
                        if (
                            address_components[i].types[j] ==
                            "postal_code"
                        ) {
                            zipcode = address_components[i].long_name;
                        }
                        if (
                            address_components[i].types[j] ==
                            "street_number"
                        ) {
                            street_number =
                                address_components[i].long_name;
                        }
                    }
                }
                
                //Sélection informations villes
                var locality = getParamMap(address_components, "locality")
                var administrative_area_level_1 = getParamMap(address_components, "administrative_area_level_1")
                var administrative_area_level_2 = getParamMap(address_components, "administrative_area_level_2")
                var country = getParamMap(address_components, "country")
                var route = getParamMap(address_components, "route")
                ville = getVille(
                    place, 
                    locality, 
                    administrative_area_level_1, 
                    administrative_area_level_2
                );

                AddJSon["street_number"] = street_number;
                AddJSon["zipcode"] = zipcode;

                //deprecated
                // AddJSon["city"] = place.name;

                //sélection ville
                AddJSon["v2_map"] = true;
                AddJSon["city"] = ville;
                AddJSon["locality"] = locality;
                AddJSon["administrative_area_level_1"] = administrative_area_level_1;
                AddJSon["administrative_area_level_2"] = administrative_area_level_2;
                AddJSon["country"] = country;
                AddJSon["route"] = route;

                AddJSon["lat"] = place.geometry["location"].lat();
                AddJSon["lng"] = place.geometry["location"].lng();
                AddJSon["formatted_address"] = place.formatted_address;
                AddJSon["is_from_map"] = true;
            });
            setAdressJson(AddJSon)
            if (
                then && 
                elementId && 
                $("#"+elementId+"").length
            ) {
                setTimeout(()=> {
                    then($("#"+elementId+"")[0])
                },100)
            }
        });
    }

}

function setAdressJson(AddJSon) {
	addressJson = AddJSon;
}

function setFormattedAdres(formatted_address) {
    if (formatted_address && addressJson["zipcode"] !== undefined) {
        addressJson["formatted_address"] = formatted_address;
    }
    setAdressJson(addressJson);
}

function getAdressJson() {
	return addressJson;
}

function getFullAdress(
    result, 
    postal_code,
    fullAdress
) {
    var address_components = result.address_components;
    var location = result.geometry.location


    var street_number = getParamMap(address_components, "street_number")
    var route = getParamMap(address_components, "route")
    var locality = getParamMap(address_components, "locality")
    var administrative_area_level_1 = getParamMap(address_components, "administrative_area_level_1")
    // var postal_code = getParamMap(address_components, "postal_code")
    var country = getParamMap(address_components, "country")

    //sélection ville
    var administrative_area_level_2 = getParamMap(address_components, "administrative_area_level_2")
    var cities = getVille(
        locality, 
        administrative_area_level_1, 
        administrative_area_level_2
    );

    return {
        street_number: street_number,
        route: route,
        locality: locality,
        administrative_area_level_1: administrative_area_level_1,
        postal_code: postal_code,
        zipcode: postal_code,
        country: country,
        lat: (location ? location.lat : null),
        lng: (location ? location.lng : null),
        formatted_address: fullAdress,
        new_attribute_formatted: result.formatted_address,
        //nouvelles attributes
        administrative_area_level_2: administrative_area_level_2,
        city: cities,
        v2_map: true,
    }
}

function isFullZipCode(zipaddress){
    if (!zipaddress) {
        return false;
    }
    var match = zipaddress.match(/[0-9]/g) || []
    if(match.length == 5){
        return true;
    }
    else{
        return false
    }
}

function isValidAdress(value){
    if (!value) {
        return false;
    }
    var match = value.match(/[a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ0-9]/g) || []
    if(match.length >= 3){
        return true;
    }
    else{
        return false
    }
}

function drawCityOptions(locality_element,cities){
    $(locality_element).html('')
    cities.map(addCity)
    function addCity(city){
        var option = $('<option>')
        $(option).text(city)
        $(option).attr('value',city)
        $(locality_element).append(option)
    }
}

function initLocality(locality){
    $(`${locality}`).attr('disabled','disabled')
    $(`${locality}`).html('')
    $(`${locality}`).val('')
}


function getParamMap(address_components,key) {
    var r = "";
    if (address_components && address_components.length) {
        address_components.map(function(address_component) {
            address_component.types.map(function(type) {
                if (type == key) {
                    r = address_component.long_name
                }
            })
        });
    }
    return r;
};

function getVille(
    place, 
    locality, 
    administrative_area_level_1, 
    administrative_area_level_2
) {
  var ville = "";
  if (locality) {
    ville = locality;
  }
  if (!ville && administrative_area_level_1) {
    ville = administrative_area_level_1;
  }
  if (!ville && administrative_area_level_2) {
    ville = administrative_area_level_2;
  }
  if (!ville && place.vicinity) {
    ville = place.vicinity
  }
  return ville
};

export {
	setAdressJson,
    setFormattedAdres,
	getAdressJson,
    isFullZipCode,
    isValidAdress,
    initLocality,
    drawCityOptions,
    getFullAdress,
	initGoogleMapInput,
}