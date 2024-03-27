FROM ubuntu:latest as build

RUN apt-get update 
RUN apt-get install openjdk-21-jdk -y

COPY . .

RUN apt-get install maven -y
RUN mvn clean install

FROM openjdk:21-slim

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]