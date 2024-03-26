FROM ubuntu:latest as build

RUN apt-get update && apt-get install -y openjdk-11-jdk

WORKDIR /app

COPY . .

RUN apt-get install -y maven && mvn clean install

FROM openjdk:11-slim

EXPOSE 8080

WORKDIR /app

COPY --from=build /app/target/server-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]