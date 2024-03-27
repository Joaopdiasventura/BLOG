FROM openjdk:11-jre-slim

WORKDIR /app

COPY ./server/target/classes /app

EXPOSE 8080

CMD ["java", "-cp", "./*", "com.server.ServerApplication"]