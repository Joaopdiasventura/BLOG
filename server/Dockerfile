FROM maven:3.8.4-openjdk-17 AS build

COPY ./pom.xml /app/

WORKDIR /app

RUN mvn dependency:go-offline

COPY ./src /app/src

RUN mvn package -DskipTests

FROM openjdk:17-jre-slim

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]