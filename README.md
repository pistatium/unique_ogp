# Unique OGP
"Unique OGP" automatically produces unique OGP image.

This returns an image of the size suitable for OGP image of Facebook when you give API a letter as input.

## Sample

> /?title=Unique%20OGP
![sample.png](https://raw.githubusercontent.com/pistatium/unique_ogp/master/resources/sample.png)

--  

> /?title=Hello world!&brand=Unique OGP
![with_brand.png](https://raw.githubusercontent.com/pistatium/unique_ogp/master/resources/with_brand.png)
  
--

> /?title=全自動でOGP画像を生成します&brand=Unique OGP
![about_ja.png](https://raw.githubusercontent.com/pistatium/unique_ogp/master/resources/about_ja.png)
  
--

> /?title=http://kimihiro_n.appspot.com&brand=Pistatium
![pistatium.png](https://raw.githubusercontent.com/pistatium/unique_ogp/master/resources/pistatium.png)

--

## Setup

__Require__
* node.js
* npm
* node-canvas
    * https://github.com/Automattic/node-canvas/wiki
* Noto Sans CJK JP(Font)
    * http://www.google.com/get/noto/#sans-jpan

```
cd src
npm install
npm run demo  #for demo.html
node index.js

# Try api
open http://localhost:8088?title=unique_ogp
# Or, try demo page
open demo.html
```

--

This software is released under the MIT License, see LICENSE.txt.

Copyright(c) 2015 pistatium.
