FROM openjdk:11-jre-slim
ADD target/post-service-docker.jar post-service-docker.jar
ENTRYPOINT ["java", "-jar", "/post-service-docker.jar"]