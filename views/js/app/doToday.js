
function doTodayModel(){
    var self = this;

    self.rList = ko.observableArray([
        {name:"搭好框架",date:"07/19 周二",taskId:"1"},{name:"Plan 2",date:"09/09 周一",taskId:"2"},
        {name:"Plan 3",date:"09/09 周一",taskId:"3"}
    ]);

    self.isEmpty = self.rList().length == 0;

    self.keyword = ko.observable("");

    self.list = ko.computed(function () {
        if(self.keyword() == ""){
            return self.rList();
        }else{
            var keyword = self.keyword();
            return self.rList().filter(function(value){
                if(value.name.indexOf(keyword)>=0){
                    return this;
                }
                if(value.date.indexOf(keyword)>=0){
                    return this;
                }
            });
        }
    },this);



}
ko.applyBindings(new doTodayModel());

