export  function effect(fn,options:any = {}){
    const effect = createReactiveEffect(fn,options);
    if(!options.lazy){
        effect()
    }
    return effect
}

function createReactiveEffect(fn,options){
    const effect =function reactiveEffect(){
        console.log("effect")
    }
    return effect;
}