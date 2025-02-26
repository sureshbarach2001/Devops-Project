#!/bin/bash
echo -e "Starting log analysis for Docker services..."
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'
if [ ! "$(docker-compose ps -q)" ]; then
    echo -e "${RED}Error: No running services found. Ensure 'docker-compose up' is running.${NC}"
    exit 1
fi
SERVICES="backend frontend socket mongodb"
ERROR_KEYWORDS="fail|exception|crash"
WARNING_KEYWORDS="warning|timeout"
TEMP_LOG="/tmp/docker_log_analysis_$$.log"
analyze_logs() {
    local service_name=$1
    echo -e "Analyzing logs for $service_name..."
    docker-compose logs --tail=100 $service_name > $TEMP_LOG 2>/dev/null
    local error_count=$(grep -Ei "$ERROR_KEYWORDS" $TEMP_LOG | wc -l)
    if [ "$error_count" -gt 0 ]; then
        echo -e "${RED}$service_name: Found $error_count error(s)${NC}"
        grep -Ei "$ERROR_KEYWORDS" $TEMP_LOG | tail -n 5
    else
        echo -e "${GREEN}$service_name: No errors found${NC}"
    fi
    local warning_count=$(grep -Ei "$WARNING_KEYWORDS" $TEMP_LOG | wc -l)
    if [ "$warning_count" -gt 0 ]; then
        echo -e "${YELLOW}$service_name: Found $warning_count warning(s)${NC}"
        grep -Ei "$WARNING_KEYWORDS" $TEMP_LOG | tail -n 5
    fi
    echo -e "----------------------------------------"
}
for service in $SERVICES; do
    analyze_logs $service
done
rm -f $TEMP_LOG
echo -e "Log analysis complete."