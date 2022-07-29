<?php

namespace Emx\Gpb\Classes;

/**
 * Class ReCaptcha
 * @package Emx\Gpb\Classes
 */
class ReCaptcha
{
    /**
     * Google Api Url
     * @var string
     */
    private static $url = "https://www.google.com/recaptcha/api/siteverify";
    /**
     * Google Secret Key
     * @var string
     */
    private static $secret_key = '6LfIzucUAAAAAGIzSAWu0sP7kZ-vLGNDt3z5k-NP';

    /**
     * Captcha check
     * @param $captcha
     * @return bool|string
     */
    public static function check($captcha)
    {
        $ip = $_SERVER['REMOTE_ADDR'];
        $url= static::$url . "?secret=". static::$secret_key."&response=". $captcha."&remoteip=".$ip;
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_TIMEOUT, 15);
        curl_setopt($curl, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36");
        $curlData = curl_exec($curl);
        curl_close($curl);
        return $curlData;
    }
}