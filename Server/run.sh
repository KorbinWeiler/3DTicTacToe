#!/bin/sh
set -e

# Retry running migrations until the DB is ready, then start the server
MAX_RETRIES=30
COUNT=0

echo "Waiting for database and running migrations..."
until npm run migrate; do
  COUNT=$((COUNT+1))
  if [ "$COUNT" -ge "$MAX_RETRIES" ]; then
    echo "Migration failed after $COUNT attempts; exiting."
    exit 1
  fi
  echo "Migration attempt $COUNT failed, retrying in 2s..."
  sleep 2
done

echo "Migrations complete; starting server"
exec npm run start:prod
