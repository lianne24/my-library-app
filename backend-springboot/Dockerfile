# ---------- Build stage ----------
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Cache deps first
COPY pom.xml .
RUN mvn -q -DskipTests dependency:go-offline

# Build
COPY src ./src
RUN mvn -q -DskipTests package

# ---------- Runtime stage ----------
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
# Copy the fat jar (adjust name pattern if needed)
COPY --from=build /app/target/*SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]