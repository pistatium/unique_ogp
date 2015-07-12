# Unique OGP
"Unique OGP" automatically produces unique OGP image.

This returns an image of the size suitable for OGP image of Facebook when you give API a letter as input.

## Sample

> http://localhost:8088/title=Unique%20OGP
![sample.png](https://raw.githubusercontent.com/pistatium/unique_ogp/master/resources/sample.png)


## Setup

__Require__
* node.js
* npm
* cairo

```
cd src
npm install
node index.js

open http://localhost:8088?title=unique_ogp
```

--

This software is released under the MIT License, see LICENSE.txt.

Copyright(c) 2015 pistatium.
