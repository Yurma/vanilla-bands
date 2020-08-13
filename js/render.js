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