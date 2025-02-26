#!/bin/bash
echo -e "Starting health check for Docker services..."
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'
if [ ! "$(docker-compose ps -q)" ]; then
    echo -e "${RED}Error: No running services found. Ensure 'docker-compose up' is running.${NC}"
    exit 1
fi
check_container() {
    local service_name=$1
    local container_id=$(docker-compose ps -q $service_name)
    if [ -z "$container_id" ]; then
        echo -e "${RED}$service_name: Not running${NC}"
    else
        local status=$(docker inspect --format='{{.State.Status}}' $container_id)
        if [ "$status" = "running" ]; then
            echo -e "${GREEN}$service_name: $status${NC}"
        else
            echo -e "${RED}$service_name: $status${NC}"
        fi
    fi
}
echo -e "Checking container statuses..."
check_container "backend"
check_container "frontend"
check_container "socket"
check_container "mongodb"
echo -e "Testing MongoDB connectivity..."
if docker exec $(docker-compose ps -q mongodb) mongosh --eval "db.runCommand({ ping: 1 })" > /dev/null 2>&1; then
    echo -e "${GREEN}MongoDB: Responding to ping${NC}"
else
    echo -e "${RED}MongoDB: Failed to respond${NC}"
fi
echo -e "Health check complete."