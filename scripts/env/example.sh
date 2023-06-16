#! /bin/sh
# Script to generate .env.example

# Remove the values from env vars in .env
sed -r '/(MAPS|MAP_NUMBERS|DEV_SERVER)=.*/!s/(.*\=\")(.*)(\")/\1\3/g' .env >.env.example
