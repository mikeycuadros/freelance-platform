#!/bin/sh
set -e

JWT_PATH=/var/www/html/config/jwt
PRIVATE_KEY=$JWT_PATH/private.pem
PUBLIC_KEY=$JWT_PATH/public.pem

echo "📦 Checking JWT keys..."

if [ ! -f "$PRIVATE_KEY" ] || [ ! -f "$PUBLIC_KEY" ]; then
  echo "🔐 Generating new JWT keys..."
  mkdir -p $JWT_PATH
  openssl genrsa -out $PRIVATE_KEY 4096
  openssl rsa -pubout -in $PRIVATE_KEY -out $PUBLIC_KEY
  chmod 600 $PRIVATE_KEY $PUBLIC_KEY
else
  echo "✅ JWT keys already exist. Skipping generation."
fi

exec "$@"
