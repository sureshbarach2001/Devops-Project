# Dockerfile for MongoDB service
FROM mongo:latest

WORKDIR /data

EXPOSE 27017

CMD ["mongod"]
# The MongoDB service is the simplest of the four services. It uses the official 
# MongoDB image from Docker Hub. The WORKDIR instruction sets the working directory to /data. 
# The EXPOSE instruction exposes port 27017, which is the default port for MongoDB. The CMD 
# instruction starts the mongod process, which is the MongoDB daemon. This process listens 
# for incoming connections on port 27017.