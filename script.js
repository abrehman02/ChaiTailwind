// console.log("chai loaded")

const allElements = document.querySelectorAll("*")
const styleMap = {
    p : (v) => ({padding: v + 'px'}),
    m : (v) => ({margin: v + 'px'}) ,
    bg : (v) => ({backgroundColor: v }) ,
    text : (v) => ({color: v }),

    fs : (v) => ({fontSize: v + 'px'}),
    rounded : (v) => ({borderRadius: v + 'px'}),
    border : (v) => ({border: v + 'px solid black'}),
    
    
    flex : () => ({display:'flex'}),
    center : () => ({
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }),

};
// console.log(allElements)
allElements.forEach(element => {
    // console.log(element)  prints all the elements on the console
    // console.log(element.classList) returns all the classNames of each of the document elements 
    // from the classList we can grab the class elements beginning with chai- name

    [...element.classList].forEach((cls) =>{
        if (cls.startsWith("chai-hover-")){
            applyHoverStyles(element,cls)
        }
        else if (cls.startsWith("chai-")){
            // console.log(parseChaicls(cls))
           applyChaiStyles(element,cls)
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
    if (parts.length < 2){
        return null
    }
    // if (parts.length == 2 ){
    //     return {
    //         key:parts[1],
    //         value:null
    //     } }
    

    return {
        "key" : parts[1],
        // "value" : parts[2]
        value : parts.slice(2).join("-") // for handling the cases like bg-light-red or p-10-20
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



function applyChaiStyles(element,cls){
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
    element.classList.remove(cls);
}



function applyHoverStyles(element , cls){
    const parts = cls.split("-");

    const key = parts[2] ;
    const value = parts.slice(3).join("-");

    if (!styleMap[key]){
        return 
    }
    
    const hoverStyles = styleMap[key](value)
    
    const originalStyles = {} ;

    Object.keys(hoverStyles).forEach((prop) => {
        originalStyles[prop] = element.style[prop] || "";
    })

    element.addEventListener("mouseenter" , () => {
        Object.assign(element.style, hoverStyles)
    })

    element.addEventListener("mouseleave", () => {
        Object.assign(element.style,originalStyles)
        // Object.keys(hoverStyles).forEach((prop)=>{
        //     element.style[prop] = originalStyles[prop] || "";
        // })
    });

    element.classList.remove(cls);

}