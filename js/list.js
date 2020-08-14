function Band(name, genre) {
    this.bandName = name;
    this.genre = genre;
    this.type = "Band";
}

function Solo(firstName, lastName, genre) {
    Band.call(this, `${firstName} ${lastName}`, genre)
    this.type = "Solo";
}

function Bands() {
    let list = [];
    let usedIds = [];
    this.lastId = null;
    this.getList = function() {
        return list;
    }
    this.removeById = function(id) {
        list = list.filter(band => band.id !== id);
        return list;
    }
    this.addList = function(band) {
        var bandId = (function (ids) {
            var id = 0;
            (function findId () {   
            if(ids.includes(id, 0)) {
                id++;
                findId();
            } else {
                return;
            }}())
            return id;
        }(usedIds));
        this.lastId = bandId;
        usedIds.push(bandId);
        var newBand = band;
        newBand.id = bandId;
        list.push(newBand);
        return this;
    }
}
var bandList = new Bands();