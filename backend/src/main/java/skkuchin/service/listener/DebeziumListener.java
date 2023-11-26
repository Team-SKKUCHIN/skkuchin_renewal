package skkuchin.service.listener;

import io.debezium.config.Configuration;
import io.debezium.data.Envelope.Operation;
import io.debezium.embedded.Connect;
import io.debezium.engine.DebeziumEngine;
import io.debezium.engine.RecordChangeEvent;
import io.debezium.engine.format.ChangeEventFormat;
import lombok.extern.slf4j.Slf4j;
import skkuchin.service.service.DebeziumService;

import org.apache.commons.lang3.tuple.Pair;
import org.apache.kafka.connect.data.Field;
import org.apache.kafka.connect.data.Struct;
import org.apache.kafka.connect.source.SourceRecord;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import static io.debezium.data.Envelope.FieldName.*;
import static java.util.stream.Collectors.toMap;

@Slf4j
@Component
public class DebeziumListener {
    private final Executor executor = Executors.newSingleThreadExecutor();
    private final DebeziumEngine<RecordChangeEvent<SourceRecord>> debeziumEngine;
    private final DebeziumService debeziumService;

    public DebeziumListener(
        Configuration debeziumConnectorConfiguration,
        DebeziumService debeziumService) {

        this.debeziumEngine = DebeziumEngine.create(ChangeEventFormat.of(Connect.class))
            .using(debeziumConnectorConfiguration.asProperties())
            .notifying(this::handleChangeEvent)
            .build();
        
        this.debeziumService = debeziumService;
    }

    private void handleChangeEvent(RecordChangeEvent<SourceRecord> sourceRecordRecordChangeEvent) {
        SourceRecord sourceRecord = sourceRecordRecordChangeEvent.record();

        log.info("Key = '" + sourceRecord.key() + "' value = '" + sourceRecord.value() + "'");

        Struct sourceRecordChangeValue= (Struct) sourceRecord.value();

        if (sourceRecordChangeValue != null) {
            Struct sourceStruct = (Struct) sourceRecordChangeValue.get(SOURCE);

            if (sourceStruct != null) {
                Operation operation = Operation.forCode((String) sourceRecordChangeValue.get(OPERATION));

                if (operation != Operation.READ) {
                    Struct struct = (Struct) sourceRecordChangeValue.get(AFTER);
                    Map<String, Object> payload = struct.schema().fields().stream()
                        .map(Field::name)
                        .filter(fieldName -> struct.get(fieldName) != null)
                        .map(fieldName -> Pair.of(fieldName, struct.get(fieldName)))
                        .collect(toMap(Pair::getKey, Pair::getValue));

                    String tableName = (String) sourceStruct.get("table");

                    if (tableName.equals("chat_message")) {
                        Long roomId = (Long) payload.get("chat_room_id");
                        debeziumService.handleRealtimeChatMessage(roomId, operation, payload);
                    } else if (tableName.equals("chat_room")) {
                        String roomId = (String) payload.get("room_id");
                        debeziumService.handleRealtimeChatRoom(roomId, operation, payload, sourceRecordChangeValue);
                    }
                }
            }
        }
    }

    @PostConstruct
    private void start() {
        this.executor.execute(debeziumEngine);
        log.info("Execute Debezium");
    }

    @PreDestroy
    private void stop() throws IOException {
        if (this.debeziumEngine != null) {
            log.info("Close Debezium");
            this.debeziumEngine.close();
        }
    }
}
