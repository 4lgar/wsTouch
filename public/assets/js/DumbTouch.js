window.addEventListener( 'touchstart', function( event ) {

  console.log("touchstart from dumb listner");

  window.addEventListener( 'touchmove', onTouchMove, false );
  window.addEventListener( 'touchend', onTouchEnd, false );  

});

function onTouchMove( event ) {

  console.log("touchmove from dumb listner");

}

function onTouchEnd( event ) {

  console.log('touch ended from dumb listner');

  window.removeEventListener( 'touchmove', onTouchMove, false );
  window.removeEventListener( 'touchend', onTouchEnd, false );

}
