// package skkuchin.service.config.chat;

// import com.auth0.jwt.JWT;
// import com.auth0.jwt.JWTVerifier;
// import com.auth0.jwt.algorithms.Algorithm;
// import com.auth0.jwt.interfaces.DecodedJWT;
// import lombok.RequiredArgsConstructor;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.messaging.Message;
// import org.springframework.messaging.MessageChannel;
// import org.springframework.messaging.simp.config.ChannelRegistration;
// import org.springframework.messaging.simp.config.MessageBrokerRegistry;
// import org.springframework.messaging.simp.stomp.StompCommand;
// import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
// import org.springframework.messaging.support.ChannelInterceptor;
// import org.springframework.messaging.support.MessageHeaderAccessor;
// import org.springframework.util.AntPathMatcher;
// import
// org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
// import
// org.springframework.web.socket.config.annotation.StompEndpointRegistry;
// import
// org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
// import skkuchin.service.service.ChatSessionService;

// @Configuration
// @RequiredArgsConstructor
// @EnableWebSocketMessageBroker
// public class ChatConfig implements WebSocketMessageBrokerConfigurer {
// private final ChatErrorHandler chatErrorHandler;
// private final ChatSessionService chatSessionService;

// @Value("${rabbitmq.host}")
// private String host;
// @Value("${stomp.port}")
// private int port;
// @Value("${rabbitmq.username}")
// private String username;
// @Value("${rabbitmq.password}")
// private String password;

// @Override
// public void registerStompEndpoints(StompEndpointRegistry registry) {
// registry.addEndpoint("/ws/chat").setAllowedOriginPatterns("*").withSockJS();
// //에러 핸들링
// registry.setErrorHandler(chatErrorHandler);
// }

// @Override
// public void configureMessageBroker(MessageBrokerRegistry registry) {
// registry.setPathMatcher(new AntPathMatcher("."));
// registry.setApplicationDestinationPrefixes("/app");
// registry.setPreservePublishOrder(true);
// registry.enableStompBrokerRelay("/queue", "/topic", "/exchange",
// "/amq/queue")
// .setRelayHost(host)
// .setRelayPort(port)
// .setClientLogin(username)
// .setClientPasscode(password);
// }

// @Override
// public void configureClientInboundChannel(ChannelRegistration registration) {
// registration.interceptors(new ChannelInterceptor() {
// @Override
// public Message<?> preSend(Message<?> message, MessageChannel channel) {

// StompHeaderAccessor accessor =
// MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
// System.out.println(accessor);

// if (accessor.getCommand().equals(StompCommand.SUBSCRIBE)) {
// System.out.println(accessor.getCommand());
// String sessionId = accessor.getSessionId();
// String token = accessor.getFirstNativeHeader("pushToken");
// String username = getUserNameFromJwt(token);

// if (chatSessionService.findSession(sessionId) != null) {
// chatSessionService.updateSessionId(sessionId, username);
// } else {
// chatSessionService.setSessionId(sessionId, username);
// }
// }

// else if (accessor.getCommand().equals(StompCommand.DISCONNECT)) {
// System.out.println(accessor.getCommand());
// String sessionId = (String) message.getHeaders().get("simpSessionId");
// System.out.println("sessionId: " + sessionId);

// if (chatSessionService.findSession(sessionId) != null) {
// chatSessionService.deleteSession(sessionId);
// }
// }
// return message;
// }
// });
// }

// public String getUserNameFromJwt(String jwt){
// Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
// JWTVerifier verifier = JWT.require(algorithm).build();

// DecodedJWT decodedJWT = verifier.verify(jwt);
// String username = decodedJWT.getSubject();
// return username;
// }
// }
