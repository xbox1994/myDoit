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
