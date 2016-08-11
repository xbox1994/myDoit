function TaskModel(){
    var self = this;
    self.type = 1;

    self.rList = ko.observableArray([]);

    self.keyword = ko.observable("");

    self.list = ko.computed(function () {
        if(self.keyword() == ""){
            return self.rList();
        }else{
            var keyword = self.keyword();
            return self.rList().filter(function(value){
                if(value.title().indexOf(keyword)>=0){
                    return this;
                }
                if(value.date().indexOf(keyword)>=0){
                    return this;
                }
            });
        }
    },this);

    $.getJSON("/getTasksByType/"+self.type, function(allData) {
        var mappedTasks = $.map(allData, function(item) { return new Task(item) });
        self.rList(mappedTasks);
    });

    function Task(data){
        var s = this;
        s.title = ko.observable(data.title);
        s.date = ko.observable(data.date);
        s._id = ko.observable(data._id.$oid);
        s.toFinish = function(){
            $.ajax({
                type: 'PUT',
                url: '/toFinished',
                data: {_id:s._id},
                success: function(data,status){
                    if(status == 'success'){
                        self.rList.remove(s);
                    }
                },
            });
        }
        s.toDustbin = function(){
            $.ajax({
                type: 'PUT',
                url: '/toDustbin',
                data: {_id:s._id},
                success: function(data,status){
                    if(status == 'success'){
                        self.rList.remove(s);
                    }
                },
            });
        }
    }
}
ko.applyBindings(new TaskModel());

window.onload = function(){
    var oMask=document.getElementById('mask');
    var oSearch=document.getElementById('searchTip');
    var aStep=oSearch.getElementsByTagName('div');
    var aA=oSearch.getElementsByTagName('a');
    var aClose=oSearch.getElementsByTagName('span');

    //第一次
    //var cookie=document.cookie;
    //var mDate=new Date();
    //mDate.setDate(mDate.getDate()+30);
    //document.cookie="key=www.doit.com;expires="+mDate;
    if($.cookie('doitFirst')!="false"){
        //初始化蒙版与第一步的显示状态
        oMask.style.display=oSearch.style.display=aStep[0].style.display="block";

        //下一步和开始体验按钮
        for(var i=0;i<aA.length;i++){
            aA[i].index=i;
            aA[i].onclick=function(){
                this.parentNode.style.display="none";
                if(this.index<aStep.length-1){
                    aStep[this.index+1].style.display="block";
                }else{
                    oMask.style.display=oSearch.style.display="none";
                }
            }
        }

        //关闭按钮
        for(var i=0;i<aClose.length;i++){
            aClose[i].onclick=function(){
                oMask.style.display=oSearch.style.display="none";
            }
        }
        $.cookie('doitFirst',false,{expires:7});
    }

}