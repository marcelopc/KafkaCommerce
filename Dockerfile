FROM node:latest as base

RUN npm update && npm i -g pnpm