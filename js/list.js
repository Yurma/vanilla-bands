function Band(name, genre) {
    this.bandName = name;
    this.genre = genre;
}

function Bands() {
    this.list = [];
    this.getList = function() {
        return this.list;
    }
    this.addList = function(band) {
        this.list.push(band);
    }
}
