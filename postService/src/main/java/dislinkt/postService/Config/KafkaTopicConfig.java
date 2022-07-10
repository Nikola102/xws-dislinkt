package dislinkt.postService.Config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.config.TopicBuilder;

public class KafkaTopicConfig {
    @Bean
    public NewTopic userDeleteTopic(){
        return TopicBuilder.name("user_delete").build();
    }

    @Bean
    public NewTopic userUpdateTopic(){
        return TopicBuilder.name("user_update").build();
    }
}
