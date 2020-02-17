/*
    By Osvaldas Valutis, www.osvaldas.info
    Available for use under the MIT License
*/

'use strict';

;( function ( document, window, index )
{
    var inputs = document.querySelectorAll( '.inputfile' );
    Array.prototype.forEach.call( inputs, function( input )
    {
        var label    = input.nextElementSibling,
            labelVal = label.innerHTML;

        input.addEventListener( 'change', function( e )
        {
            var fileName = '';
            if( this.files && this.files.length > 1 )
                fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
            else
                fileName = e.target.value.split( '\\' ).pop();

            if( fileName )
                label.querySelector( 'span' ).innerHTML = fileName;
            else
                label.innerHTML = labelVal;
        });

        // Firefox bug fix
        input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
        input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });
    });
}( document, window, 0 ));

/* Source - http://www.abeautifulsite.net/whipping-file-inputs-into-shape-with-bootstrap-3/ */

$(document).on('change', '.btn-file :file', function() {
    var $input = $(this),
        numFiles = $input.get(0).files ? $input.get(0).files.length : 1,
        label = $input.val().replace(/\\/g, '/').replace(/.*\//, '');
    $('.btn-file-label').html('Selected: ' + label);
    $input.trigger('fileselect', [numFiles, label]);
});
