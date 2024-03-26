FROM ubuntu:latest as build

RUN apt-get update && \
    apt-get install -y openjdk-21-jdk && \
    apt-get install -y maven

COPY . .

RUN mvn clean install

FROM openjdk:21-slim

EXPOSE 8080

WORKDIR /app

COPY --from=build /app/target/server-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]