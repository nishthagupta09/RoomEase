package com.nishtha.RoomEase.property.specification;

import com.nishtha.RoomEase.common.enums.GenderType;
import com.nishtha.RoomEase.property.entity.Property;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;

public class PropertySpecification {

    public static Specification<Property> hasKeyword(String keyword) {

        return (root, query, cb) -> {

            if (keyword == null || keyword.isBlank()) {
                return cb.conjunction();
            }

            String pattern = "%" + keyword.toLowerCase() + "%";

            return cb.or(

                    cb.like(
                            cb.lower(root.get("propertyName")),
                            pattern
                    ),
                    cb.like(
                            cb.lower(root.get("city")),
                            pattern
                    ),
                    cb.like(
                            cb.lower(root.get("state")),
                            pattern
                    )
            );
        };
    }

    public static Specification<Property> hasCity(String city) {

        return (root, query, cb) -> {
            if (city == null || city.isBlank()) {
                return cb.conjunction();
            }
            return cb.equal(
                    cb.lower(root.get("city")),
                    city.toLowerCase()
            );
        };
    }

    public static Specification<Property> hasGender(GenderType genderType) {
        return (root, query, cb) -> {
            if (genderType == null) {
                return cb.conjunction();
            }
            return cb.equal(
                    root.get("genderType"),
                    genderType
            );
        };
    }

    public static Specification<Property> hasRentRange(
            BigDecimal minRent,
            BigDecimal maxRent
    ) {

        return (root, query, cb) -> {

            Predicate predicate = cb.conjunction();

            // Property must have some rent >= user's minimum
            if (minRent != null) {

                predicate = cb.and(
                        predicate,
                        cb.greaterThanOrEqualTo(
                                root.get("maxRent"),
                                minRent
                        )
                );
            }

            // Property must have some rent <= user's maximum
            if (maxRent != null) {

                predicate = cb.and(
                        predicate,
                        cb.lessThanOrEqualTo(
                                root.get("minRent"),
                                maxRent
                        )
                );
            }

            return predicate;
        };
    }
}
