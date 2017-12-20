FROM ruby:2.4.0

# シェルスクリプトとしてbashを利用
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# 必要なライブラリインストール
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev && \
    echo '======================================================' && \
    echo '必要なライブラリインストール完了' && \
    echo '======================================================'

# yarnパッケージ管理ツールインストール
RUN apt-get update && apt-get install -y curl apt-transport-https wget && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn && \
    echo '======================================================' && \
    echo 'yarnパッケージ管理ツールインストール完了' && \
    echo '======================================================'

# Node.jsをインストール
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash - && \
    apt-get install nodejs && \
    echo '======================================================' && \
    echo 'Node.jsをインストール完了' && \
    echo '======================================================'

# ワークディレクトリ設定
RUN mkdir /myapp
WORKDIR /myapp
ADD Gemfile /myapp/Gemfile
ADD Gemfile.lock /myapp/Gemfile.lock

# bundle install
RUN bundle install && \
    echo '======================================================' && \
    echo 'bundle install完了' && \
    echo '======================================================'

ADD . /myapp
