function Task(data){
    this.title = ko.observable(data.title);
    this.date = ko.observable(data.date);
    this._id = ko.observable(data._id.$oid);
}

function TaskModel(){
    var self = this;
    self.type = 5;

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

}
ko.applyBindings(new TaskModel());
