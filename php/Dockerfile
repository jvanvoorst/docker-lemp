FROM php:5.6.30-fpm

# COPY ./php.ini /usr/local/etc/php/php.ini

RUN docker-php-ext-install pdo_mysql
# RUN docker-php-ext-install mysqli

# RUN pear install Mail-1.3.0 Net_SMTP

# RUN apt-get update\
#	&& apt-get install -y zlib1g-dev \
#	&& rm -rf /var/lib/apt/lists/* \
#	&& docker-php-ext-install zip
