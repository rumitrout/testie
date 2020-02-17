
function delete_score_row(){
  $('.score-delete').click(function(e){
    e.preventDefault();
    var tr = $(this).parent().parent();
    var id = tr.attr("data-id");
    tr.remove();
    var url="/api/shortage_score/delete";
    var data = { 
            
            "id" : id,
           
    };

    $.post(url, data)
        .done(function(response) {
            if(response && response.status) {
                if(response.status == 'success') {
                  window.location = window.location;
                }
            }
       
    });

    
  });
}

$(function() {
  delete_score_row();
  $('.read-more').click(function(e){
    e.preventDefault();
  });
  $('[data-toggle="popover"]').popover({
     html : true,
     content:  function() {
        var pcns = JSON.parse($(this).attr('data-pcn'));
        var content = '';
        $(pcns).each(function(i, pcn) {
          var index = i+1;
          content += "<a href='"+ pcn['public_path'] + "'" + "target='_blank'>"+ index +". " + pcn['type'] +"</a><br>";
        });
        return content;
     },
  });   
});

