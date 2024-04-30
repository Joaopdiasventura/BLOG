FROM ubuntu:latest as build

RUN apt-get update
RUN apt-get install openjdk-21-jdk -y

COPY . .

RUN apt-get install maven -y
RUN mvn clean install

ARG DATABASE_URL

ENV DATABASE_URL=${DATABASE_URL}

FROM openjdk:21-slim

EXPOSE 8080

COPY --from=build /target/server-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT [ "java", "-jar", "app.jar" ]