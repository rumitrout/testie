$(function() {
    $('.form-confirmation').submit(function(e) {
        let confirmation_text = $(this).attr('data-confirmation-text');
        confirmation_text = confirmation_text || 'Are you sure?';
        if(confirm(confirmation_text)) {
            $(this).find('.hidden-confirmation').val(1);
            return true;
        }
        else {
            e.preventDefault();
            return false;
        }
    });

    $('.link-confirmation').click(function(e) {
        let confirmation_text = $(this).attr('data-confirmation-text');
        confirmation_text = confirmation_text || 'Are you sure?';
        if(confirm(confirmation_text)) {
            return true;
        }
        else {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    });

    $('.prompt-confirmation').click(function(e) {
        let prompt_word = $(this).attr('data-prompt-word');
        if(!prompt_word) {
            prompt_word = $(this).text() || 'CONFIRM';
            prompt_word = prompt_word.trim().toUpperCase();
            if(prompt_word.length > 15) {
                prompt_word = prompt_word.substring(0, 15);
            }
        }
        let confirmation_text = $(this).attr('data-confirmation-text');
        let prompt_text = 'Please enter "' + prompt_word + '" to proceed';
        if(confirmation_text) {
            prompt_text = confirmation_text + "\n" + prompt_text;
        }
        if(prompt(prompt_text) == prompt_word) {
            return true;
        }
        else {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    });

});
