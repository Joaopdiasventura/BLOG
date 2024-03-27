FROM openjdk:11-jre-slim

WORKDIR /app

COPY ./server/target/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]