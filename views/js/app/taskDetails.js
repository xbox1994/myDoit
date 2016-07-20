require('../datePicker');
function taskDetails() {
    var self = this;

    self.taskDetailsInfo = ko.observableArray([
        {name: "搭好框架", date: "07/19 周二", taskId: "1"}, {name: "Plan 2", date: "09/09 周一", taskId: "2"}
    ]);

    self.subTasks = ko.observableArray([
        {name: "SubTask1"}, {name: "SubTask2"}
    ]);

    self.addSubTask = function () {
        self.subTasks.push({name: "new SubTask"});
    }

    self.removeSubTask = function (subTask) {
        self.subTasks.remove(subTask);
    }
}

ko.applyBindings(new taskDetails(), $('#subTask')[0]);

var dateModel1 = function () {
    var myDate = ko.observable(new Date());
    return {
        myDate1: myDate,
    }
}();
var dateModel2 = function () {
    var myDate = ko.observable(new Date());
    return {
        myDate2: myDate,
    }
}();
ko.applyBindings(dateModel1, $('#date1')[0]);
ko.applyBindings(dateModel2, $('#date2')[0]);