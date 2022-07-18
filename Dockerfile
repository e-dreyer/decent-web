# Dockerfile

FROM node:16-alpine

# Create the working directory
RUN mkdir -p /app
WORKDIR /app

# Copy package.json
COPY package*.json /app

# Install
RUN yarn 

# Copy files
COPY . /app

# Expose the ports
ENV PORT 3000

# Run the setup commands
RUN yarn prisma generate
RUN yarn format
RUN yarn lint:fix

CMD [ "yarn", "dev"]