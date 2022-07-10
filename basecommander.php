<?php

header("strict-transport-security: max-age=31536000; includeSubDomains; preload");

use rest\services\CsvAdapterService;
use rest\services\MailSender;

require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");
require_once($_SERVER["DOCUMENT_ROOT"]."/local/php_interface/include/rest/autoload.php");

$utm_term 	     = isset($_POST['utm_term'])?filter_var($_POST['utm_term'], FILTER_SANITIZE_STRING):'';
$email 	         = isset($_POST['email']) ? filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) : '';
$captchaResponse = isset($_POST['g-recaptcha-response']) ? filter_var($_POST['g-recaptcha-response'], FILTER_SANITIZE_URL) : '';
$subscribe       = isset($_POST['subscribe']) ? filter_var($_POST['subscribe'], FILTER_SANITIZE_STRING) : '';
$agree           = isset($_POST['agree']) ? filter_var($_POST['agree'], FILTER_SANITIZE_STRING) : '';

function check_recaptcha($captcha){
    $google_url="https://www.google.com/recaptcha/api/siteverify";
    $secret='6LfIzucUAAAAAGIzSAWu0sP7kZ-vLGNDt3z5k-NP';
    $ip=$_SERVER['REMOTE_ADDR'];
    $url=filter_var($google_url."?secret=".$secret."&response=".$captcha."&remoteip=".$ip,FILTER_SANITIZE_URL);
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_TIMEOUT, 15);
    curl_setopt($curl, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36");
    $curlData = curl_exec($curl);
    curl_close($curl);
    return $curlData;
}

if (check_recaptcha($captchaResponse)){
    $data = [
        'email' 	    => $email,
        'client_id' 	=> $utm_term,
        'subscribe'     => $subscribe,
        'agree'         => $agree,
    ];

    $mailSender = new MailSender();
    $mailSender->addCsv('gpb_finCompetence', (new CsvAdapterService())->getCsvContent($data));

    $mailSender->send('OFFER_GENERATOR_FORM_ADDED', $data);
    echo 'ok';
}else{
    echo 'are you robot?';
}