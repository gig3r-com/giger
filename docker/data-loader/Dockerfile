FROM alpine:3.19

# Install curl and jq for API calls
RUN apk add --no-cache curl jq bash

# Copy the loader script
COPY load-on-startup.sh /usr/local/bin/load-on-startup.sh
RUN chmod +x /usr/local/bin/load-on-startup.sh

# Run the loader script
CMD ["/usr/local/bin/load-on-startup.sh"]
