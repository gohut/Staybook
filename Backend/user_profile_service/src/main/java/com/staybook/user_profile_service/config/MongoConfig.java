package com.staybook.user_profile_service.config;

import com.mongodb.ConnectionString;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.core.SimpleMongoClientDatabaseFactory;

@Configuration
public class MongoConfig {

    @Bean
    @Primary
    public MongoDatabaseFactory mongoDatabaseFactory(
            @Value("${spring.data.mongodb.uri:}") String uri,
            @Value("${spring.data.mongodb.host:localhost}") String host,
            @Value("${spring.data.mongodb.port:27017}") int port,
            @Value("${spring.data.mongodb.database:}") String database) {

        String db = database == null ? "" : database.trim();
        String resolvedUri = uri;
        if (resolvedUri == null || resolvedUri.isBlank()) {
            if (db.isBlank()) {
                db = "staybookUserProfile";
            }
            resolvedUri = "mongodb://" + host + ":" + port + "/" + db;
        }

        ConnectionString connectionString = new ConnectionString(resolvedUri);
        if (db.isBlank()) {
            String uriDb = connectionString.getDatabase();
            if (uriDb != null && !uriDb.isBlank()) {
                db = uriDb;
            }
        }
        if (db.isBlank()) {
            db = "staybookUserProfile";
        }

        MongoClient client = MongoClients.create(connectionString);
        return new SimpleMongoClientDatabaseFactory(client, db);
    }
}
