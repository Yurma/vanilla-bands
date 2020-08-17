(function (namespace) {
    namespace.Band = function Band (name, genre) { //Funkcija koja sluzi za kreiranje objekta preko objektnog konstruktora
        this.bandName = name;
        this.genre = genre;
        this.type = "Band";
    }

    namespace.Solo = function Solo (firstName, lastName, genre) { //Funkcija koja sluzi za kreiranje objekta preko objektnog konstruktora
        namespace.Band.call(this, `${firstName} ${lastName}`, genre); //Nasljeđuje metode i svojstva od Band funkcije
        this.type = "Solo";
    }

    namespace.Bands = function Bands () { //Objekt koji koristimo kao state managment 
        let list = [];
        let usedIds = [];
        this.lastId = null;
        this.getList = function() {
            return list;
        }
        this.removeById = function(id) {
            list = list.filter(band => band.id !== id); //Iz liste se ukloni item sa id-jem iz parametra
            document.querySelector("#app").querySelector("div#list").querySelector(`div#item${id}`).remove(); //Ukloni se node koji ima id iz parametra 
            return true;
        }
        this.addList = function(band) {
            var bandId = (function (ids) { //Moja implementacija stvaranja unique id-jeva
                var id = 0;
                (function findId () { //Samoprozivna funkcija koja se poziva sve dok ne naiđe na id koji ne postoji unutar usedIds arraya
                if(ids.includes(id, 0)) { 
                    id++;
                    findId(); //Ako postoji, funkcija se ponovno poziva
                } else {
                    return;
                }}())
                return id;
            }(usedIds)); //Closure-ov variable scope su globalne varijable, lokalne varijable i varijable vanjske funkcije i zato smo morali dodati userIds u parametre
            this.lastId = bandId;
            usedIds.push(bandId);
            var newBand = band;
            newBand.id = bandId;
            list.push(newBand);
            namespace.newItem.call(this, newBand); //Stvara referencu na objekt bandList preko this varijable na newItem funkciju
            return this; //Kada returnamo this omogućujemo kaskadne metode
        }
    }
})(window.namespace = window.namespace || {});