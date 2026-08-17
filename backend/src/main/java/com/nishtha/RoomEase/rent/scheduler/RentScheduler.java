package com.nishtha.RoomEase.rent.scheduler;

import com.nishtha.RoomEase.rent.service.RentService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
public class RentScheduler {

    private final RentService rentService;
    private static final Logger log = LoggerFactory.getLogger(RentScheduler.class);


    @Scheduled(fixedRate = 120000)
    public void updateOverdueRents() {

        log.info("Starting updates on rent...");
        rentService.updateOverdueRents();
        log.info("Rent updates completed.");

    }

    @Scheduled(fixedRate = 60000)
    public void generateMonthlyRent() {
        log.info("Starting monthly rent generation...");
        rentService.generateMonthlyRent();
        log.info("Monthly rent generation completed.");
    }

}