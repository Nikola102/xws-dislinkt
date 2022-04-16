FROM openjdk:11-jre-slim
ADD target/user-service-docker.jar user-service-docker.jar
ENTRYPOINT ["java", "-jar", "/user-service-docker.jar"]