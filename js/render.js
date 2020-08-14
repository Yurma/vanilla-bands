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
    this.appendChild(renderNew());
    this.appendChild(renderList());
    return this;
}

function renderNew() {
    var newItemDiv = renderItem("div");
    var chooseRadioDiv = renderItem("div");

    var bandForm = renderBandForm();
    var soloForm = renderSoloForm();

    var bandRadio = renderItem("input", null, {attributes: {"type": "radio","name": "type", "id": "band", "value": "band", "checked": ""}, events: {"click": function() {
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
            var bandId = bandList.addList(new Band(bandName, genre)).lastId;
            newItem(bandList.getList().filter(band => band.id === bandId)[0]);
        }else if(soloRadio.checked) {
            var soloFirstName = soloForm.querySelector("input#firstName").value;
            var soloLastName = soloForm.querySelector("input#lastName").value;
            var genre = soloForm.querySelector("input#genre").value;
            var bandId = bandList.addList(new Solo(soloFirstName, soloLastName, genre)).lastId;
            newItem(bandList.getList().filter(band => band.id === bandId)[0]);
        }
        console.log(bandList.getList());
    }}});

    formDiv.appendChild(bandForm);

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

function renderList() {
    var listDiv = renderItem("div", "List", {attributes: {"id": "list"}});

    return listDiv;
}

function newItem(band) {
    var list = document.querySelector("#app").querySelector("div#list");

    var itemDiv = renderItem("div", null, {attributes: {"id": `item${band.id}`} });
    var itemNameSpan = renderItem("span", `${band.type == "Band" ? "Band " : "Musician "}${band.bandName} - `);
    var genreSpan = renderItem("span", `Genre: ${band.genre}`);

    var actionsDiv = renderItem("div", null, {attributes: {"class": "actions"}});

    actionsDiv.appendChild(
        renderItem("button", "Remove", {events: {"click": removeItem.bind(this, band.id)}})
    )

    itemDiv.appendChild(itemNameSpan);
    itemDiv.appendChild(genreSpan);
    itemDiv.appendChild(actionsDiv);
    list.appendChild(itemDiv);
}

function removeItem(id) {
    bandList.removeById(id);
    document.querySelector("#app").querySelector("div#list").querySelector(`div#item${id}`).remove();
    return true;
}