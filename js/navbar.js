function setup_navbar() {

            $('.navbar li').click(function() {
            $('.navbar li').removeClass('active');
            var $this = $(this);
            if (!$this.hasClass('active')) {
                $this.addClass('active');
            }
       
        });         

}
$(function() { 
    
    setup_navbar();
 });