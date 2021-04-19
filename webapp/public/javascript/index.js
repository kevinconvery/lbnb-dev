$(() => {
  getAllListings().then(function( json ) {
    propertyListings.addProperties(json.properties);
    views_manager.show('listings');
    // new!
    // have to wait until they're added to add the listeners
    const listings = $('#property-listings').children();
    for (let i = 0; i < listings.length; i++) {
      $(listings[i]).on('click', '.reserve-button', function() {
        const idSelector = $(this).attr('id');
        console.log(idSelector);
        const idData = $(this).attr('id').substring(17);
        views_manager.show('newReservation', idData);
      })
    }
  });
});