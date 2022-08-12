# Orbiter8 BobaBeam Bridge Demo image builder. JS client in /var/www/client, EVM code in /evm
# Only /var/www/client has `composer/npm istall` run against it.


# Build Stage 1: NPM Install to generate assets
# Latest Node.js LTS version as of 2022.03.22: 16.14.2
FROM node:17.9-alpine AS node_npm
WORKDIR /var/www/client
COPY --from=composer /var/www/ /var/www/

# The JS Client requires ABI and address JSON artifacts for the EVM Contracts
# TODO: After EVM integration to client, once whitelisted with Boba
COPY ./evm/artifacts/contracts/MultiverseShip.sol /var/www/evm/artifacts/contracts/MultivereShip.sol/MultivereShip.json
COPY ./evm/artifacts/contracts/MultiverseShip.L1.sol /var/www/evm/artifacts/contracts/MultivereShip.sol/MultiverseShip.L1.sol
COPY ./evm/artifacts/contracts/MultiverseShip.L2.sol /var/www/evm/artifacts/contracts/MultivereShip.sol/MultivereShip.L2.json
COPY ./evm/addresses/published-addresses.json /var/www/evm/addresses/published-addresses.json

# Vite Build
RUN npm config set depth 0 && \
    npm install --silent --no-progress && \
    (vue-tsc --noEmit && vite build) && \
    rm -rf node_modules

# Build Stage 3: Final image, without unneeded components
# Base image from https://github.com/Partavate-Studios/nginx-php-fpm
FROM registry.gitlab.com/partavate/infrastructure/nginx-php-fpm:php81

COPY ./deployment/nginx.conf /etc/nginx/conf.d/Bobabeam-dema.conf
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copy Assets to the final image
COPY --from=node_npm /var/www/client/public /var/www/client/public
