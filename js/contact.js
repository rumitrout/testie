
function setup_contact() {

    $('#contact_form').submit(function(e) {
        e.preventDefault();
        if(localStorage.getItem("last_visited_part_id")) {
            $('input[name="last_visited_part_id"]').val(localStorage.getItem("last_visited_part_id"));
        }
        var $form = $(this);
        var data = $form.serialize();
        $('#status_text').html('Sending..');
        $('#contact_form button').prop('disabled', true);
        $('#contact_form input').prop('disabled', true);
        var url = '/api/contact';
        $.post(url, data)
        .done(function(response) {
            if(response && response.status) {
                if(response.status == 'success') {
                    $('#status_text').html('Message Sent Successfully.');
                    return;
                }
            }
            $('#status_text').html('Error Sending Message. Kindly send an email to us.');
        })
        .fail(function(err) {
            $('#status_text').html('Error Sending Message. Kindly send an email to us.');
        });
        return false;
    });
}

$(function() {
    setup_contact();
});

