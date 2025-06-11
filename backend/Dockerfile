FROM maven:3-openjdk-17 AS build

WORKDIR /app

COPY pom.xml ./
COPY src ./src

RUN mvn dependency:go-offline
RUN mvn -B clean package -DskipTests

FROM openjdk:17-jdk-slim

WORKDIR /app

COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar /app/target/backend-0.0.1-SNAPSHOT.jar

CMD ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]