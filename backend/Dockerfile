FROM python:3.8.13
RUN pip install pipenv==2022.7.4
WORKDIR /app/
COPY apt-requirements.txt .
RUN apt-get update && cat ./apt-requirements.txt | xargs apt-get install -y
COPY Pipfile .
COPY Pipfile.lock .
RUN pipenv install --system
COPY . .
RUN python manage.py collectstatic --no-input
CMD bash run.sh
