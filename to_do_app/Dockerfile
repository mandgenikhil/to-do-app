FROM python:3

ENV PYTHONUNBUFFERED 1
WORKDIR /src/to_do_app

COPY ./ /src/to_do_app
RUN pip install -r requirements.txt
CMD ["/bin/bash"]