<?php

use Emx\Gpb\Classes\ReCaptcha;

ini_set('display_errors', 'On');
error_reporting(E_ALL);

header("strict-transport-security: max-age=600");

require_once "vendor/autoload.php";

use rest\services\CsvAdapterService;
use rest\services\MailSender;

require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");
require_once($_SERVER["DOCUMENT_ROOT"]."/local/php_interface/include/rest/autoload.php");

$post = $_POST;

$utm_term = isset($post['getParams']['utm_term']) ?
    filter_var($post['getParams']['utm_term'], FILTER_SANITIZE_URL):'';
$email = isset($post['data']['email']) ? filter_var($post['data']['email'], FILTER_VALIDATE_EMAIL) : '';
$captchaResponse = isset($_POST['data']['g-recaptcha-response']) ?
    filter_var($_POST['data']['g-recaptcha-response'], FILTER_SANITIZE_URL) : '';


if (ReCaptcha::check($captchaResponse)){
    $data = [
        'email' => $email,
        'client_id' => $utm_term,
    ];

    $mailSender = new MailSender();
    $mailSender->addCsv('gpb_finCompetence', (new CsvAdapterService())->getCsvContent($data));
    // @throws RuntimeException "Could not send email. Event name '{message_event_name}'.";
    $mailSender->send('gpb_finCompetence_submit', $data);
    echo 'ok';
}else{
    echo 'are you robot?';
}