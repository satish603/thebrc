FROM openjdk:17-jdk-alpine
COPY rest-1.jar rest-1.jar
EXPOSE 8080
CMD ["java", "-jar", "rest-1.jar"]