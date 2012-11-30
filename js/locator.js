var searchAddress;

//function to locate address 
function LocateAddress() {
    dojo.byId("imgSearchLoader").style.display = "block";
    if (dojo.byId("txtAddress").value.trim() == '') {       
        dojo.byId("imgSearchLoader").style.display = "none";
        RemoveChildren(dojo.byId('tblAddressResults'));
        CreateScrollbar(dojo.byId("divAddressScrollContainer"), dojo.byId("divAddressScrollContent"));        
        alert(messages.getElementsByTagName("addressToLocate")[0].childNodes[0].nodeValue);
        return;
    }
    var address = [];
    address[locatorSettings.LocatorParamaters] = dojo.byId('txtAddress').value;

    var locator1 = new esri.tasks.Locator(locatorSettings.LocatorURL);
    locator1.outSpatialReference = map.spatialReference;
    locator1.addressToLocations(address, [locatorSettings.CandidateFields], function (candidates) {
        ShowLocatedAddress(candidates);
    },
    function (err) {     
        dojo.byId("imgSearchLoader").style.display = "none";
    });
}

//function to populate address list in address container with their events
function ShowLocatedAddress(candidates) {
    RemoveChildren(dojo.byId('tblAddressResults'));
    CreateScrollbar(dojo.byId("divAddressScrollContainer"), dojo.byId("divAddressScrollContent"));

    if (candidates.length > 0) {
        var table = dojo.byId("tblAddressResults");
        var tBody = document.createElement("tbody");
        table.appendChild(tBody);
        table.cellSpacing = 0;
        table.cellPadding = 0;
        
        var counter = 0; //variable set to count the valid address results according to locator settings in configuration file
        for (var i in candidates) {
            if (candidates[i].score > locatorSettings.AddressMatchScore) {
                if (baseMapExtent.contains(candidates[i].location)) {
                    for (j in locatorSettings.LocatorFieldValues) {
                        if (candidates[i].attributes[locatorSettings.LocatorFieldName] == locatorSettings.LocatorFieldValues[j]) {
                            counter++;
                            var candidate = candidates[i];
                            var tr = document.createElement("tr");
                            tBody.appendChild(tr);
                            var td1 = document.createElement("td");
                            td1.innerHTML = dojo.string.substitute(locatorSettings.DisplayField, candidate.attributes);
                            td1.align = "left";
                            td1.style.borderBottom = "black 1px solid";                         
                            if (i % 2 != 0) {
                                td1.className = "bottomborder listDarkColor";
                            } else {
                                td1.className = "bottomborder listLightColor";
                            }
                            td1.style.cursor = "pointer";
                            td1.setAttribute("x", candidate.location.x);
                            td1.setAttribute("y", candidate.location.y);
                            td1.setAttribute("address", dojo.string.substitute(locatorSettings.DisplayField, candidate.attributes));
                            td1.onclick = function () {
                                dojo.byId("txtAddress").value = this.innerHTML;
                                dojo.byId('txtAddress').setAttribute("defaultAddress", this.innerHTML);
                                mapPoint = new esri.geometry.Point(Number(this.getAttribute("x")), Number(this.getAttribute("y")), map.spatialReference);
                                dojo.byId("txtAddress").setAttribute("defaultAddressTitle", this.innerHTML);
                                LocateGraphicOnMap();
                                dojo.byId("imgGeolocation").src = "images/imgGeolocation.png";
                            }
                            tr.appendChild(td1);
                        }
                    }
                }
            }
        }
        if (counter == 0) {
            var tr = document.createElement("tr");
            tBody.appendChild(tr);
            var td1 = document.createElement("td");
            td1.innerHTML = messages.getElementsByTagName("noSearchResults")[0].childNodes[0].nodeValue;
            tr.appendChild(td1);
            dojo.byId("imgSearchLoader").style.display = "none";
            return;
        }
        dojo.byId("imgSearchLoader").style.display = "none";
        SetAddressResultsHeight();
    } else {
        dojo.byId("imgSearchLoader").style.display = "none";
        LoctorErrBack("noSearchResults");
    }
}

//function to create the data when no data available from locator service
function LoctorErrBack(val) {
    var table = dojo.byId("tblAddressResults");
    var tBody = document.createElement("tbody");
    table.appendChild(tBody);
    table.cellSpacing = 0;
    table.cellPadding = 0;

    var tr = document.createElement("tr");
    tBody.appendChild(tr);
    var td1 = document.createElement("td");
    td1.innerHTML = messages.getElementsByTagName(val)[0].childNodes[0].nodeValue;
    tr.appendChild(td1);
}

//function to locate graphic on map from searched address
function LocateGraphicOnMap() {
    map.centerAndZoom(mapPoint, locatorSettings.ZoomLevel);
    if (map.getLayer(tempGraphicsLayerId)) {
        map.getLayer(tempGraphicsLayerId).clear();
    }
   
    var symbol = new esri.symbol.PictureMarkerSymbol(locatorSettings.DefaultLocatorSymbol, locatorSettings.MarkupSymbolSize.width, locatorSettings.MarkupSymbolSize.height);
    var graphic = new esri.Graphic(mapPoint, symbol, null, null);
    var features = [];
    features.push(graphic);
    var featureSet = new esri.tasks.FeatureSet();
    featureSet.features = features;
    var layer = map.getLayer(tempGraphicsLayerId);
    layer.add(featureSet.features[0]);
    HideProgressIndicator();
    HideContainer("locate");
}

//function to display the current location of the user
function ShowMyLocation() {
    navigator.geolocation.getCurrentPosition(
    function (position) {
        dojo.byId("imgGeolocation").src = "images/imgGeolocation_hover.png";
        ShowProgressIndicator();
        mapPoint = new esri.geometry.Point(position.coords.longitude, position.coords.latitude, new esri.SpatialReference({
            wkid: 4326
        }));
        var graphicCollection = new esri.geometry.Multipoint(new esri.SpatialReference({
            wkid: 4326
        }));
        graphicCollection.addPoint(mapPoint);
        geometryService.project([graphicCollection], map.spatialReference, function (newPointCollection) {
            mapPoint = newPointCollection[0].getPoint(0);
            if (!(baseMapExtent.contains(mapPoint))) {
                map.infoWindow.hide();
                mapPoint = null;
                map.getLayer(tempGraphicsLayerId).clear();
                HideProgressIndicator();
                alert(messages.getElementsByTagName("geoLocation")[0].childNodes[0].nodeValue);
                return;
            }
            LocateGraphicOnMap();
            HideProgressIndicator();
        });
    },
    function (error) {
        dojo.byId("imgGeolocation").src = "images/imgGeolocation.png";
        HideProgressIndicator();
        switch (error.code) {
            case error.TIMEOUT:
                alert(messages.getElementsByTagName("geolocationTimeout")[0].childNodes[0].nodeValue);
                break;
            case error.POSITION_UNAVAILABLE:
                alert(messages.getElementsByTagName("geolocationPositionUnavailable")[0].childNodes[0].nodeValue);
                break;
            case error.PERMISSION_DENIED:
                alert(messages.getElementsByTagName("geolocationPermissionDenied")[0].childNodes[0].nodeValue);
                break;
            case error.UNKNOWN_ERROR:
                alert(messages.getElementsByTagName("geolocationUnKnownError")[0].childNodes[0].nodeValue);
                break;
        }
    }, {
        timeout: 10000
    });
}
