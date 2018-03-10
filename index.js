function XyGallery(id,option){
    var container = document.getElementById(id);
    if(container.className.indexOf('Xy-gallery') == -1) container.className += " Xy-gallery";

    var defaultOption = {
        defaultWidth:130,
        defaultHeight:40,
        activeWidth:340,
        activeHeight:400,
        animatDuration:300
    }

    option = Object.assign({},defaultOption,option);
    if(option.width == undefined) throw "width not defined.";
    if(option.height == undefined) throw "height not defined.";
    if(option.height * option.width != container.children.length) throw "width and height not match children length."
    
    var lastRunTime = new Date(0);
    var runId = 0;
    var activePicture = function(index){
        
        clearTimeout(runId);
        var currentTime = new Date();
        if(currentTime - lastRunTime < option.animatDuration){
            runId = setTimeout(function(){
                activePicture(index);
            },option.animatDuration)
            return;
        }
        lastRunTime = currentTime;

        var cx = index % option.width;
        var cy = Math.floor(index / option.width);
        container.style.width = (option.width-1) * option.defaultWidth + option.activeWidth + "px";
        for(var y = 0;y<option.height;y++){
            for(var x = 0;x<option.width;x++){
                var cindex = y * option.width + x;
                var item = container.children[cindex];
                if(x == cx && y == cy){
                    item.style.width = option.activeWidth + "px";
                    item.style.height = option.activeHeight + "px";
                }else if(x ==cx){
                    item.style.width = option.activeWidth + "px";
                    item.style.height = option.defaultHeight + "px";
                }else if(y ==cy){
                    item.style.width = option.defaultWidth + "px";
                    item.style.height = option.activeHeight + "px";
                }else{
                    item.style.width = option.defaultWidth + "px";
                    item.style.height = option.defaultHeight + "px";
                }
            }
        }
    }
    activePicture(0);

    // for(var i = 0;i<container.children.length;i++){
    //     var item = container.children[i];
    //     item.addEventListener("mouseenter",(function(i){
    //         return function(evt){
    //         activePicture(i);
    //         }
    //     })(i))
    // }

    Array.prototype.forEach.call(container.children,function(o,i){
        o.addEventListener("mouseenter",function(){
            activePicture(i);
        })
    })

    return {
        active: activePicture
    }
}