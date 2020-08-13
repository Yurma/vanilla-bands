(function(d, w){
    var app = d.querySelector("#app");
    var bandList = new Bands();

    var test = d.createElement("button");
    test.innerHTML = "Click me!";
    test.addEventListener("click", function(){
        var bnd = new Band("Test", "test");
        console.log(bnd)
        bandList.addList(bnd);
        console.log(bandList.getList());
    });

    app.appendChild(test);
}(document, window))