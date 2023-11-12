FROM python:3.11-bookworm

# RUN apt update \
#     && apt install -y \
#         build-dep \
#         python-psycopg2 \
#     && rm -rf /var/lib/apt/lists/*

RUN pip install psycopg2-binary

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

CMD ["python3", "app.py"]

CMD ["flask", "db", "upgrade"]