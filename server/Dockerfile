FROM ubuntu:latest as build

RUN apt-get update
RUN apt-get install openjdk-21-jdk -y

COPY . .

ARG DATABASE_URL
ARG SECRET

ENV DATABASE_URL=${DATABASE_URL}

ENV SECRET=${SECRET}

RUN apt-get install maven -y
RUN mvn clean install

FROM openjdk:21-slim

EXPOSE 8080

COPY --from=build /target/server-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT [ "java", "-jar", "app.jar" ]