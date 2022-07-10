FROM openjdk:11-jre-slim
ADD target/joberty-service-docker.jar joberty-service-docker.jar
ENTRYPOINT ["java", "-jar", "/joberty-service-docker.jar"]