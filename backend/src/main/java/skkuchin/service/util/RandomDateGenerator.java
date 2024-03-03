package skkuchin.service.util;

import java.time.LocalDate;
import java.util.Random;

public class RandomDateGenerator {

    public static LocalDate getRandomDate() {
        LocalDate today = LocalDate.now();
        Random rand = new Random();
        
        int month = today.getMonthValue();
        int day = today.getDayOfMonth() + rand.nextInt(31 - today.getDayOfMonth()) + 1; // Random day within the current month
        
        LocalDate randomDate = LocalDate.of(today.getYear(), month, day);
        
        if (randomDate.isBefore(today)) {
            randomDate = today;
        }
        
        return randomDate;
    }
}
