FROM python:3.11-slim

# Install PostgreSQL client library
RUN pip install --no-cache-dir psycopg2-binary

# Copy data loading script from project root
COPY scripts/load-data-postgres.py /app/load-data-postgres.py
COPY docker/data-loader/entrypoint.sh /app/entrypoint.sh

RUN chmod +x /app/entrypoint.sh /app/load-data-postgres.py

WORKDIR /app

ENTRYPOINT ["/app/entrypoint.sh"]
