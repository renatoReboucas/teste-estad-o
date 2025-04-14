FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache yarn

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn prisma generate

# Remove database operations from build time
# RUN yarn prisma migrate deploy
# RUN yarn prisma db seed

RUN yarn build

# Add this line to verify the build output
RUN ls -la dist/

EXPOSE 3336

# Run migrations and seed at runtime
CMD sh -c "yarn prisma migrate deploy && yarn prisma db seed && node dist/src/main.js"