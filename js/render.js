function renderItem(type, value = "", {attributes, events} = {}) { //Funkcija koju koristim za kreiranje elemenata
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

function renderTree(list) { //Referenca na document.querySelect("#app"); 
    this.appendChild(renderTitle("Vanilla Band Database"));
    this.appendChild(renderNew(list));
    this.appendChild(renderItem("hr", null))
    this.appendChild(renderList());
    return this;
}

function renderTitle(title) { // Funkcija koja rendera title stranice
    document.title = title;
    var titleDiv = renderItem("div", title, {attributes: {"class": "title"}});

    return titleDiv;
}

function renderNew(bandList) { // Funckcija koja rendera dio stranice vezan za dodavanje novog benda/glazbenika
    var showDiv = renderItem("div", null, {attributes: {"class": "show-div"}});

    var newItemDiv = renderItem("div", null, {attributes: {"class": "new-item"}});
    var chooseRadioDiv = renderItem("div", null, {attributes: {"class": "radio-div"}});

    var bandForm = renderBandForm();
    var soloForm = renderSoloForm();

    var divBandBtn = renderItem("div", null, {attributes: {"class": "btn-radio"}});
    var divSoloBtn = renderItem("div", null, {attributes: {"class": "btn-radio"}});

    var bandRadio = renderItem("input", null, {attributes: {"type": "radio","name": "type", "id": "band", "value": "band", "checked": ""}, events: {"click": function() {
        var parent = this.parentNode.parentNode;
        var formDiv = parent.parentNode.querySelector("div#form");
        if(this.checked) {
            while(formDiv.firstChild) { //Dokle god postoji firstChild unutar formDiv node-a brisat ce lastChild i tako obrisati sve child node-ove 
                formDiv.removeChild(formDiv.lastChild);
            }
            formDiv.appendChild(bandForm);
        }
    }}});

    var bandLabel = renderItem("label", "Band", {attributes: {"for": "band"}});

    var soloRadio = renderItem("input", null, {attributes: {"type": "radio", "name": "type", "id": "solo", "value": "solo"}, events: {"click": function() {
        var parent = this.parentNode.parentNode;
        var formDiv = parent.parentNode.querySelector("div#form");
        if(this.checked) {
            while(formDiv.firstChild) {
                formDiv.removeChild(formDiv.lastChild);
            }
            formDiv.appendChild(soloForm);
        }
    }}});

    var soloLabel = renderItem("label", "Musician", {attributes: {"for": "solo"}});

    divBandBtn.appendChild(bandRadio);
    divBandBtn.appendChild(bandLabel);
    divSoloBtn.appendChild(soloRadio);
    divSoloBtn.appendChild(soloLabel);

    var formDiv = renderItem("div", null, {attributes: {"id": "form"}});
    var submit = renderItem("button", "Submit", {events: {"click": function(){
        if(bandRadio.checked) { //Ako je Band radio oznacen radit ce se Band objekt, a ako je Solo oznacen radi se Solo objekt
            var bandName = bandForm.querySelector("input#name").value;
            var genre = bandForm.querySelector("input#genre").value;
            bandList.addList(new Band(bandName, genre)).lastId;
        }else if(soloRadio.checked) {
            var soloFirstName = soloForm.querySelector("input#firstName").value;
            var soloLastName = soloForm.querySelector("input#lastName").value;
            var genre = soloForm.querySelector("input#genre").value;
            bandList.addList(new Solo(soloFirstName, soloLastName, genre)).lastId;
        }
        console.log(bandList.getList());
    }}});

    var toggleDiv = renderItem("div", null, {attributes: {"class": "toggle-div"}});

    toggleDiv.appendChild(renderItem("button", "New entry", {attributes: {"class": "toggle-btn"}, events: {"click": function() {
        newItemDiv.classList.toggle('show');
        if(newItemDiv.classList.contains('show')) {
            this.innerHTML = "Close";
        } else {
            this.innerHTML = "New entry";
        }
    }}}));


    formDiv.appendChild(bandForm);

    chooseRadioDiv.appendChild(divBandBtn);
    chooseRadioDiv.appendChild(divSoloBtn);
    newItemDiv.appendChild(chooseRadioDiv);
    newItemDiv.appendChild(formDiv);
    newItemDiv.appendChild(submit);

    showDiv.appendChild(newItemDiv);
    showDiv.appendChild(toggleDiv);
    
    return showDiv;
}

function renderBandForm() {
    var div = renderItem("div", "New band");
    var inputName = renderItem("input", null, {attributes: {"id": "name", "placeholder": "Band Name"} });
    var inputGenre = renderItem("input", null, {attributes: {"id": "genre", "placeholder": "Genre"} });
    div.appendChild(inputName);
    div.appendChild(inputGenre);
    return div;
}

function renderSoloForm() {
    var div = renderItem("div", "New Musician");
    var inputFirstName = renderItem("input", null, {attributes: {"id": "firstName", "placeholder": "First Name"} });
    var inputLastName = renderItem("input", null, {attributes: {"id": "lastName", "placeholder": "Last Name"} });
    var inputGenre = renderItem("input", null, {attributes: {"id": "genre", "placeholder": "Genre"} });
    div.appendChild(inputFirstName);
    div.appendChild(inputLastName);
    div.appendChild(inputGenre);
    return div;
}

function renderList() {
    var listDiv = renderItem("div", "<div class='list-title'>List of entries</div>", {attributes: {"id": "list"}});

    return listDiv;
}

function newItem(band) { // Funkcija stvara novi Node preko band entry-ja unutar diva sa id-jem "list"
    var list = document.querySelector("#app").querySelector("div#list");

    var itemDiv = renderItem("div", null, {attributes: {"id": `item${band.id}`, "class": "band-item"} });

    var infoDiv = renderItem("div", null, {attributes: {"class": 'info'}});

    var itemNameSpan = renderItem("span", `${band.type == "Band" ? "Band " : "Musician "}<span class="text-bold">${band.bandName}</span> - `, {attributes: {"id": "name"}});
    var genreSpan = renderItem("span", `Genre: <span class="text-bold">${band.genre}</span>`);

    

    var actionsDiv = renderItem("div", null, {attributes: {"class": "actions"}});

    actionsDiv.appendChild(
        renderItem("button", "Remove", {events: {"click": () => {
            if(confirm("Are you sure you want to delete this item?")) removeItem.call(this, band.id); //this je već referenca na objekt bandList unutar Bands funkcije i dodaje se referenca na this unutar removeItem funkcije
        }}})
    );

    infoDiv.appendChild(itemNameSpan);
    infoDiv.appendChild(genreSpan);
    itemDiv.appendChild(infoDiv);
    itemDiv.appendChild(actionsDiv);
    list.appendChild(itemDiv);
}

function removeItem(id) { //Funkcija koja poziva metodu removeById iz objekta koji je referentiran na varijablu this
    return this.removeById(id);
}