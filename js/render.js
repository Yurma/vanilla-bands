function renderItem(type, value = "", {attributes, events} = {}) {
    var element = document.createElement(type);
    if (!!value) element.innerHTML = value;
    if(!!attributes) { 
        for(const [name, value] of Object.entries(attributes)) {
            element.setAttribute(name, value);
        }
    }
    if(!!events) {   
        for(const [name, callback] of Object.entries(events)) {
            if(!!name && typeof(callback) == "function"){
                element.addEventListener(name, callback);
            }
        }
    }
    return element;
}

function renderTree() {
    var bandList = new Bands();

    var newItemDiv = renderItem("div");
    var chooseRadioDiv = renderItem("div");

    var bandForm = renderBandForm();
    var soloForm = renderSoloForm();

    var bandRadio = renderItem("input", null, {attributes: {"type": "radio","name": "type", "id": "band", "value": "band"}, events: {"click": function() {
        var parent = this.parentNode.parentNode;
        var formDiv = parent.querySelector("div#form");
        if(this.checked) {
            while(formDiv.firstChild) {
                formDiv.removeChild(formDiv.lastChild);
            }
            formDiv.appendChild(bandForm);
        }
    }}});
    var soloRadio = renderItem("input", null, {attributes: {"type": "radio", "name": "type", "id": "solo", "value": "solo"}, events: {"click": function() {
        var parent = this.parentNode.parentNode;
        var formDiv = parent.querySelector("div#form");
        if(this.checked) {
            while(formDiv.firstChild) {
                formDiv.removeChild(formDiv.lastChild);
            }
            formDiv.appendChild(soloForm);
        }
    }}});

    var formDiv = renderItem("div", null, {attributes: {"id": "form"}});
    var test = renderItem("button", "Click", {events: {"click": function(){
        if(bandRadio.checked) {
            var bandName = bandForm.querySelector("input#name").value;
            var genre = bandForm.querySelector("input#genre").value;
            bandList.addList(new Band(bandName, genre));
        }else if(soloRadio.checked) {
            var soloFirstName = soloForm.querySelector("input#firstName").value;
            var soloLastName = soloForm.querySelector("input#lastName").value;
            var genre = soloForm.querySelector("input#genre").value;
            bandList.addList(new Solo(soloFirstName, soloLastName, genre));
        }
        console.log(bandList.getList());
    }}});

    chooseRadioDiv.appendChild(bandRadio);
    chooseRadioDiv.appendChild(soloRadio);
    chooseRadioDiv.appendChild(formDiv);
    newItemDiv.appendChild(chooseRadioDiv);
    newItemDiv.appendChild(test);
    
    return newItemDiv;
}

function renderBandForm() {
    var div = renderItem("div", "Band");
    var inputName = renderItem("input", null, {attributes: {"id": "name", "placeholder": "Band Name"} });
    var inputGenre = renderItem("input", null, {attributes: {"id": "genre", "placeholder": "Genre"} });
    div.appendChild(inputName);
    div.appendChild(inputGenre);
    return div;
}

function renderSoloForm() {
    var div = renderItem("div", "Solo");
    var inputFirstName = renderItem("input", null, {attributes: {"id": "firstName", "placeholder": "First Name"} });
    var inputLastName = renderItem("input", null, {attributes: {"id": "lastName", "placeholder": "Last Name"} });
    var inputGenre = renderItem("input", null, {attributes: {"id": "genre", "placeholder": "Genre"} });
    div.appendChild(inputFirstName);
    div.appendChild(inputLastName);
    div.appendChild(inputGenre);
    return div;
}