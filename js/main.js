(function(d, namespace){
    var bandList = new namespace.Bands(); //Deklaracija objekta preko objektong konstruktora

    namespace.renderTree.call(d.querySelector("#app"), bandList); //Metoda call postavlja refernecu na d.querySelector("#app") preko varijable "this" unutar renderTree funkcije
}(document, window.namespace = window.namespace || {})); // Self invoking funkcija >> Deklarira se anonimno re sve deklaracije unutar nje nisu na globalnoj razini