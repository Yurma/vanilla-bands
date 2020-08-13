(function(d, w){
    var app = d.querySelector("#app");
    var bandList = new Bands();

    var newItemDiv = renderItem("div");
    var chooseRadioDiv = renderItem("div");

    var bandForm = renderItem("div", "Band");
    var soloForm = renderItem("div", "Solo");

    var bandRadio = renderItem("input", null, {attributes: {"type": "radio","name": "type", "id": "band", "value": "band"}, events: {"click": function() {
        var parent = this.parentNode;
        var formDiv = parent.querySelector("div#form");
        if(this.checked) {
            while(formDiv.firstChild) {
                formDiv.removeChild(formDiv.lastChild);
            }
            formDiv.appendChild(bandForm);
        }
    }}});
    var soloRadio = renderItem("input", null, {attributes: {"type": "radio", "name": "type", "id": "solo", "value": "solo"}, events: {"click": function() {
        var parent = this.parentNode;
        var formDiv = parent.querySelector("div#form");
        if(this.checked) {
            while(formDiv.firstChild) {
                formDiv.removeChild(formDiv.lastChild);
            }
            formDiv.appendChild(soloForm);
        }
    }}});

    var formDiv = renderItem("div", null, {attributes: {"id": "form"}});


    chooseRadioDiv.appendChild(bandRadio);
    chooseRadioDiv.appendChild(soloRadio);
    chooseRadioDiv.appendChild(formDiv);
    newItemDiv.appendChild(chooseRadioDiv);

    var test = renderItem("button", "Click", {events: {event: "click", callback: function(){
        bandList.addList(new Band("Test", "test"));
        var person = new Solo("Justin", "Bieber", "Pop");
        console.log(bandList.addList(person).getList());
    }}});

    newItemDiv.appendChild(test);

    app.appendChild(newItemDiv);
}(document, window))