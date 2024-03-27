FROM maven:3.8.4-openjdk-11-slim AS build

COPY ./pom.xml /app/

WORKDIR /app

RUN mvn dependency:go-offline

COPY ./src /app/src

RUN mvn package -DskipTests

FROM openjdk:11-jre-slim

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]