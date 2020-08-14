(function(d){
    var bandList = new Bands(); //Deklaracija objekta preko objektong konstruktora

    renderTree.call(d.querySelector("#app"), bandList); //Metoda call postavlja refernecu na d.querySelector("#app") preko varijable "this" unutar renderTree funkcije
}(document)); // Self invoking funkcija >> Deklarira se anonimno re sve deklaracije unutar nje nisu na globalnoj razini