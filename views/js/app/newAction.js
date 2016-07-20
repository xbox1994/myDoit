function subTaskModel(){
    var self=this;

    self.subTasks = ko.observableArray([
        {name:"SubTask1"},{name:"SubTask2"}
    ]);

    self.addSubTask = function(){
        self.subTasks.push({name:"new SubTask"});
    }

    self.removeSubTask = function(subTask){
        self.subTasks.remove(subTask);
    }
}
ko.applyBindings(new subTaskModel(),$('#subTask')[0]);
ko.bindingHandlers.datePicker = {
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
};

var dateModel1 = function ()
{
    var myDate=ko.observable(new Date());
    return {
        myDate1: myDate,
    }
}();
var dateModel2 = function ()
{
    var myDate=ko.observable(new Date());
    return {
        myDate2: myDate,
    }
}();
ko.applyBindings(dateModel1,$('#date1')[0]);
ko.applyBindings(dateModel2,$('#date2')[0]);