// package dislinkt.postService;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.kafka.annotation.KafkaListener;
// import org.springframework.stereotype.Component;

// import dislinkt.coreService.Event.UserUpdateEvent;
// import dislinkt.postService.Service.PostService;

// @Component
// public class KafkaListeners {
//     @Autowired
//     private PostService postService;

//     @KafkaListener(
//         topics = "user_delete",
//         groupId = "post_service",
//         containerFactory = "userDeleteKafkaListenerContainerFactory"
//     )
//     void userDeleteListener(String userId){
//         postService.deleteUserPosts(userId);
//         postService.deleteUserComments(userId);
//     }


//     @KafkaListener(
//         topics = "user_update",
//         groupId = "post_service",
//         containerFactory = "userUpdateKafkaListenerContainerFactory"
//     )
//     void userUpdateListener(UserUpdateEvent event){
//         postService.updateUserPosts(event.getId(), event.getUsername());
//     }
// }
