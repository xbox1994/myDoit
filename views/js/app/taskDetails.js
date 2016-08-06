function taskDetails() {
    var self = this;
    self._id = $('.onlyForGetId').attr('data-taskId');
    self.title = ko.observable();
    self.startDate = ko.observable();
    self.endDate = ko.observable();
    self.description = ko.observable();
    self.subTask = ko.observableArray([]);

    self.addSubTask = function (index) {
        self.subTask.push({name: "new SubTask"});
    }

    self.removeSubTask = function (subTask) {
        self.subTask.remove(subTask);
    }

    $.getJSON("/getTaskDetailsBy_id/"+self._id, function(allData) {
        self.title(allData[0].title);
        self.startDate(allData[0].startDate);
        self.endDate(allData[0].endDate);
        self.description(allData[0].description);
        self.subTask($.parseJSON(allData[0].subTask));
    });
    self.save = function(){
        $.post("/updateTaskDetails", {
                _id: self._id,title: self.title(), description:self.description(), subTask: ko.toJSON(self.subTask()),
                startDate:self.startDate(), endDate:self.endDate()
            },function(data,status){
            if("success"==status){
                alert("保存成功");
            }
        }
        );
    };
}

ko.applyBindings(new taskDetails());

