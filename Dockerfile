FROM geekduck/node-canvas

ADD src /opt/node/js

RUN ["/bin/bash", "-c", "npm install"]

EXPOSE 8088 
