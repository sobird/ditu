# Mapbar经纬坐标偏移的加/解密算法

### 经纬度加密算法如下：(PHP版)

```php
/**
 * 将真实地理坐标加密为Mapbar经纬度坐标
 *
 * @param $x 经度值
 * @param $y 维度值
 * @returns array
 */
function coordOffsetEncrypt($x,$y){
    $x = floatval($x)*100000%36000000;
    $y = floatval($y)*100000%36000000;

    $_X = intval(((cos($y/100000))*($x/18000))+((sin($x/100000))*($y/9000))+$x);
    $_Y = intval(((sin($y/100000))*($x/18000))+((cos($x/100000))*($y/9000))+$y);

    return array($_X/100000.0,$_Y/100000.0);
}
```
### 经纬坐标加密算法(Javascript版)

```javascript
/**
 * 将真实地理坐标加密为Mapbar经纬度坐标
 *
 * @param x 经度值
 * @param y 维度值
 * @returns [x,y]
 */
function coordOffsetEncrypt(x,y){
    x = parseFloat(x)*100000%36000000;
    y = parseFloat(y)*100000%36000000;

    _X = intval(((Math.cos(y/100000))*(x/18000))+((Math.sin(x/100000))*(y/9000))+x);
    _Y = intval(((Math.sin(y/100000))*(x/18000))+((Math.cos(x/100000))*(y/9000))+y);

    return [_X/100000.0,_Y/100000.0];
}
```
### 经纬度坐标解密算法(PHP版)

```php
/**
 * 将Mapbar经纬坐标解密为真实地理坐标
 *
 * @param $x 经度值
 * @param $y 维度值
 * @returns array
 */
function croodOffsetDecrypt($x,$y){
    $x = floatval($x)*100000%36000000;
    $y = floatval($y)*100000%36000000;

    $x1 = intval(-(((cos($y/100000))*($x/18000))+((sin($x/100000))*($y/9000)))+$x);
    $y1 = intval(-(((sin($y/100000))*($x/18000))+((cos($x/100000))*($y/9000)))+$y);

    $x2 = intval(-(((cos($y1/100000))*($x1/18000))+((sin($x1/100000))*($y1/9000)))+$x+(($x>0)?1:-1));
    $y2 = intval(-(((sin($y1/100000))*($x1/18000))+((cos($x1/100000))*($y1/9000)))+$y+(($y>0)?1:-1));

    return array($x2/100000.0,$y2/100000.0);
}
```

### 经纬度坐标解密算法(Javascript版)

```javascript
/**
 * 将Mapbar经纬坐标解密为真实地理坐标
 *
 * @param x 经度值
 * @param y 维度值
 * @returns [x,y]
 */
function croodOffsetDecrypt(x,y){
    x = parseFloat(x)*100000%36000000;
    y = parseFloat(y)*100000%36000000;

    x1 = parseInt(-(((Math.cos(y/100000))*(x/18000))+((Math.sin(x/100000))*(y/9000)))+x);
    y1 = parseInt(-(((Math.sin(y/100000))*(x/18000))+((Math.cos(x/100000))*(y/9000)))+y);

    x2 = parseInt(-(((Math.cos(y1/100000))*(x1/18000))+((Math.sin(x1/100000))*(y1/9000)))+x+((x>0)?1:-1));
    y2 = parseInt(-(((Math.sin(y1/100000))*(x1/18000))+((Math.cos(x1/100000))*(y1/9000)))+y+((y>0)?1:-1));

    return [x2/100000.0,y2/100000.0];
}
```

[原文地址](https://sobird.me/mapbar-longitude-latitude-encode-decode.htm)