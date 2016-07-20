(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"../datePicker":2}],2:[function(require,module,exports){
var datePicker={
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var unwrap = ko.utils.unwrapObservable;
        var dataSource = valueAccessor();
        var binding = allBindingsAccessor();
        var options = {
            keyboardNavigation: true,
            todayHighlight: true,
            autoclose: true,
            daysOfWeekDisabled: [0, 6],
            format: 'mm/dd/yyyy'
        };
        if (binding.datePickerOptions) {
            options = $.extend(options, binding.datePickerOptions);
        }
        $(element).datepicker(options);
        $(element).datepicker('update', dataSource());
        $(element).on("changeDate", function (ev) {
            var observable = valueAccessor();
            if ($(element).is(':focus')) {
                // Don't update while the user is in the field...
                // Instead, handle focus loss
                $(element).one('blur', function(ev){
                    var dateVal = $(element).datepicker("getDate");
                    observable(dateVal);
                });
            }
            else {
                observable(ev.date);
            }
        });
        //handle removing an element from the dom
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            $(element).datepicker('remove');
        });
    },
    update: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        $(element).datepicker('update', value);
    }

}
ko.bindingHandlers.datePicker = datePicker;

module.exports = datePicker;

},{}],3:[function(require,module,exports){
require('./app/taskDetails');
},{"./app/taskDetails":1}]},{},[3]);