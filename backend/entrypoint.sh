#!/bin/sh

npm ci
npm run generate:i18nkeys
npm run db:migrate
npm run db:seed
npm run build
npm start