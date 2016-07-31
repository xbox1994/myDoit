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

