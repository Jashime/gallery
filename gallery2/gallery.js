window.addEventListener("load",function(){
    var defaultWidth = 130,
        defaultHeight = 40,
        activeWidth = 340,
        activeHeight = 400;
   
    var container = document.getElementById("container");

    // 过渡未完成的时间控制
    var oldTime = new Date();
    var runId = 0;  
    var activePicture = function(index){
        clearTimeout(runId);
        var nowTime = new Date();
        if(nowTime - oldTime < 300){
            runId = setTimeout(function(){
                activePicture(index)
            },300)
            return;
        }
        oldTime = nowTime;

        //执行宽高变化
        var cx = index % 5;
        var cy = Math.floor(index / 5);
        for(var y = 0;y<4;y++){
            for(var x = 0;x < 5;x++){
                var cindex = y * 5 + x;
                var item = container.children[cindex];
                if(x == cx && y == cy){
                    item.style.width = activeWidth + "px";
                    item.style.height = activeHeight + "px";
                }else if(x ==cx){
                    item.style.width = activeWidth + "px";
                    item.style.height = defaultHeight + "px";
                }else if(y ==cy){
                    item.style.width = defaultWidth + "px";
                    item.style.height = activeHeight + "px";
                }else{
                    item.style.width = defaultWidth + "px";
                    item.style.height = defaultHeight + "px";
                }
            }
        }
    }

    // var showText = function(index){
    //     var item = container.children[index].getElementsByClassName("someText");
    //     if(item[0]){
    //          item[0].style.transform = "translateY(0)";
    //          item[0].style.opacity = 1;
    //     }   
    // }

    activePicture(0);/*页面加载完后的初始样式*/

    // 获取鼠标移动到的对象
    Array.prototype.forEach.call(container.children,function(o,i){
        o.addEventListener("mouseenter",function(){
            activePicture(i);
            // showText(i);
        })
    })
})