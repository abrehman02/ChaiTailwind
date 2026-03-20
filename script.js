// console.log("chai loaded")

const allElements = document.querySelectorAll("*")
const styleMap = {
    p : (v) => ({padding: v + 'px'}),
    m : (v) => ({magin: v + 'px'}) ,
    bg : (v) => ({backgroundColor: v }) ,
    text : (v) => ({color: v }),
};
// console.log(allElements)
allElements.forEach(element => {
    // console.log(element)  prints all the elements on the console
    // console.log(element.classList) returns all the classNames of each of the document elements 
    // from the classList we can grab the class elements beginning with chai- name

    element.classList.forEach((cls) =>{
        if (cls.startsWith("chai-")){
            // console.log(parseChaicls(cls))
            const parsed = parseChaicls(cls)
            // console.log("Parsed :", parsed)

            if ( !parsed ){
                return 
            }

            const {key , value} = parsed ;

            if (styleMap[key]){
                const styles = styleMap[key](value);

                Object.assign(element.style, styles);
            }
        }
    }
    )
});
// in the above function we got the classes beginning with chai- so now we have to parse the 
// css which is written in shortcuts like p-10 , m-2 , bg-red ----> key value pairs { key : "p",
// "value":10 ....}  
function parseChaicls(cls){
    const parts = cls.split("-");
    // console.log(parts)
    if (parts.length < 3 ){
        return null // chai-flex , chai-grid will deal with them later if time allows
    }

    return {
        "key" : parts[1],
        "value" : parts[2]
    }
}


// next i wil create a hashmap from where we can retreive the properties based on the key 
/*
converting this 
 {
    key : 'p',
    value : 10
 }

to 

{padding : 10px}

*/

