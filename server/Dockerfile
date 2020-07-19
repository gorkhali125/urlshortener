FROM node:12-alpine

WORKDIR /app
RUN apk add bash && apk update

ENV HOST=127.0.0.1
ENV PORT=8091

ENV DB_NAME=urlshortener
ENV DB_USER=root
ENV DB_PASS=pass
ENV DB_PORT=27017

ENTRYPOINT ["sh"]
CMD ["entrypoint.sh"]