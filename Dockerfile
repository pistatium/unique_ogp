FROM geekduck/node-canvas

ADD src /opt/node/js

RUN ["/bin/bash", "-c", "npm install"]

RUN mv /opt/node/js/fonts/NotoSansCJKjp-Black.otf /usr/local/share/fonts/

EXPOSE 8088 
