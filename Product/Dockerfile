FROM python:3.11-slim

WORKDIR /code

COPY requirements.txt .

RUN pip install -U pip
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8001

CMD ["ucicorn", "Product.asgi:application", "--host","0.0.0.0", "--port", "8001"]
