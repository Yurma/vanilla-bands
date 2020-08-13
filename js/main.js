(function(d, w){
    var app = d.querySelector("#app");
    var bandList = new Bands();

    var test = d.createElement("button");
    test.innerHTML = "Click me!";
    test.addEventListener("click", function(){
        bandList.addList(new Band("Test", "test"));
        var person = new Solo("Justin", "Bieber", "Pop");
        console.log(bandList.addList(person).getList());
    });

    app.appendChild(test);
}(document, window))