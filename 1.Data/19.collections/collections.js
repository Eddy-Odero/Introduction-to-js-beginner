function arrToSet(v){
    if (Array.isArray(v)){
        return new Set(v)
    }
}
function arrToStr(v){
    if (Array.isArray(v)){
        return v.join('')
    }   
}
function setToArr(v){
    if (v instanceof Set){
        return Array.from(v)
        
    }   
}
function setToStr(v){
    if (v instanceof Set){
        return [...v].join('')
    }
}
function strToArr(v){
    if (typeof v === "string"){
        return Array.from(v)
    }
}
function strToSet(v){
    if(typeof v === "string"){
        return new Set(v)
    }
}
function mapToObj(v){
    if(v instanceof Map){
        return Object.fromEntries(v)
    }

}

function objToArr(v){
    if (typeof v === "object"){
        return Object.values(v)
    }
}

function objToMap(v){
    if(typeof v === "object"){
        return new Map(Object.entries(v))

   }
}
function arrToObj(v){
    if (Array.isArray(v)){
        return { ...v }
    }
}
function strToObj(v){
    if (typeof v === "string"){
        return { ...v}

    }
}
function superTypeOf(v) {
    if (v === null) return "null";
    if (v === undefined) return "undefined";

    if (typeof v === "object") {
        if (v instanceof Map) return "Map";
        if (v instanceof Set) return "Set";
        if (Array.isArray(v)) return "Array";
        return "Object";
    }
    const type = typeof v;
    return type.charAt(0).toUpperCase() + type.slice(1);
}
