FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7

# Set environment varibles
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY . /code

WORKDIR /code/
RUN pip3 install pipenv
RUN pip3 install -r requirements.txt

# CMD ["python", "uvicorn"]
