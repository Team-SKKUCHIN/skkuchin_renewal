package skkuchin.service.service;

import static io.debezium.data.Envelope.FieldName.BEFORE;
import static java.util.stream.Collectors.toMap;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import javax.transaction.Transactional;

import org.apache.commons.lang3.tuple.Pair;
import org.apache.kafka.connect.data.Field;
import org.apache.kafka.connect.data.Struct;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import io.debezium.data.Envelope.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import nl.martijndwars.webpush.Subscription;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.Chat.ResponseType;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.dto.ChatMessageDto;
import skkuchin.service.dto.ChatRoomDto;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class DebeziumService {
    private final static String CHAT_EXCHANGE_NAME = "chat.exchange";
    private final ChatRoomService chatRoomService;
    private final ChatMessageService chatMessageService;
    private final PushTokenService pushTokenService;
    private final RabbitTemplate template;

    @Transactional
    public void handleRealtimeChatMessage(Long chatRoomId, Operation operation, Map<String, Object> payload) {
        ChatRoom chatRoom = chatRoomService.findChatById(chatRoomId);

        AppUser user1 = chatRoom.getUser1();
        AppUser user2 = chatRoom.getUser2();

        String roomId = chatRoom.getRoomId();

        String user1Name = null;
        String user2Name = null;

        List<ChatMessageDto.Response> chatMessages = chatMessageService.getAllMessage(chatRoom);
        ArrayList<ChatMessageDto.Response> chatMessageList = new ArrayList<>(chatMessages);

        if (user1 != null) {
            user1Name = user1.getUsername();
            List<ChatRoomDto.Response> chatRooms1 = chatRoomService.getChatRoomList(user1Name);
            template.convertAndSend(CHAT_EXCHANGE_NAME, "room." + user1Name + "chatRoomList", chatRooms1);
            template.convertAndSend(CHAT_EXCHANGE_NAME, "chat." + roomId + "user1", chatMessageList);
        }

        if (user2 != null) {
            user2Name = user2.getUsername();
            List<ChatRoomDto.Response> chatRooms2 = chatRoomService.getChatRoomList(user2Name);
            template.convertAndSend(CHAT_EXCHANGE_NAME, "room." + user2Name + "chatRoomList", chatRooms2);
            template.convertAndSend(CHAT_EXCHANGE_NAME, "chat." + roomId + "user2", chatMessageList);
        }

        if (operation == Operation.CREATE && !Objects.equals((String) payload.get("sender"), "admin")) {
            String sender = (String) payload.get("sender");
            AppUser user = null;

            String pushTitle = null;
            String pushMessage = (String) payload.get("message");
            Boolean chatPermit = null;

            if (Objects.equals(chatRoom.getUser1().getUsername(), sender)) {
                user = chatRoom.getUser2();
                chatPermit = chatRoom.isUser2Alarm();
                pushTitle = chatRoom.getUser1().getNickname();
            } else {
                user = chatRoom.getUser1();
                chatPermit = chatRoom.isUser1Alarm();
                pushTitle = chatRoom.getUser2().getNickname();
            }

            if (chatPermit) {
                Subscription subscription = pushTokenService.toSubscription(user, "chat");

                if (subscription != null && subscription.keys.auth != null) {
                    pushTokenService.sendNotification(subscription, pushTitle, pushMessage);
                }
            }
        }
    }

    @Transactional
    public void handleRealtimeChatRoom(
        String roomId,
        Operation operation,
        Map<String, Object> payload,
        Struct sourceRecordChangeValue
    ) {
        ChatRoom chatRoom = chatRoomService.findChatRoom(roomId);

        AppUser user1 = chatRoom.getUser1();
        AppUser user2 = chatRoom.getUser2();

        String userName1 = null;
        String userName2 = null;

        ChatRoomDto.settingResponse settingResponse = chatRoomService.getSettingResponse(chatRoom);

        if (user1 != null) {
            userName1 = user1.getUsername();
            List<ChatRoomDto.Response> chatRooms1 = chatRoomService.getChatRoomList(userName1);
            template.convertAndSend(CHAT_EXCHANGE_NAME, "room." + userName1 + "chatRoomList", chatRooms1);
            template.convertAndSend(CHAT_EXCHANGE_NAME, "setting." + roomId + "user1", settingResponse);
        }

        if (user2 != null) {
            userName2 = user2.getUsername();
            List<ChatRoomDto.Response> chatRooms2 = chatRoomService.getChatRoomList(userName2);
            template.convertAndSend(CHAT_EXCHANGE_NAME, "room." + userName2 + "chatRoomList", chatRooms2);
            template.convertAndSend(CHAT_EXCHANGE_NAME, "setting." + roomId + "user2", settingResponse);
        }

        if (operation == Operation.CREATE) {
            String pushTitle = "스꾸친";
            String pushMessage = "새로운 상대방이 밥약을 원합니다!";

            Subscription subscription = pushTokenService.toSubscription(user2, "chat");

            if (subscription != null && subscription.keys.auth != null) {
                pushTokenService.sendNotification(subscription, pushTitle, pushMessage);
            } else if (subscription != null) {
                List<String> phones = new ArrayList<>();
                phones.add(subscription.endpoint);
                pushTokenService.sendSMS(phones, "[스꾸친] " + pushMessage);
            }
        } else if (operation == Operation.UPDATE) {
            Struct beforeStruct = (Struct) sourceRecordChangeValue.get(BEFORE);
            Map<String, Object> beforePayload = beforeStruct.schema().fields().stream()
                .map(Field::name)
                .filter(fieldName -> beforeStruct.get(fieldName) != null)
                .map(fieldName -> Pair.of(fieldName, beforeStruct.get(fieldName)))
                .collect(toMap(Pair::getKey, Pair::getValue));
            
            String beforeResponse = (String) beforePayload.get("response");
            String afterResponse = (String) payload.get("response");
            
            if (
                beforeResponse.equals(ResponseType.HOLD.name())
                &&
                afterResponse.toString().equals(ResponseType.ACCEPT.name())
            ) {
                String pushTitle = "스꾸친";
                String pushMessage = "밥약이 성사되었습니다!";

                Subscription subscription = pushTokenService.toSubscription(user1, "chat");

                if (subscription != null && subscription.keys.auth != null) {
                    pushTokenService.sendNotification(subscription, pushTitle, pushMessage);
                }  else if (subscription != null) {
                    List<String> phones = new ArrayList<>();
                    phones.add(subscription.endpoint);
                    pushTokenService.sendSMS(phones, "[스꾸친] " + pushMessage);
                }
            }
        }
    }
}
