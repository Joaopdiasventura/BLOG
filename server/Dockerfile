FROM ubuntu:latest as build

RUN apt-get update && \
    apt-get install -y wget && \
    wget https://download.java.net/java/early_access/jdk21/21/GPL/openjdk-21_linux-x64_bin.tar.gz && \
    mkdir -p /usr/lib/jvm/java-21-openjdk-amd64 && \
    tar xvf openjdk-21_linux-x64_bin.tar.gz -C /usr/lib/jvm/java-21-openjdk-amd64 --strip-components=1 && \
    update-alternatives --install /usr/bin/java java /usr/lib/jvm/java-21-openjdk-amd64/bin/java 100 && \
    update-alternatives --install /usr/bin/javac javac /usr/lib/jvm/java-21-openjdk-amd64/bin/javac 100 && \
    rm openjdk-21_linux-x64_bin.tar.gz

WORKDIR /app

COPY . .

RUN apt-get install -y maven && \
    mvn clean install

FROM openjdk:11-slim

EXPOSE 8080

WORKDIR /app

COPY --from=build /app/target/server-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]