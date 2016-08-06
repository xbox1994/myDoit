
function subTaskModel(){
    var self=this;
    self.title = ko.observable();
    self.startDate = ko.observable();
    self.endDate = ko.observable();
    self.description = ko.observable();
    self.subTask = ko.observableArray([]);

    self.addSubTask = function(){
        self.subTask.push({name:"new SubTask"});
    }

    self.removeSubTask = function(subTask){
        self.subTask.remove(subTask);
    }
    self.save = function(type){
        $.post("/addTaskDetails", {
                title: self.title(), description:self.description(), subTask: ko.toJSON(self.subTask()),
                startDate:self.startDate(), endDate:self.endDate(), type:0, date:new Date().toLocaleString()
            },function(data,status){
                if("success"==status){
                    alert("保存成功");
                }
            }
        );
    };
}
ko.applyBindings(new subTaskModel());
