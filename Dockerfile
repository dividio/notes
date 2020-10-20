# base image
FROM node:12.18.2

# install chrome for protractor tests
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -yq google-chrome-stable

# Install OpenJDK-8
RUN apt-get update && \
    apt-get install -y curl git unzip xz-utils zip libglu1-mesa openjdk-8-jdk wget ant && \
    apt-get clean;

# Fix certificate issues
RUN apt-get update && \
    apt-get install ca-certificates-java && \
    apt-get clean && \
    update-ca-certificates -f;

# Setup JAVA_HOME -- useful for docker commandline
ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64/
RUN export JAVA_HOME

# install typescript
RUN npm install -g typescript@3.8.3

# install ionic-cli
RUN npm install -g @ionic/cli@6.10.1

# install angular-cli
RUN npm install -g @angular/cli@9.1.12

# Set up new user
RUN useradd -ms /bin/bash developer
USER developer
WORKDIR /home/developer

# Prepare Android directories and system variables
RUN mkdir -p Android/sdk
ENV ANDROID_SDK_ROOT /home/developer/Android/sdk
RUN mkdir -p .android && touch .android/repositories.cfg

# Set up Android SDK
RUN wget -O sdk-tools.zip https://dl.google.com/android/repository/sdk-tools-linux-4333796.zip
RUN unzip sdk-tools.zip && rm sdk-tools.zip
RUN mv tools Android/sdk/tools
RUN cd Android/sdk/tools/bin && yes | ./sdkmanager --licenses
RUN cd Android/sdk/tools/bin && ./sdkmanager "build-tools;28.0.3" "patcher;v4" "platform-tools" "platforms;android-28" "sources;android-28"
ENV PATH "$PATH:/home/developer/Android/sdk/platform-tools"

RUN mkdir -p /home/developer/app
WORKDIR /home/developer/app

# add `node_modules/.bin` to $PATH
ENV PATH /home/developer/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /home/developer/app/package.json
RUN npm install


# change to user root to clean caches
USER root

# cleanup
RUN apt-get clean \
    && apt-get autoclean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /var/cache/apk/* \
    && npm cache clean --force

USER developer

EXPOSE 4200 8100 35729
