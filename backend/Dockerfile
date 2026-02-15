#

FROM python:3.10.19

LABEL authors="boian"

#
WORKDIR /app/backend

#
RUN pip install --no-cache-dir flask

#

RUN pip install --no-cache-dir flask_jwt_extended

#

RUN pip install --no-cache-dir gunicorn

#

RUN pip install --no-cache-dir pymongo

#
COPY .. .

#
EXPOSE 8000

# Avvio con Gunicorn (4 worker per gestire più richieste)
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:8000", "app:create_app()"]