# Etapa 1: build da aplicação
FROM node:20-alpine AS builder

WORKDIR /app

# Copia os arquivos de dependência
COPY package.json yarn.lock ./
RUN yarn install

COPY . .

COPY .env.production .env

RUN yarn build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app ./
RUN yarn install --production

EXPOSE 3000

CMD ["yarn", "start"]