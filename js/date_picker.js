
function show_datepicker(){
    $('.datepicker').datetimepicker({
        format : "YYYY-MM-DD"
    });
    
}


function show_datetimepicker(){
    $('.datetimepicker').datetimepicker({
        format : "YYYY-MM-DD hh:mm A",
        
    });
  
    
}

$(function() {
    show_datetimepicker();
    show_datepicker();
});
