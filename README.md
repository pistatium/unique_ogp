# Unique OGP
"Unique OGP" automatically produces unique OGP image.

This returns an image of the size suitable for OGP image of Facebook when you give API a letter as input.

## 日本語(Japanese)
[ブログのアイキャッチ、OGP画像をタイトルから自動生成してみる #Pistatium](https://kimihiro-n.appspot.com/show/5908037558599680)


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

## Online Demo
[http://pistatium.github.io/unique_ogp/](https://pistatium.github.io/unique_ogp/)

You can try to make the OGP image in real time.

## Setup image API server

```
docker run -it -p 8088:8088 pistatium/unique_ogp
```

open browser http://X.X.X.X:8088?title=Test

--

This software is released under the MIT License, see LICENSE.txt.

Copyright(c) 2015 pistatium.
