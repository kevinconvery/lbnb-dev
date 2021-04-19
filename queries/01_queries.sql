-- SELECT properties.*, avg(property_reviews.rating) 
-- FROM properties
-- JOIN property_reviews ON properties.id = property_reviews.property_id
-- GROUP BY properties.id, property_reviews.property_id
-- LIMIT 10;

-- SELECT avg(rating) as average_rating from property_reviews WHERE property_id = 1;

SELECT properties.id, avg(property_reviews.rating) AS average_rating
FROM properties
JOIN property_reviews ON properties.id = property_reviews.property_id
GROUP BY properties.id
LIMIT 10;