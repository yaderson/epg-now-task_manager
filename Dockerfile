FROM node:14-alpine
WORKDIR /epg-now-task_manager
# ENV NODE_ENV=production
COPY . .
RUN npm install
CMD ["npm", "start"]