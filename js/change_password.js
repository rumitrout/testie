

function submit_password(){
    $('.change-password-button').click(function() {
     var old_password = $('#old_password').val();
     var new_password = $('#new_password').val();
     var repeat_new_password = $('#re_enter_new_password').val();
      
     if(new_password == repeat_new_password){

     var url="/api/change_password";
     var data = { 
                  "token" : localStorage.u_token,
                  "current_password" : old_password,
                  "new_password" : repeat_new_password
        };
     $.post(url, data)
        .done(function(response) {
            if(response && response.status) {
                if(response.status == 'success') {
                    $('#password_status_text').html('Password change successfully.');
                     window.location = '/user/profile';
                        return;
                }
                else if(response.status == 'error_old_password') {
                	$('#password_status_text').html('Current Password is not correct.');
                	}
                else if(response.status == 'error_new_password') {
                    $('#password_status_text').html('New Password is not correct.');
                }
               
            }

        })
       }
       else{
       	    $('#password_status_text').html('New Password and Re-enter Password should be Same.');
       }
    });
}

$(function() {
    // store_password();
    submit_password();
});
