// package skkuchin.service.config.chat;

// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;

// import java.io.IOException;

// @Configuration
// public class DebeziumConfig {

// @Value("${debezium.database.hostname}")
// private String hostname;

// @Value("${debezium.database.port}")
// private String port;

// @Value("${debezium.database.user}")
// private String user;

// @Value("${debezium.database.password}")
// private String password;

// @Bean
// public io.debezium.config.Configuration debezuimConnectorConfiguration()
// throws IOException {
// return io.debezium.config.Configuration.create()
// .with("name", "debezium-mysql-connector")
// .with("connector.class", "io.debezium.connector.mysql.MySqlConnector")
// .with("offset.storage",
// "org.apache.kafka.connect.storage.FileOffsetBackingStore")
// .with("offset.storage.file.filename", "/tmp/offsets.dat")
// .with("offset.flush.interval.ms", "60000")
// .with("database.hostname", this.hostname)
// .with("database.port", this.port)
// .with("database.user", this.user)
// .with("database.password", this.password)
// .with("database.dbname", "service")
// .with("database.include.list", "service")
// .with("table.include.list", "service.chat_message, service.chat_room")
// .with("include.schema.changes", "false")
// .with("database.server.id", "184054")
// .with("database.server.name", "debezium-mysql-db-server")
// .with("database.history",
// "io.debezium.relational.history.FileDatabaseHistory")
// .with("database.history.file.filename", "/tmp/dbhistory.dat")
// .build();
// }
// }