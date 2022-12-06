// package dislinkt.postService.Config;

// import java.util.HashMap;
// import java.util.Map;

// import org.apache.kafka.clients.consumer.ConsumerConfig;
// import org.apache.kafka.common.serialization.StringDeserializer;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
// import org.springframework.kafka.core.ConsumerFactory;
// import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
// import org.springframework.kafka.support.serializer.JsonDeserializer;

// import dislinkt.coreService.Event.UserUpdateEvent;

// @Configuration
// public class KafkaConsumerConfig {
//     public Map<String, Object> userDeleteConfig() {
//         HashMap<String, Object> props = new HashMap<>();
//         props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
//         props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
//         props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
//         return props;
//     }

//     @Bean
//     public ConsumerFactory<String, String> userDeleteConsumerFactory() {
//         return new DefaultKafkaConsumerFactory<>(userDeleteConfig());
//     }

//     @Bean
//     public ConcurrentKafkaListenerContainerFactory<String, String> userDeleteKafkaListenerContainerFactory() {
//         ConcurrentKafkaListenerContainerFactory<String, String> factory =
//                 new ConcurrentKafkaListenerContainerFactory<>();
//         factory.setConsumerFactory(userDeleteConsumerFactory());
//         return factory;
//     }



//     public Map<String, Object> userUpdateConsumerConfig() {
//         HashMap<String, Object> props = new HashMap<>();
//         props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
//         props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
//         props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);
//         props.put(JsonDeserializer.USE_TYPE_INFO_HEADERS, false);
//         props.put(JsonDeserializer.VALUE_DEFAULT_TYPE, UserUpdateEvent.class);
//         return props;
//     }

//     @Bean
//     public ConsumerFactory<String, UserUpdateEvent> userUpdateConsumerFactory() {
//         return new DefaultKafkaConsumerFactory<>(userUpdateConsumerConfig());
//     }

//     @Bean
//     public ConcurrentKafkaListenerContainerFactory<String, UserUpdateEvent> userUpdateKafkaListenerContainerFactory() {
//         ConcurrentKafkaListenerContainerFactory<String, UserUpdateEvent> factory =
//                 new ConcurrentKafkaListenerContainerFactory<>();
//         factory.setConsumerFactory(userUpdateConsumerFactory());
//         return factory;
//     }
// }
