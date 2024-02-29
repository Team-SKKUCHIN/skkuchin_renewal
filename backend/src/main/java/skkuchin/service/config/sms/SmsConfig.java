package skkuchin.service.config.sms;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.service.DefaultMessageService;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SmsConfig {

    @Value("${nurigo.api.key}")
    private String apiKey;

    @Value("${nurigo.api.secret}")
    private String apiSecret;

    @Value("${nurigo.api.url}")
    private String apiUrl;

    @Bean
    public DefaultMessageService messageService() {
        return NurigoApp.INSTANCE.initialize(apiKey, apiSecret, apiUrl);
    }
}