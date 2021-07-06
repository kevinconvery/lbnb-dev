function getMyDetails() {
  return $.ajax({
    url: "/users/me",
  });
}

function logOut() {
  return $.ajax({
    method: "POST",
    url: "/users/logout",
  })
}

function logIn(data) {
  return $.ajax({
    method: "POST",
    url: "/users/login",
    data
  });
}

function signUp(data) {
  return $.ajax({
    method: "POST",
    url: "/users",
    data
  });
}

function getAllListings(params) {
  let url = "/api/properties";
  if (params) {
    url += "?" + params;
  }
  return $.ajax({
    url,
  });
}

// Separated into fulfilled and upcoming to implement reservation functionality
// Used in Make a Reservation and Modify and Delete a Reservation
function getFulfilledReservations() {
  let url = "/api/reservations";
  return $.ajax({
    url,
  });
}

function getUpcomingReservations() {
  let url = "/api/reservations/upcoming";
  return $.ajax({
    url,
  });
}

function getIndividualReservation(reservationId) {
  let url = `/api/reservations/${reservationId}`
  return $.ajax({
    url,
  })
}

const submitProperty = function(data) {
  return $.ajax({
    method: "POST",
    url: "/api/properties",
    data,
  });
}

// new for submit reservation functionality
const submitReservation = function(data) {
  return $.ajax({
    method: "POST",
    url: "/api/reservations",
    data,
  })
}

// Below, the update and delete reservation AJAX functionality used in 
// the Modify and Delete a Reservation requirement

// Update an existing reservation
const updateReservation = function(data) {
  return $.ajax({
    method: "POST",
    url: `/api/reservations/${data.reservation_id}`,
    data,
  })
}

// Delete a reservation
const deleteReservation = function(id) {
  return $.ajax({
    method: "DELETE",
    url: `/api/reservations/${id}`
  })
}

// below functions used in the Add Reviews for Reservation requirement

// getting all reviews by property:
const getReviewsByProperty = function(propertyId) {
  const url = `api/reviews/${propertyId}`;
  return $.ajax({
    url,
  });
}

// submits a new review
const submitReview = function(data) {
  return $.ajax({
    method: "POST",
    url: `api/reviews/${data.reservationId}`,
    data,
  })
}