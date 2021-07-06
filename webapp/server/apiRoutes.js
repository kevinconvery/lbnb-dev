module.exports = function(router, database) {

  // get all properties
  router.get('/properties', (req, res) => {
    database.getAllProperties(req.query, 20)
    .then(properties => res.send({properties}))
    .catch(e => {
      console.error(e);
      res.send(e)
    }); 
  });

  // get fulfilled reservations
  router.get('/reservations', (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.error("💩");
      return;
    }
    database.getFulfilledReservations(userId)
    .then(reservations => res.send({reservations}))
    .catch(e => {
      console.error(e);
      res.send(e)
    });
  });

  // Get upcoming reservations
  router.get('/reservations/upcoming', (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.error("💩");
      return;      
    }
    database.getUpcomingReservations(userId)
    .then(reservations => res.send({ reservations }))
    .catch(e => {
      console.error(e);
      res.send(e);
    })
  })

  // Route to get an individual reservation
  router.get('/reservations/:reservation_id', (req, res) => {
    const reservationId = req.params.reservation_id;
    database.getIndividualReservation(reservationId)
    .then(reservation => res.send(reservation))
    .catch(e => {
      console.error(e);
      res.send(e);
    })
  })

  // Add a new property
  router.post('/properties', (req, res) => {
    const userId = req.session.userId;
    database.addProperty({...req.body, owner_id: userId})
      .then(property => {
        res.send(property);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  // Create a new reservation

  // Relates to the LighthouseBNB Make a Reservation activity:

  // Create an API call, route and database query to complete the insert reservation functionality
  router.post('/reservations', (req, res) => {
    const userId = req.session.userId;
    if (userId) {
      database.addReservation({...req.body, guest_id: userId})
      .then(reservation => {
        res.send(reservation)
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      })
    } 
  })

  // update an existing reservation

  // Relates to the Modify or Delete a Reservation activity

  // Add appropriate API routes and queries to handle update and delete functionality
  router.post('/reservations/:reservationId', (req, res) => {
    const reservationId = req.params.reservationId;
    database.updateReservation({...req.body, reservation_id: reservationId})
    .then(reservation => {
      res.send(reservation)
    })
  })

  // delete a reservation

  // Relates to the Modify or Delete a Reservation activity

  // Add appropriate API routes and queries to handle update and delete functionality
  router.delete('/reservations/:reservationId', (req, res) => {
    const reservationId = req.params.reservationId;
    database.deleteReservation(reservationId);
  })

  // get reviews by property

  // Used in the Add Reviews for Reservation requirement; will send the data to show the reviews by
  // property id.
  router.get('/reviews/:propertyId', (req, res) => {
    const propertyId = req.params.propertyId
    database.getReviewsByProperty(propertyId)
    .then(reviews => {
      res.send(reviews);
    })
  })

  // Add a review for a specific reservation
  // Used in the Add Reviews for Reservation requirement; this adds a review for a specific reservation.
  router.post('/reviews/:reservationId', (req, res) => {
    const reservationId = req.params.reservationId;
    database.addReview({...req.body})
    .then(review => {
      res.send(review);
    })
  })

  return router;
}